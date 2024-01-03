"use client";

import Icons from "@/assets/plan-selection_icons";
import useMQ from "@/hooks/useMediaQuery";
import Plan, { PlanType } from "../components/Plan";
import { useState } from "react";
import { Plans, Mobile_LTE_Data, Residential_Data } from "@/lib/data";
import Modal, { ModalProps } from "@/components/Modal";
import Placeholder from "@/components/Placeholder";

export default function Home() {
  const [page, setPage] = useState(0);
  const [modal, setModal] = useState<ModalProps | null>(null);
  const data = page === 0 ? Residential_Data : Mobile_LTE_Data;
  const planType: PlanType = page === 0 ? "residential" : "lte";

  return (
    <main className="px-4 md:px-6 pt-44 md:pt-24 bg-[#0A0B14] relative">
      {modal && <Modal {...modal} />}
      <TopPage page={page} setPage={setPage} />
      {page === 0 || page === 3 ? (
        <section className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 ml-0 lg:ml-0.5 my-6">
          {data.map((plan, index) => (
            <Plan
              price={plan.price}
              size={plan.size}
              features={plan.features}
              subtext={plan.note}
              key={index}
              setModal={setModal}
              type={planType}
            />
          ))}
        </section>
      ) : (
        <Placeholder text="Coming Soon" />
      )}
    </main>
  );
}

function TopPage({ page, setPage }: { page: number; setPage: any }) {
  const isTablet = useMQ("(max-width: 768px)");

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
        {Plans.map((plan, i) => {
          let Icon = Icons[i];
          return (
            <div
              className="flex gap-1 py-3 cursor-pointer transition-[color] duration-300"
              style={
                page === i
                  ? { borderBottom: "1px solid #F44336", color: "#F44336" }
                  : {}
              }
              key={plan}
              onClick={() => setPage(i)}
            >
              {!isTablet && <Icon highlight={page === i} />}
              <span className="font-light text-sm whitespace-nowrap">
                {plan}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// mobile and budget residential are available, set the rest to coming soon
