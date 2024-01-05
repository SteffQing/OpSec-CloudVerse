import * as React from "react";
import { PlanType } from "./Plan";

interface EmailTemplateProps {
  data: LTE_Template | Resi_Template;
  proxy_key: string;
  type: PlanType;
}

export default function EmailTemplate(template: EmailTemplateProps) {
  return template.type === "lte" ? (
    <Mobile_Template {...template} />
  ) : (
    <Residential_Template {...template} />
  );
}

function Mobile_Template({ data, proxy_key }: EmailTemplateProps) {
  const order_date = new Date().toLocaleDateString();
  let { order_id, ip, expire_at, days, proxy } = data as LTE_Template;
  let { port, host } = proxy;
  return (
    <div>
      <p>Dear User,</p>
      <p>
        We're thrilled to inform you that your recent Mobile LTE order with
        OpSec has been successfully delivered! Here are the details:
      </p>
      <p>Proxy Key to access your OpSec Client Area: {proxy_key}&nbsp;</p>
      <p>
        Order: {order_id}&nbsp;
        <em>Please save this OrderID as it can be used to update your IP</em>
        <br />
        Delivery Date: {order_date}
        <br />
        Purchased Content:
      </p>
      <div style={{ paddingLeft: "40px" }}>
        IP Address: {ip}
        <br />
        Proxy Host: {host}
        <br />
        Proxy Port: {port}
        <br />
        Days Bought: {days}
        <br />
        Expiry Date: {expire_at}
      </div>
      <p>&nbsp;</p>
      <p>
        Need help with anything?
        <br />
        Access the deliverable page to see how to get in touch with us.
      </p>
      <p>Thanks for choosing OpSec!</p>
      <p>&nbsp;</p>
    </div>
  );
}

function Residential_Template({ data, proxy_key }: EmailTemplateProps) {
  const { order_id, bandwidth, proxy } = data as Resi_Template;
  const { host, password, port, username } = proxy;
  const order_date = new Date().toLocaleDateString();
  return (
    <>
      <p>Dear User,</p>
      <p>
        We're thrilled to inform you that your recent Residential Proxy order
        with OpSec has been successfully delivered! Here are the details:
      </p>
      <p>Proxy Key to access your OpSec Client Area: {proxy_key}&nbsp;</p>
      <p>
        Order: {order_id}&nbsp;
        <em>
          Please save this OrderID as it can be used to check your remaining
          bandwidth
        </em>
        <br />
        Delivery Date: {order_date}
        <br />
        Purchased Content:
      </p>
      <p style={{ paddingLeft: "40px" }}>
        Proxy Host: {host}
        <br />
        Proxy Port: {port}
        <br />
        Username: {username}
        <br />
        Password: {password}
        <br />
        Bandwidth: {bandwidth}
      </p>
      <p style={{ paddingLeft: "40px" }}>&nbsp;</p>
      <p>
        Need help with anything?
        <br />
        Access the deliverable page to see how to get in touch with us.
      </p>
      <p>Thanks for choosing OpSec!</p>
      <p>&nbsp;</p>
    </>
  );
}

interface Resi_Template {
  order_id: string;
  bandwidth: number;
  proxy: {
    host: string;
    port: string;
    username: string;
    password: string;
  };
}
interface LTE_Template {
  order_id: string;
  expire_at: string;
  days: number;
  ip: string;
  proxy: {
    host: string;
    port: string;
  };
}
