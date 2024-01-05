import { amount, min } from "@/lib/now_payments";

export async function GET() {
  let { selectedCurrencies }: { selectedCurrencies: string[] } = await min();

  let queryUrls = selectedCurrencies.map((currency) =>
    amount(currency.toLowerCase())
  );
  console.time("query");
  let queries = await Promise.all(queryUrls);
  console.timeEnd("query");
  let data = queries.filter(({ fiat_equivalent, currency_from }) => {
    if (fiat_equivalent < 6) {
      return {
        fiat_equivalent,
        currency_from,
      };
    }
  });

  return Response.json(data);
}
