"use client";

import useMQ from "@/hooks/useMediaQuery";
import ServerIcon from "@/assets/server-icon.png";
import ArrowIcon from "@/assets/arrow-down.png";
import Image from "next/image";
import { useState } from "react";
import { ModalProps } from "./Modal";

interface Props {
  price: number;
  size: number;
  features: string[];
  setModal: (modal: ModalProps | null) => void;
}

export default function Plan(props: Props) {
  const [dropdown, setDropdown] = useState(false);
  const isMobile = useMQ("(max-width: 768px)");

  const { price, size, features, setModal } = props;

  let modalData: ModalProps = {
    title: "Enter email address",
    subtitle: "Enter your email address",
    id: price,
    buttonText: "Continue",
    setModal: setModal,
    placeholder: "Example@example.com",
  };

  return (
    <div className="flex flex-col max-w-[400px] md:max-w-full w-full m-auto">
      <div className="flex bg-gradient-to-r from-color1 to-color2 gap-4 justify-center items-center w-full p-4 md:flex-col border border-[#1D202D] rounded-lg md:shadow-custom z-10">
        <Image
          src={ServerIcon}
          alt="Server Icon"
          width={isMobile ? 85 : 136}
          height={isMobile ? 75 : 105}
        />
        <div className="flex flex-1 flex-col w-full gap-2 md:flex-row md:justify-center">
          <div className="plan px-5 py-1 min-[500px]:py-2">{size} GB</div>
          <div className="flex px-5 py-1 min-[500px]:py-2 gap-2 plan justify-center items-center">
            <p>{price}K</p>{" "}
            <span className="flex font-light text-xs">$OPSEC</span>
          </div>
        </div>
        {isMobile && (
          <span className="arrow" onClick={() => setDropdown(!dropdown)}>
            <Image
              src={ArrowIcon}
              alt="Arrow Icon"
              width={18}
              height={18}
              style={{
                transform: dropdown ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </span>
        )}
      </div>
      {!isMobile || dropdown ? (
        <div className="bg-gradient-to-r from-color1 to-color2 m-auto md:w-sibling_80 md:pt-4 md:rounded-bl-2xl md:rounded-br-2xl md:overflow-hidden border border-[#1D202D]">
          <aside className="p-4 flex flex-col gap-2 items-center">
            {features.map((feature, i) => (
              <span key={i}>{feature}</span>
            ))}
          </aside>
          <button
            className="bg-[#f44336] w-full p-4"
            onClick={() => setModal(modalData)}
          >
            BUY NOW
          </button>
        </div>
      ) : null}
    </div>
  );
}
