import Pay_Now from "@/assets/Pay_Now";
import BoxWrapper from "@/components/Box";
import useClickOutside from "@/hooks/useClickOutside";

import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { fetchInvoice, fetchReceiptStatus } from "@/lib/now_payments";

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
  const [recipient, setRecipient] = useState("");
  const { title, subtitle, id, buttonText, setModal, pay_now, placeholder } =
    props;
  useClickOutside(ref, () => setModal(null));

  const { isPending, error, data, isSuccess } = useQuery({
    queryKey: ["pay_now"],
    queryFn: () => fetchInvoice(id),
  });

  const {
    isLoading: isPendingReceiptFetch,
    error: errorFetchingReceipt,
    data: receiptResponse,
    refetch,
  } = useQuery({
    queryKey: ["receipt_status"],
    queryFn: () => fetchReceiptStatus(data.id),
    enabled: !!isSuccess,
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
    window.open(data.invoice_url, "_blank");
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
