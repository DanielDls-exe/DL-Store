import dotenv from "dotenv";

dotenv.config();

export const PORT = Number(process.env.PORT);
export const DB_URI =
  process.env.DB_URI ?? "mongodb://127.0.0.1:27017/webdev0523";
export const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
export const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;