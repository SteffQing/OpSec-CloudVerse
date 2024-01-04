"use client";
import { useRouter } from "next/navigation";
import useSessionStorage from "@/hooks/useSessionStorage";
import BoxWrapper from "@/components/Box";
import { Doc_Copy, Import } from "@/assets/client_icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { countries } from "@/lib/data";
import { useEffect, useRef, useState } from "react";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { API_URL } from "@/lib/const";
import Placeholder from "@/components/Placeholder";
import {
  GetProxyResponse,
  MobileLTEGetProxyResponse,
  ResidentialGetProxyResponse,
} from "@/lib/proxies";
import { Type, generateProxies, SchemeType } from "@/lib/generateProxies";

export default function Page() {
  const [proxy_key] = useSessionStorage("proxy_key", "");
  const { toast } = useToast();
  const [data, setData] = useState<GetProxyResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!proxy_key) return;
    setIsLoading(true);
    axios
      .post(`${API_URL}get-proxy`, { proxy_key })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setIsError(true);
        toast({
          title: "Error",
          description: "There was an error fetching your key.",
          duration: 4000,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const router = useRouter();
  useEffect(() => {
    if (!proxy_key) {
      router.push("/client/login");
      // return;
    }
  }, [proxy_key]);

  if (isLoading) return <Placeholder text="Loading..." className="h-screen" />;
  if (isError) return <Placeholder text="Error" className="h-screen" />;

  let _data = data as GetProxyResponse;
  _data = { ..._data, proxy_key };
  let isResidential = "bandwidth_available" in _data;

  return isResidential ? (
    <ResidentialProxy {...(_data as ResidentialGetProxyResponse)} />
  ) : (
    <MobileLTE {...(_data as MobileLTEGetProxyResponse)} />
  );

  return;
}

function ResidentialProxy(data: ResidentialGetProxyResponse) {
  const { proxy_key } = data;

  return (
    <main className="px-4 md:px-6 pt-44 md:pt-24 bg-[#0A0B14]">
      <div className="mt-6">
        <section className="flex flex-col lg:flex-row gap-6">
          <BoxWrapper
            title="Proxy Generator"
            textAlign="text-left"
            width="lg:!m-0"
          >
            <ProxyGenerator {...data} />
          </BoxWrapper>
          <BoxWrapper
            title="Your Key"
            width="w-full max-w-[400px] !m-0"
            textAlign="text-left"
          >
            <input
              type="text"
              value={proxy_key}
              className="border border-[#1D202D] rounded-md py-2 px-5 my-4 login-input"
              readOnly
            />
          </BoxWrapper>
        </section>
      </div>
    </main>
  );
}

function ProxyGenerator(data: ResidentialGetProxyResponse) {
  const { proxy: _proxy } = data;
  let { host, port, password, username } = _proxy;
  let initialProxy = `${host}:${port}:${username}:${password}`;
  const [proxy, setProxy] = useState<string[]>([initialProxy]);
  const [country, setCountry] = useState("Random");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState<Type>("rotating");
  const [scheme, setScheme] = useState<SchemeType>("host:port:user:pass");
  const prevScheme = useRef(scheme);

  const [, copy] = useCopyToClipboard();
  const { toast } = useToast();

  const copyKey = async () => {
    let toCopy = typeof proxy === "string" ? proxy : proxy.join("\n");
    let copied = await copy(toCopy);
    if (copied) {
      toast({
        title: "Proxy Key copied",
        description: "Your proxy key has been copied successfully",
        duration: 4000,
      });
    }
  };
  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([proxy.join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    element.href = URL.createObjectURL(file);
    element.download = "proxies.txt";
    document.body.appendChild(element);
    element.click();
  };
  useEffect(() => {
    let _amount = amount < 2 ? 1 : amount;
    let proxies = generateProxies(
      proxy[0],
      type,
      _amount,
      scheme,
      prevScheme.current,
      country,
      _proxy
    );
    setProxy(proxies);
    prevScheme.current = scheme;
  }, [country, amount, type, scheme]);

  return (
    <div className="flex flex-col">
      <aside className="proxy_aside md:flex gap-2">
        <section className="flex gap-2 mb-5 md:mb-0 w-full">
          <Select onValueChange={(value) => setCountry(value)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white">
              {countries.map((country) => (
                <SelectItem value={country} key={country}>
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
              onChange={(e) => setAmount(Number(e.target.value))}
              value={amount > 0 ? amount : ""}
            />
            <span
              className="absolute top-1/2 -translate-y-1/2 right-4 text-xl"
              onClick={() => setAmount(amount + 1)}
            >
              +
            </span>
            <span
              className="absolute top-1/2 -translate-y-1/2 right-10 text-xl"
              onClick={() => setAmount(amount - 1)}
            >
              -
            </span>
          </div>
        </section>

        <section className="flex gap-2 w-full">
          <Select onValueChange={(value: Type) => setType(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white">
              <SelectItem value="rotating">Rotating</SelectItem>
              <SelectItem value="static">Static</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value: SchemeType) => setScheme(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Scheme Format" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white">
              <SelectItem value="host:port:user:pass">
                host:port:user:pass
              </SelectItem>
              <SelectItem value="user:pass@host:port">
                user:pass@host:port
              </SelectItem>
              <SelectItem value="user:pass:host:port">
                user:pass:host:port
              </SelectItem>
            </SelectContent>
          </Select>
        </section>
      </aside>

      <aside className="my-4 relative max-h-[64px]">
        <span className="absolute z-10 bg-[#F44336] top-0 left-0 w-4 h-full rounded-r-lg"></span>
        <div className="border overflow-auto border-[#1D202D] rounded-md py-2 px-5 login-input break-words pr-8 max-h-[64px]">
          {proxy.join("\n")}
        </div>
        <Doc_Copy
          className="absolute top-[35%] min-[600px]:top-1/2 -translate-y-1/2 right-2 min-[600px]:right-8"
          onClick={copyKey}
        />
        <Import
          className="absolute top-[65%] min-[600px]:top-1/2 -translate-y-1/2 right-2"
          onClick={downloadTxtFile}
        />
      </aside>
    </div>
  );
}

function MobileLTE(data: MobileLTEGetProxyResponse) {
  const [newIP, setNewIP] = useState("");
  const { proxy_key, current_whitelisted_ip, expire_at } = data;
  return (
    <main className="px-4 md:px-6 pt-44 md:pt-24 bg-[#0A0B14]">
      <div className="mt-6">
        <section className="flex flex-col lg:flex-row gap-6">
          <BoxWrapper title="Proxy List" textAlign="text-left" width="lg:!m-0">
            <div>
              <input
                type="text"
                value={current_whitelisted_ip}
                className="border border-[#1D202D] rounded-md py-2 px-5 my-4 login-input"
                readOnly
              />
              <button className="bg-[#1D202D] rounded-md py-2 px-5 my-4 login-input">
                Copy
              </button>
            </div>
          </BoxWrapper>
          <BoxWrapper
            title="Whitelisted IP"
            width="w-full max-w-[400px] !m-0"
            textAlign="text-left"
          >
            <div className="flex gap-3">
              <input
                type="text"
                value={newIP}
                className="border border-[#1D202D] rounded-md py-2 px-5 my-4 login-input"
                onChange={(e) => setNewIP(e.target.value)}
              />
              <button className="bg-[#1D202D] rounded-md py-2 px-5 my-4 login-input">
                Edit
              </button>
            </div>
          </BoxWrapper>
          <BoxWrapper
            title="Expiry Date"
            width="w-full max-w-[400px] !m-0"
            textAlign="text-left"
          >
            <input
              type="text"
              value={expire_at}
              className="border border-[#1D202D] rounded-md py-2 px-5 my-4 login-input"
              readOnly
            />
          </BoxWrapper>
          <BoxWrapper
            title="Your Key"
            width="w-full max-w-[400px] !m-0"
            textAlign="text-left"
          >
            <input
              type="text"
              value={proxy_key}
              className="border border-[#1D202D] rounded-md py-2 px-5 my-4 login-input"
              readOnly
            />
          </BoxWrapper>
        </section>
      </div>
    </main>
  );
}
