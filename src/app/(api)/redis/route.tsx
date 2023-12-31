import { REDIS_KEY } from "@/lib/const";
import { createClient } from "redis";

export async function GET(request: Request) {
  const url = new URL(request.url as string);

  const action = url.searchParams.get("action") as string;
  const order_id = url.searchParams.get("order_id") as string;

  const client = createClient({
    url: REDIS_KEY,
  });

  await client.connect();

  let result = "";

  if (action === "set") {
    let [key, value] = order_id.split(":");
    await client.hSet("Orders", { [key]: value });
  }

  if (action === "get") {
    result = (await client.hGet("Orders", order_id)) as string;
  }

  if (action === "rem") {
    await client.hDel("Orders", order_id);
  }

  if (action === "key") {
    await client.sAdd("Proxies", order_id);
  }

  await client.quit();

  return Response.json(result);
}

export async function POST(request: Request) {
  const { key, data, action } = await request.json();

  const client = createClient({
    url: REDIS_KEY,
  });

  await client.connect();

  let result = "";

  if (action === "set") {
    await client.json.set(key, "$", data);
  }

  if (action === "get") {
    result = (await client.json.get(key)) as string;
  }

  if (action === "rem") {
    await client.json.del(key, "$");
  }

  await client.quit();

  return Response.json(result);
}
