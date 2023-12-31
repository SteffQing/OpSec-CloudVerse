import Pay_Now from "@/assets/Pay_Now";
import BoxWrapper from "@/components/Box";
import useClickOutside from "@/hooks/useClickOutside";
import {
  EmailJS_ServiceID,
  EmailJS_Template,
  NOW_PAYMENTS_API_KEY,
  Now_Payment_Endpoint,
} from "@/lib/const";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export interface ModalProps {
  title: string;
  subtitle: string;
  id: number;
  buttonText: string;
  setModal: (modal: null | ModalProps) => void;
  placeholder: string;
  pay_now?: boolean;
}
export default function Modal(props: ModalProps) {
  const ref = useRef(null);
  const [recipient, setRecipient] = useState();
  const { title, subtitle, id, buttonText, setModal, pay_now, placeholder } =
    props;
  useClickOutside(ref, () => setModal(null));

  const { isPending, error, data } = useQuery({
    queryKey: ["pay_now"],
    queryFn: () => fetchInvoice(id),
  });

  function refer_to_pay() {
    let modal = {
      ...props,
      pay_now: true,
      title: "Pay Service",
      buttonText: "Pay",
      subtitle: "PayNow method selected",
    };
    setTimeout(() => {}, 1500);
    setModal(modal);
  }
  function process_pay() {
    console.log("Processing payment...", data, error, isPending);
    window.open(data.invoice_url, "_blank");
    let email_response = {
      subject: "Proxy Key Request",
      message: `
    You have made a request to purchase a proxy key.
    Here is thee invoice URL: ${data.invoice_url}
    When the payment has been confirmed, you will receive an email with the proxy key.
    `,
      recipient,
    };
    emailjs.send(EmailJS_ServiceID, EmailJS_Template, data);
  }
  return (
    <main className="bg-transparent z-50 fixed w-full h-full">
      <div ref={ref}>
        <BoxWrapper
          children={
            <>
              <label
                htmlFor="email_input"
                className="text-[#54597C] w-full block text-center"
              >
                {subtitle}
              </label>
              {pay_now ? (
                <div className="border border-[#1D202D] rounded-md py-2 px-5 login-input my-4 break-words pr-8">
                  <Pay_Now className="my-2" />
                </div>
              ) : (
                <input
                  type="text"
                  id="email_input"
                  placeholder={placeholder}
                  className="border border-[#1D202D] rounded-md py-2 px-5 my-4 login-input"
                  required
                  // onChange={() => setRecipient(document.getElementById("email_input").value)}
                />
              )}
              <button
                className="bg-[#F44336] w-full rounded-md my-6 p-2 text-center"
                onClick={pay_now ? process_pay : refer_to_pay}
              >
                {buttonText}
              </button>
            </>
          }
          title={title}
          width="max-w-[300px]"
        />
      </div>
    </main>
  );
}

async function fetchInvoice(id: number) {
  // let key = process.env.NOW_PAYMENTS_API_KEY as string;
  var myHeaders = new Headers();
  myHeaders.append("x-api-key", NOW_PAYMENTS_API_KEY);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    price_amount: id,
    price_currency: "usd",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  return fetch(Now_Payment_Endpoint + "invoice", requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  // return res;
}

async function status(receiptId: number) {
  var myHeaders = new Headers();
  myHeaders.append("x-api-key", NOW_PAYMENTS_API_KEY);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  return fetch(Now_Payment_Endpoint + "payment/" + receiptId, requestOptions)
    .then((response) => response.text())
    .catch((error) => console.log("error", error));
}
