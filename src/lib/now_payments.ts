// import { NOW_PAYMENTS_API_KEY, NOW_PAYMENTS_ENDPOINT } from "./const";
import dotenv from "dotenv";

dotenv.config();

const { NOW_PAYMENTS_API_KEY, NOW_PAYMENTS_ENDPOINT } = process.env;

export async function fetchInvoice(id: number) {
  console.log(NOW_PAYMENTS_ENDPOINT, NOW_PAYMENTS_API_KEY);

  var myHeaders = new Headers();
  myHeaders.append("x-api-key", NOW_PAYMENTS_API_KEY as string);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    price_amount: id,
    price_currency: "usd",
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

export async function fetchReceiptStatus(receiptId: number) {
  var myHeaders = new Headers();
  myHeaders.append("x-api-key", NOW_PAYMENTS_API_KEY as string);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  return fetch(NOW_PAYMENTS_ENDPOINT + "payment/" + receiptId, requestOptions)
    .then((response) => response.text())
    .catch((error) => console.log("error", error));
}
