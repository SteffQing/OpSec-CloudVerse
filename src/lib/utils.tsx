import axios from "axios";
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { API_URL, AbstractAPI_KEY } from "./const";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function validateEmail(email: string) {
  return axios
    .get(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${AbstractAPI_KEY}&email=${email}`
    )
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
}

type Action = "set" | "get" | "rem" | "key";

export async function redisClient(
  action: Action,
  order_id: string,
  order?: object
) {
  if (!order) {
    return axios
      .get(`${API_URL}redis?action=${action}&order_id=${order_id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  } else {
    return axios
      .post(`${API_URL}redis`, { action, key: order_id, data: order })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }
}
