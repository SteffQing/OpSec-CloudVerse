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
  let template =
    type === "residential"
      ? EmailJS_Residential_Template
      : EmailJS_Mobile_Template;

  let email_response = {
    subject: "Proxy Key Request",
    message: `
  `,
    recipient,
  };
  emailjs
    .send(EmailJS_ServiceID as string, template as string, email_response)
    .then((res) => console.log(res.text))
    .catch((err) => console.error(err));
}
