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

type Action = "set" | "get" | "rem";

export async function redisClient(
  action: Action,
  email: string,
  order_id: string
) {
  return axios
    .get(`${API_URL}redis?action=${action}&email=${email}&order_id=${order_id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
}

export async function getIP() {
  return axios
    .get("https://api.ipify.org/")
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
