import { ParamsProps } from "@/components/Modal";
import {
  API_URL,
  EmailJS_Mobile_Template,
  EmailJS_PublicKey,
  EmailJS_Residential_Template,
  EmailJS_ServiceID,
  PROXY_ENDPOINT,
  PROXY_KEY,
} from "./const";
import { fetchReceiptStatus } from "./now_payments";
import emailjs from "@emailjs/browser";
import axios from "axios";

export async function dispatchProxy(
  paymentID: number,
  recipient: string,
  data: ParamsProps
) {
  const { size, price, type } = data;
  /* Fetch the receipt status */
  let receipt = await fetchReceiptStatus(paymentID);
  // if (receipt.status === false) {
  //   return receipt;
  // }

  /* Purchase the Proxy */
  let response = await axios.post(API_URL + "proxy", { size, type });
  console.log(response.data, "RESPONSE");

  /* Send the email */
  let template =
    type === "residential"
      ? EmailJS_Residential_Template
      : EmailJS_Mobile_Template;

  let email_response: any =
    type === "residential" ? residential_template() : mobile_template();
  email_response = { ...email_response, recipient };
  emailjs
    .send(EmailJS_ServiceID, template, email_response, EmailJS_PublicKey)
    .then((res) => console.log(res.text))
    .catch((err) => console.error(err));

  return { status: true };
}
function mobile_template() {
  let order_id = 123456789;
  let ip = "127.0.0.1";
  let host = "localhost";
  let port = 8080;
  let days = 1;
  let expire_at = new Date(Date.now() + 1000 * 60 * 60 * 24 * days);

  return {
    order_id,
    ip,
    host,
    port,
    expire_at,
  };
}

function residential_template() {
  let order_id = 123456789;
  let host = "localhost";
  let port = 8080;
  let username = "username";
  let password = "password";
  let bandwidth = 1000;

  return {
    order_id,
    host,
    port,
    username,
    password,
    bandwidth,
  };
}
