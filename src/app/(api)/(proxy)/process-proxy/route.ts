import { dispatchProxy } from "@/lib/proxies";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const body = url.searchParams.get("body") as string;
  let { recipient, data } = JSON.parse(body);

  let response = await dispatchProxy(recipient, data);

  return Response.json(response);
}
