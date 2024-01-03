import { GET_PROXY_ENDPOINT, PROXY_KEY } from "@/lib/const";
import axios from "axios";

const config = {
  headers: {
    "X-API-KEY": PROXY_KEY,
    "Content-Type": "application/json",
  },
};

export async function POST(request: Request) {
  let { proxy_key } = await request.json();
  const startIndex = proxy_key.indexOf("-") + 1;
  const endIndex = proxy_key.lastIndexOf("-");
  let key = proxy_key.substring(startIndex, endIndex);

  let data = { order_id: key };

  let response = await axios
    .post(GET_PROXY_ENDPOINT, data, config)
    .then((response) => response.data)
    .catch((error) => {
      console.log("error", error);
      return { status: false, ...error };
    });
  console.log(response);

  return Response.json(response);
}
