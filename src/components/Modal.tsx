import Pay_Now from "@/assets/Pay_Now";
import BoxWrapper from "@/components/Box";
import useClickOutside from "@/hooks/useClickOutside";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { fetchInvoice, fetchReceiptStatus } from "@/lib/now_payments";
import Loader from "@/assets/loader";
import { dispatchProxy } from "@/lib/proxies";
import { redisClient, validateEmail } from "@/lib/utils";
import { PlanType } from "./Plan";
import { useToast } from "./ui/use-toast";

export interface ParamsProps {
  size: number;
  price: number;
  type: PlanType;
}
export interface ModalProps {
  title: string;
  subtitle: string;
  data: ParamsProps;
  buttonText: string;
  setModal: (modal: null | ModalProps) => void;
  placeholder: string;
  pay_now?: boolean;
}
export default function Modal(props: ModalProps) {
  const ref = useRef(null);
  const [recipient, setRecipient] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [receipt, setReceipt] = useState<number | null>(null);
  const { title, subtitle, data, buttonText, setModal, pay_now, placeholder } =
    props;
  useClickOutside(ref, () => setModal(null));
  const { toast } = useToast();

  async function refer_to_pay() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(recipient);

    if (!isValidEmail) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
      });
      return;
    }
    setLoading(true);
    let validateMailAddress = await validateEmail(recipient);
    const { autocorrect, deliverability } = validateMailAddress;
    if (autocorrect) {
      setRecipient(autocorrect);
    }
    if (deliverability === "UNDELIVERABLE") {
      toast({
        title: "Invalid Email",
        description: "Email provided is not deliverable. Try again",
      });
      return;
    }
    let _receipt = await redisClient("get", recipient, "");
    if (_receipt) {
      let receiptStatus = await fetchReceiptStatus(_receipt);
      console.log(_receipt, " AND ", receiptStatus);
    }

    setLoading(false);
    // setReceipt(_receipt);

    let modal = {
      ...props,
      pay_now: true,
      title: "Pay Service",
      buttonText: "Pay",
      subtitle: "PayNow method selected",
    };
    // setTimeout(() => {}, 1500);
    setModal(modal);
  }
  async function process_pay() {
    try {
      setLoading(true);
      let _data = await fetchInvoice(data);
      console.log(_data);

      setReceipt(_data.id);
      setLoading(false);
      window.open(_data.invoice_url, "_blank");

      let modal = {
        ...props,
        title: "Processing Payment",
        buttonText: "Confirm Payment",
        subtitle: "Click button below after payment to continue",
      };
      setModal(modal);
      await redisClient("set", recipient, _data.id);
    } catch (error) {
      let modal = {
        ...props,
        title: "Error",
        buttonText: "Retry",
        subtitle: "There was an error in creating an invoice",
      };
      setModal(modal);
      console.log(error);
    }
  }
  async function process_proxy() {
    try {
      setLoading(true);
      let response = await dispatchProxy(receipt as number, recipient, data);
      setLoading(false);
      console.log(response);
      let _receipt = receipt as number;
      await redisClient("rem", recipient, _receipt.toString());
    } catch (error) {
      console.log(error);
    }
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
                  onChange={(e) => setRecipient(e.target.value)}
                />
              )}
              <button
                className="bg-[#F44336] w-full rounded-md my-6 p-2 text-center"
                onClick={
                  receipt ? process_proxy : pay_now ? process_pay : refer_to_pay
                }
              >
                {loading ? <Loader /> : buttonText}
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