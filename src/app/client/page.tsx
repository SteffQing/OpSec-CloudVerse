"use client";
import { useRouter } from "next/navigation";
import useSessionStorage from "@/hooks/useSessionStorage";
import BoxWrapper from "@/components/Box";

export default function Page() {
  const [key, setKey] = useSessionStorage("proxy_key", "");

  const router = useRouter();
  if (!key) {
    router.push("/client/login");
    return;
  }
  return (
    <main className="px-4 md:px-6 pt-44 md:pt-24 bg-[#0A0B14]">
      <div className="mt-6">
        <section className="flex flex-col lg:flex-row gap-6">
          <BoxWrapper
            title="Proxy Generator"
            textAlign="text-left"
            width="lg:!m-0"
          >
            <ProxyGenerator />
          </BoxWrapper>
          <BoxWrapper
            title="Your Key"
            width="w-full max-w-[400px] !m-0"
            textAlign="text-left"
          >
            <input
              type="text"
              value={key as string}
              className="border border-[#1D202D] rounded-md py-2 px-5 my-4 login-input"
              readOnly
            />
          </BoxWrapper>
        </section>
      </div>
    </main>
  );
}

import { Doc_Copy, Import } from "@/assets/client_icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { countries } from "@/lib/data";
import { useState } from "react";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { useToast } from "@/components/ui/use-toast";

function ProxyGenerator() {
  const [proxy, setProxy] = useState("");
  const [, copy] = useCopyToClipboard();
  const { toast } = useToast();
  const generateProxyKey = async () => {
    setProxy("resi1.proxies.rip:1337:gtj4tywa1ppdykoya502oa:dU7sYgLHkalnkIrx");
    let copied = await copy(proxy);
    if (copied) {
      toast({
        title: "Proxy Key copied",
        description: "Your proxy key has been copied successfully",
        duration: 4000,
      });
    }
  };
  return (
    <div className="flex flex-col">
      <aside className="proxy_aside md:flex gap-2">
        <section className="flex gap-2 mb-5 md:mb-0 w-full">
          <Select>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white">
              {countries.map((country) => (
                <SelectItem value={country.toLowerCase()} key={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative w-fit">
            <input
              type="number"
              placeholder="Amount"
              className="border border-[#1D202D] rounded-md py-2 px-5 login-input"
            />
            <span className="absolute top-1/2 -translate-y-1/2 right-4 text-xl">
              +
            </span>
            <span className="absolute top-1/2 -translate-y-1/2 right-10 text-xl">
              -
            </span>
          </div>
        </section>

        <section className="flex gap-2 w-full">
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white">
              <SelectItem value="rotating">Rotating</SelectItem>
              <SelectItem value="static">Static</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Scheme Format" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white">
              <SelectItem value="1">host:port:user:pass</SelectItem>
              <SelectItem value="2">user:pass@host:port</SelectItem>
              <SelectItem value="3">user:pass:host:port</SelectItem>
            </SelectContent>
          </Select>
        </section>
      </aside>

      <aside className="my-4 relative">
        <span className="absolute z-10 bg-[#F44336] top-0 left-0 w-4 h-full rounded-r-lg"></span>
        <div className="border border-[#1D202D] rounded-md py-2 px-5 login-input break-words pr-8">
          {proxy}
        </div>
        <Doc_Copy
          className="absolute top-[35%] min-[600px]:top-1/2 -translate-y-1/2 right-2 min-[600px]:right-8"
          onClick={generateProxyKey}
        />
        <Import className="absolute top-[65%] min-[600px]:top-1/2 -translate-y-1/2 right-2" />
      </aside>
    </div>
  );
}
