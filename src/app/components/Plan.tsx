"use client";

import useMQ from "@/hooks/useMediaQuery";
import ServerIcon from "@/assets/server-icon.png";
import ArrowIcon from "@/assets/arrow-down.png";
import Image from "next/image";
import { useState } from "react";

interface Props {
  price: number;
  size: number;
  features: string[];
}

export default function Plan({ price, size, features }: Props) {
  const [dropdown, setDropdown] = useState(false);
  const isMobile = useMQ("(max-width: 768px)");
  return (
    <div className="flex flex-col plan-element">
      <div className="flex gap-4 justify-center items-center w-full p-4 md:flex-col">
        <Image
          src={ServerIcon}
          alt="Server Icon"
          width={isMobile ? 85 : 136}
          height={isMobile ? 75 : 105}
        />
        <div className="flex flex-1 flex-col w-full gap-2 md:flex-row">
          <div className="plan p-1 min-[500px]:p-2">{size} GB</div>
          <div className="flex p-1 min-[500px]:p-2 gap-2 plan justify-center items-center">
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
        <div className="">
          <aside className="p-4 flex flex-col gap-2 items-center">
            {features.map((feature, i) => (
              <span key={i}>{feature}</span>
            ))}
          </aside>
          <button className="bg-[#f44336] w-full p-4">BUY NOW</button>
        </div>
      ) : null}
    </div>
  );
}
