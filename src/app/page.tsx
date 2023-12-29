"use client";

import Icons from "@/assets/plan-selection_icons";
import useMQ from "@/hooks/useMediaQuery";

export default function Home() {
  return (
    <main className="px-4 md:px-6 pt-44 md:pt-24">
      <TopPage currIndex={1} />
    </main>
  );
}

function TopPage({ currIndex }: { currIndex: number }) {
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
        <h1 className="text-white text-xl font-semibold">OpSec CloudVerse</h1>
        <p className="w-full">
          <span className="text-[#A1A1AA] text-xs font-light max-w-[80%]">
            OpSec Cloudverse empowers remote access and control of blockchain
            nodes and servers, ensuring security, performance, and convenience
            for web3 users.
          </span>
        </p>
      </div>
      <div className="flex gap-8 px-4 border-2 bg-[#0A0B14] shadow-[box-shadow: -32px 23px 30.799999237060547px 0px #18181866] border-[#1D202D] rounded-xl overflow-x-auto controls md:justify-center absolute bottom-3 left-2 right-2">
        {controls.map((control, i) => {
          let Icon = Icons[i];
          return (
            <div
              className="flex gap-1 py-3"
              style={
                currIndex === i
                  ? { borderBottom: "1px solid #F44336", color: "#F44336" }
                  : {}
              }
              key={control}
            >
              {!isTablet && <Icon highlight={currIndex === i} />}
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
