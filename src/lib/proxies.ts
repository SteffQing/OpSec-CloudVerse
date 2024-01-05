import { ParamsProps } from "@/components/Modal";
import { API_URL } from "./const";
import axios from "axios";

export async function dispatchProxy(data: ParamsProps) {
  const { size, type } = data;

  /* Purchase the Proxy */
  let response = await axios.post(API_URL + "buy-proxy", { size, type });

  if (response.data.status !== "success") {
    return { code: "FAILED", ...response.data, res: false };
  }

  const order_details: ProxyResponse = response.data;
  const proxy_key = `OPSEC-${order_details.order_id}-SW`;

  let _response =
    type === "residential"
      ? { ...order_details, bandwidth: size }
      : { ...order_details, days: size };

  let email_response = { data: _response, proxy_key, type };

  return { res: true, code: "SUCCESS", ...email_response };
}

/ *  Interface Declarations * /;
interface ResidentialProxyResponse {
  status: string;
  message: string;
  reseller_name: string;
  order_id: string;
  price: 2;
  proxy: {
    host: string;
    port: string;
    username: string;
    password: string;
  };
}
interface MobileLTEProxyResponse {
  status: string;
  message: string;
  reseller_name: string;
  order_id: string;
  price: 1;
  expire_at: string;
  ip: string;
  proxy: {
    host: string;
    port: string;
  };
}

export interface MobileLTEGetProxyResponse extends MobileLTEProxyResponse {
  current_whitelisted_ip: string;
  proxy_key: string;
}
export interface ResidentialGetProxyResponse extends ResidentialProxyResponse {
  bandwidth_available: number;
  proxy_key: string;
}

export type GetProxyResponse =
  | MobileLTEGetProxyResponse
  | ResidentialGetProxyResponse;

type ProxyResponse = ResidentialProxyResponse | MobileLTEProxyResponse;
