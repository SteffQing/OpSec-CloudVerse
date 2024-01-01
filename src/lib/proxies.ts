import {
  EmailJS_Mobile_Template,
  EmailJS_Residential_Template,
  EmailJS_ServiceID,
} from "./const";
import { fetchReceiptStatus } from "./now_payments";
import emailjs from "@emailjs/browser";

type ProxyType = "residential" | "mobile";

export async function dispatchProxy(
  paymentID: number,
  recipient: string,
  type: ProxyType
) {
  let receipt = await fetchReceiptStatus(paymentID);
  console.log(receipt);
  if (receipt.status === false) {
    alert("Payment is still pending");
  }
  let template =
    type === "residential"
      ? EmailJS_Residential_Template
      : EmailJS_Mobile_Template;

  let email_response: any =
    type === "residential" ? residential_template() : mobile_template();
  email_response = { ...email_response, recipient };
  emailjs
    .send(EmailJS_ServiceID, template, email_response)
    .then((res) => console.log(res.text))
    .catch((err) => console.error(err));
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
