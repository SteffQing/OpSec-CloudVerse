import { REDIS_KEY } from "@/lib/const";
import { NextApiRequest } from "next";
import { createClient } from "redis";

export async function GET(request: NextApiRequest) {
  const url = new URL(request.url as string);

  const action = url.searchParams.get("action") as string;
  const email = url.searchParams.get("email") as string;
  const order_id = url.searchParams.get("order_id") as string;

  const client = createClient({
    url: REDIS_KEY,
  });

  let result: string[] = [];

  await client.connect();

  if (action === "set") {
    await client.sAdd(email, order_id);
  }

  if (action === "get") {
    result = await client.sMembers(email);
  }

  if (action === "rem") {
    await client.sRem(email, order_id);
  }

  await client.quit();

  return Response.json({ data: result[0] });
}
