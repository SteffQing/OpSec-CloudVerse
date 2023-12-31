import dotenv from "dotenv";
dotenv.config();
export const {
  NOW_PAYMENTS_API_KEY,
  EmailJS_Residential_Template,
  EmailJS_Mobile_Template,
  EmailJS_ServiceID,
  NOW_PAYMENTS_ENDPOINT,
} = process.env;
