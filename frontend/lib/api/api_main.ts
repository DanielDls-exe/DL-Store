import axios from "axios";

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL as string | "http://127.0.0.1:4500",
});

export const backendFetcher = async (key: string) => {
  const response = await API.get(key);
  return response.data;
};

