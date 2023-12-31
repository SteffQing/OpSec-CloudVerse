import { log } from "console";

export async function POST() {
  var myHeaders = new Headers();
  myHeaders.append("x-api-key", "{{api-key}}");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    price_amount: 1000,
    price_currency: "usd",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://api.nowpayments.io/v1/invoice")
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  return Response.json({ data: "Hello World" + " " });
}
