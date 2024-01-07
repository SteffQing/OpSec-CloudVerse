"use client";

import Image from "next/image";
import LockImage from "@/assets/lock.png";
import BoxWrapper from "@/components/Box";
import useSessionStorage from "@/hooks/useSessionStorage";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_URL } from "@/lib/const";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import Loader from "@/assets/loader";

export default function Page() {
  const [key, setKey] = useSessionStorage("proxy_key", "");
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function handleLogin() {
    setLoading(true);
    let isValid = await axios
      .get(`${API_URL}login?key=${key}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error Key",
          description: "There was an error fetching your key.",
          duration: 4000,
        });
      });
    setLoading(false);
    if (!isValid) {
      toast({
        title: "Invalid Key",
        description: "Please enter a valid key.",
        duration: 4000,
      });
      return;
    }
    setValid(true);
  }

  useEffect(() => {
    if (valid) {
      router.push("/client");
    }
  }, [valid]);

  return (
    <main className="px-4 md:px-6 pt-44 md:pt-24 bg-[#0A0B14] h-screen">
      <BoxWrapper title="Login">
        <>
          <span className="login-input_span relative">
            <input
              type="text"
              placeholder="OPSEC-.......................-SW"
              className="border border-[#1D202D] rounded-md py-2 px-5 my-4 login-input"
              onChange={(e) => setKey(e.target.value)}
            />
          </span>
          <div className="flex gap-1 items-center my-2">
            <Image width={16} height={16} src={LockImage} alt="lock" />
            <span className="text-[#54597C] text-sm">
              Your unique authentication key.
            </span>
          </div>
          <button
            className="bg-[#F44336] w-full rounded-md my-6 p-2 text-center"
            onClick={handleLogin}
          >
            {loading ? <Loader /> : "Sign In"}
          </button>
        </>
      </BoxWrapper>
    </main>
  );
}
