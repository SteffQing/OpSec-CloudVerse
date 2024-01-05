import { Resend } from "resend";
import EmailTemplate from "@/components/EmailTemplate";
import { redisClient } from "@/lib/utils";
import { dispatchProxy } from "@/lib/proxies";
import { PlanType } from "@/components/Plan";
import { RESEND_KEY } from "@/lib/const";

const resend = new Resend(RESEND_KEY);

export async function POST(request: Request) {
  const url = new URL(request.url);

  const body = url.searchParams.get("body") as string;
  let { recipient, data, order_id } = JSON.parse(body);

  let paymentID = await redisClient("get", order_id);

  if (paymentID === null) {
    return Response.json({ status: false, message: "Payment not found" });
  }

  let response = await dispatchProxy(data);

  try {
    const { data, error } = await resend.emails.send({
      from: "OpSec <onboarding@resend.dev>",
      to: [recipient],
      subject: getTopic(response.type, response.data.order_id),
      react: EmailTemplate(response) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error });
    }

    await redisClient("rem", order_id);
    return Response.json({ data });
  } catch (error) {
    return Response.json({ error });
  }
}

function getTopic(type: PlanType, order_id: string) {
  return type === "residential"
    ? `Your Residential Proxy OpSec Order: ${order_id} Has Been Delivered! `
    : `Your Mobile LTE OpSec Order with ID: ${order_id} Has Been Delivered! `;
}
