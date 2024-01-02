import { PROXY_ENDPOINT, PROXY_KEY } from "@/lib/const";
import axios from "axios";
import { NextApiRequest } from "next";

const config = {
  headers: {
    "X-API-KEY": PROXY_KEY,
    "Content-Type": "application/json",
  },
};

async function getIP() {
  return axios
    .get("https://api.ipify.org/")
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return "194.187.251.11";
    });
}

export async function POST(request: Request) {
  const { size, type } = await request.json();

  let data;

  if (type === "residential") {
    data = {
      network: type,
      bandwidth: size,
    };
  } else {
    let ip = await getIP();

    data = {
      network: "lte",
      ip: ip,
      days: size,
    };
  }

  console.log(data, "DATA");

  let response = axios
    .post(PROXY_ENDPOINT, data, config)
    .then((response) => response.data)
    .catch((error) => console.log("error", error));

  return Response.json(response);
}
