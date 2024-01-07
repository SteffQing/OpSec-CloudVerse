import { ParamsProps } from "@/components/Modal";
import { API_URL, NOW_PAYMENTS_API_KEY, NOW_PAYMENTS_ENDPOINT } from "./const";

export async function fetchInvoice(
  data: ParamsProps,
  recipient: string,
  order_id: string
) {
  var myHeaders = new Headers();
  myHeaders.append("x-api-key", NOW_PAYMENTS_API_KEY);
  myHeaders.append("Content-Type", "application/json");

  let body = JSON.stringify({ recipient, data, order_id });
  let url = API_URL + "process-proxy";
  console.log(url);

  var raw = JSON.stringify({
    price_amount: data.price,
    price_currency: "usd",
    order_id,
    order_description: body,
    ipn_callback_url: url,
    success_url: url,
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
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}

export async function min(): Promise<any> {
  var myHeaders = new Headers();
  myHeaders.append("x-api-key", NOW_PAYMENTS_API_KEY);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  return fetch(NOW_PAYMENTS_ENDPOINT + "merchant/coins", requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}

export async function amount(cur: string): Promise<any> {
  var myHeaders = new Headers();
  myHeaders.append("x-api-key", NOW_PAYMENTS_API_KEY);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  let url =
    NOW_PAYMENTS_ENDPOINT +
    `min-amount?currency_from=${cur}&fiat_equivalent=usd&is_fixed_rate=False&is_fee_paid_by_user=False`;

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}
