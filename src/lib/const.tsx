import dotenv from "dotenv";

dotenv.config();

export const {
  NOW_PAYMENTS_API_KEY,
  NOW_PAYMENTS_ENDPOINT,
  EmailJS_Residential_Template,
  EmailJS_Mobile_Template,
  EmailJS_ServiceID,
  REDIS_KEY,
} = process.env;
