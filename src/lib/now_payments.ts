import { ParamsProps } from "@/components/Modal";
import { NOW_PAYMENTS_API_KEY, NOW_PAYMENTS_ENDPOINT } from "./const";

export async function fetchInvoice({ size, price, type }: ParamsProps) {
  var myHeaders = new Headers();
  myHeaders.append("x-api-key", NOW_PAYMENTS_API_KEY);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    price_amount: price,
    price_currency: "usd",
    order_description: JSON.stringify({ size, type }),
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  return fetch(NOW_PAYMENTS_ENDPOINT + "invoice", requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}

export async function fetchReceiptStatus(receiptId: number): Promise<any> {
  var myHeaders = new Headers();
  myHeaders.append("x-api-key", NOW_PAYMENTS_API_KEY);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  return fetch(NOW_PAYMENTS_ENDPOINT + "payment/" + receiptId, requestOptions)
    .then((response) => response.text())
    .catch((error) => console.log("error", error));
}