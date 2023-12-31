import { REDIS_KEY } from "./const";

const { createClient } = require("redis");

type ActionType = "set" | "get" | "rem";

async function redisClient(
  action: ActionType,
  email: string,
  order_id: string
) {
  const client = createClient({
    url: REDIS_KEY as string,
  });

  let result = false;

  await client.connect();

  if (action === "set") {
    await client.sAdd(email, order_id);
  }
  if (action === "get") {
    result = await client.sIsMember(email, order_id);
  }

  if (action === "rem") {
    await client.sRem(email, order_id);
  }

  await client.quit();

  return result;
}
