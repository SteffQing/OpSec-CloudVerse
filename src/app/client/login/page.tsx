import Image from "next/image";
import LockImage from "@/assets/lock.png";
import BoxWrapper from "@/components/Box";

export default function Page() {
  return (
    <main className="px-4 md:px-6 pt-44 md:pt-24 bg-[#0A0B14] h-screen">
      <BoxWrapper
        children={
          <>
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
          </>
        }
        title="Login"
      />
    </main>
  );
}
