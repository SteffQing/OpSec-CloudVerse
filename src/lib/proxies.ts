import { ParamsProps } from "@/components/Modal";
import {
  API_URL,
  EmailJS_Mobile_Template,
  EmailJS_PublicKey,
  EmailJS_Residential_Template,
  EmailJS_ServiceID,
} from "./const";
import { fetchReceiptStatus } from "./now_payments";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { redisClient } from "./utils";

export async function dispatchProxy(
  paymentID: number,
  recipient: string,
  data: ParamsProps
) {
  const { size, type } = data;
  /* Fetch the receipt status */
  let receipt = await fetchReceiptStatus(paymentID);
  if (receipt.status === false) {
    return receipt;
  }

  /* Purchase the Proxy */
  let response = await axios.post(API_URL + "buy-proxy", { size, type });
  console.log(response.data, "RESPONSE");

  if (response.data.status !== "success") {
    return { code: "FAILED", ...response.data };
  }

  const order_details: ProxyResponse = response.data;
  const proxy_key = `OPSEC-${order_details.order_id}-SW`;
  await redisClient("set", "Proxies", proxy_key);

  /* Send the email */
  let template =
    type === "residential"
      ? EmailJS_Residential_Template
      : EmailJS_Mobile_Template;

  let email_response: any =
    type === "residential"
      ? residential_template({
          ...(order_details as ResidentialProxyResponse),
          bandwidth: size,
        })
      : mobile_template({
          ...(order_details as MobileLTEProxyResponse),
          days: size,
        });
  const order_date = new Date().toLocaleDateString();
  email_response = { ...email_response, recipient, order_date, proxy_key };
  emailjs
    .send(EmailJS_ServiceID, template, email_response, EmailJS_PublicKey)
    .then((res) => console.log(res.text))
    .catch((err) => console.error(err));

  return { status: true };
}
function mobile_template(template: LTE_Template) {
  const { order_id, expire_at, proxy, days, ip } = template;
  const { host, port } = proxy;

  return {
    order_id,
    ip,
    host,
    port,
    expire_at,
    days,
  };
}

function residential_template(template: Resi_Template) {
  const { order_id, bandwidth, proxy } = template;
  const { host, password, port, username } = proxy;

  return {
    order_id,
    host,
    port,
    username,
    password,
    bandwidth,
  };
}

/ *  Interface Declarations * /;
interface ResidentialProxyResponse {
  status: string;
  message: string;
  reseller_name: string;
  order_id: string;
  price: 2;
  proxy: {
    host: string;
    port: string;
    username: string;
    password: string;
  };
}
interface MobileLTEProxyResponse {
  status: string;
  message: string;
  reseller_name: string;
  order_id: string;
  price: 1;
  expire_at: string;
  ip: string;
  proxy: {
    host: string;
    port: string;
  };
}

type ProxyResponse = ResidentialProxyResponse | MobileLTEProxyResponse;

interface Resi_Template {
  order_id: string;
  bandwidth: number;
  proxy: {
    host: string;
    port: string;
    username: string;
    password: string;
  };
}
interface LTE_Template {
  order_id: string;
  expire_at: string;
  days: number;
  ip: string;
  proxy: {
    host: string;
    port: string;
  };
}
