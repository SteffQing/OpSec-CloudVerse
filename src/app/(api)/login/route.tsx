import { REDIS_KEY } from "@/lib/const";
import { createClient } from "redis";

export async function GET(request: Request) {
  const url = new URL(request.url as string);

  const key = url.searchParams.get("key") as string;

  const client = createClient({
    url: REDIS_KEY,
  });

  await client.connect();

  let result = await client.SISMEMBER("Proxies", key);

  await client.quit();

  return Response.json(result);
}
