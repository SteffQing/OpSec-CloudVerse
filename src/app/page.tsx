"use client";

import Icons from "@/assets/plan-selection_icons";
import useMQ from "@/hooks/useMediaQuery";
import Plan from "./components/Plan";
import { useState } from "react";

let features = [
  "7.000.000+ IP Pool",
  "Unlimited Threads",
  "Premium Support",
  "Only user:pass auth",
  "Country-Targetting available on request",
  "Rotating/Sticky Sessions",
];

const dummydata = [
  {
    price: 100,
    size: 16,
    features,
  },
  {
    price: 200,
    size: 32,
    features,
  },
  {
    price: 300,
    size: 64,
    features,
  },
  {
    price: 400,
    size: 128,
    features,
  },
];

export default function Home() {
  const [page, setPage] = useState(0);
  return (
    <main className="px-4 md:px-6 pt-44 md:pt-24 bg-[#0A0B14]">
      <TopPage page={page} setPage={setPage} />
      <section className="flex gap-3 flex-col md:flex-row flex-wrap justify-center items-center">
        {dummydata.map((plan, index) => (
          <Plan
            price={plan.price}
            size={plan.size}
            features={plan.features}
            key={index}
          />
        ))}
      </section>
    </main>
  );
}

function TopPage({ page, setPage }: { page: number; setPage: any }) {
  const isTablet = useMQ("(max-width: 768px)");
  const controls = [
    "Budget Residential",
    "Premium Residential",
    "Premium LTE",
    "Mobile LTE",
  ];
  return (
    <div className="top-page">
      <div className="pt-24 text-center">
        <h1 className="text-white text-xl md:text-2xl font-semibold">
          OpSec CloudVerse
        </h1>
        <p className="w-full">
          <span className="text-[#A1A1AA] text-xs font-light w-[80%] md:w-1/2 block m-auto md:text-base">
            OpSec Cloudverse empowers remote access and control of blockchain
            nodes and servers, ensuring security, performance, and convenience
            for web3 users.
          </span>
        </p>
      </div>
      <div className="flex gap-8 px-4 border-2 bg-[#0A0B14] shadow-[box-shadow: -32px 23px 30.799999237060547px 0px #18181866] border-[#1D202D] rounded-xl overflow-x-auto controls min-[500px]:justify-center absolute bottom-3 left-2 right-2">
        {controls.map((control, i) => {
          let Icon = Icons[i];
          return (
            <div
              className="flex gap-1 py-3 cursor-pointer transition-[color] duration-300"
              style={
                page === i
                  ? { borderBottom: "1px solid #F44336", color: "#F44336" }
                  : {}
              }
              key={control}
              onClick={() => setPage(i)}
            >
              {!isTablet && <Icon highlight={page === i} />}
              <span className="font-light text-sm whitespace-nowrap">
                {control}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// mobile and budget residential are available, set the rest to coming soon
