const config = {
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
};

export async function GET(request: Request) {
  //   console.log(request.headers.get("ngrok-skip-browser-warning"));

  const url = new URL(request.url);

  //   const action = url.searchParams.get("action") as string;
  //   const email = url.searchParams.get("email") as string;
  //   const order_id = url.searchParams.get("order_id") as string;

  return Response.json({ data: "Message received" });
}
