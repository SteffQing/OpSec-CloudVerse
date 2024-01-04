"use client";

import useMQ from "@/hooks/useMediaQuery";
import ServerIcon from "@/assets/server_icon.png";
import ArrowIcon from "@/assets/arrow-down.png";
import Image from "next/image";
import { useState } from "react";
import { ModalProps } from "./Modal";
import { Line_Mobile, Line_Tablet } from "@/assets/line";
import { cn } from "@/lib/utils";
import Tick from "@/assets/tick";

export type PlanType = "residential" | "lte";
interface Props {
  price: number;
  size: number;
  features: string[];
  setModal: (modal: ModalProps | null) => void;
  subtext: string;
  type: PlanType;
}

export default function Plan(props: Props) {
  const isMobile = useMQ("(max-width: 768px)");

  return isMobile ? <Mobile_Plan {...props} /> : <Desktop_Plan {...props} />;
}

function Desktop_Plan(props: Props) {
  const { price, size, features, setModal, subtext, type } = props;

  let modalData: ModalProps = {
    title: "Enter email address",
    subtitle: "Enter your email address",
    data: { size, price, type },
    buttonText: "Continue",
    setModal: setModal,
    placeholder: "Example@example.com",
  };
  return (
    <div className="flex flex-col max-w-[500px] w-full m-auto">
      <section className="flex rounded-tr-2xl rounded-tl-2xl overflow-hidden">
        <div className="flex bg-gradient-to-r from-color1 to-color2 gap-4 justify-center items-center p-4 flex-col border border-[#1D202D] shadow-custom z-10 w-[40%]">
          <Image src={ServerIcon} alt="Server Icon" width={136} height={105} />
          <div className="flex flex-col items-center w-full gap-2 justify-center">
            <div className="">{subtext}</div>
            <div className="flex px-5 py-1 min-[500px]:py-2 gap-2 plan justify-center items-center">
              <p>${price}</p>{" "}
              <span className="flex font-light text-xs">$OPSEC</span>
            </div>
          </div>
        </div>
        <Line_Tablet className="h-auto" />
        <div className="bg-gradient-to-r from-color1 to-color2 pt-4 overflow-hidden border border-[#1D202D] w-[60%]">
          <aside className="p-4 flex flex-col gap-2 items-start">
            {features.map((feature, i) => (
              <span key={i} className="flex gap-2 items-center">
                <Tick className="min-w-[18px]" /> {feature}
              </span>
            ))}
          </aside>
        </div>
      </section>

      <button
        className="bg-[#f44336] w-full p-4 rounded-bl-2xl rounded-br-2xl "
        onClick={() => setModal(modalData)}
      >
        BUY NOW
      </button>
    </div>
  );
}

function Mobile_Plan(props: Props) {
  const { price, size, features, setModal, subtext, type } = props;
  const [dropdown, setDropdown] = useState(false);

  let modalData: ModalProps = {
    title: "Enter email address",
    subtitle: "Enter your email address",
    data: { size, price, type },
    buttonText: "Continue",
    setModal: setModal,
    placeholder: "Example@example.com",
  };
  return (
    <div className="flex flex-col max-w-[400px] md:max-w-full w-full m-auto md:flex-row">
      <div
        className={cn(
          "flex bg-gradient-to-r from-color1 to-color2 gap-4 justify-center items-center w-full p-4 md:flex-col border border-[#1D202D] rounded-2xl md:shadow-custom z-10 md:flex-1",
          dropdown && "rounded-bl-none rounded-br-none"
        )}
      >
        <Image src={ServerIcon} alt="Server Icon" width={85} height={75} />
        <div className="flex items-center flex-col w-full gap-2 md:flex-row md:justify-center">
          <div>{subtext}</div>
          <div className="flex px-5 py-1 min-[500px]:py-2 gap-2 plan justify-center items-center">
            <p>${price}</p>{" "}
            <span className="flex font-light text-xs">$OPSEC</span>
          </div>
        </div>
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
      </div>
      {dropdown && <Line_Mobile width="100%" />}
      {dropdown ? (
        <div
          className={cn(
            "bg-gradient-to-r from-color1 to-color2 md:pt-4 md:rounded-bl-2xl md:rounded-br-2xl overflow-hidden border border-[#1D202D] rounded-2xl md:flex-1",
            dropdown && "rounded-tl-none rounded-tr-none"
          )}
        >
          <aside className="p-4 flex flex-col gap-2 items-start">
            {features.map((feature, i) => (
              <span key={i} className="flex gap-2 items-center">
                <Tick className="min-w-[18px]" /> {feature}
              </span>
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

/* 

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

*/
