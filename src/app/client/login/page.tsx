import Image from "next/image";
import LockImage from "@/assets/lock.png";

export default function Page() {
  return (
    <main className="px-4 md:px-6 pt-44 md:pt-24">
      <div className="border border-[#1D202D] bg-[#0E111C] rounded-2xl max-w-[900px] m-auto w-full mt-20 md:mt-32 px-6 md:px-8">
        <h2 className="my-4 text-2xl text-center">Client Area</h2>
        <span className="login-input_span relative">
          <input
            type="text"
            placeholder="OP-.......................-SEC"
            className="border border-[#1D202D] rounded-md py-2 px-5 my-4 login-input"
          />
        </span>
        <div className="flex gap-1 items-center my-2">
          <Image width={16} height={16} src={LockImage} alt="lock" />
          <span className="text-[#54597C] text-sm">
            Your unique authentication key.
          </span>
        </div>
        <button className="bg-[#F44336] w-full rounded-md my-6 p-2 text-center">
          Sign In
        </button>
      </div>
    </main>
  );
}
