import { dispatchProxy } from "@/lib/proxies";
import { redisClient } from "@/lib/utils";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const body = url.searchParams.get("body") as string;
  let { recipient, data, order_id } = JSON.parse(body);

  let paymentID = await redisClient("get", order_id);

  let response = await dispatchProxy(recipient, data, paymentID);

  if (response.res === false) {
    return Response.json(response);
  }

  await redisClient("rem", order_id);

  return Response.json(response);
}
