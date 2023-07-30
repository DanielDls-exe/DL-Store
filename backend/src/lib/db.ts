import { FastifyPluginAsync } from "fastify";
import mongoose from "mongoose";
import { DB_URI } from "../config";

export const DBPlugin: FastifyPluginAsync = async (server) => {
  console.log("⌛ Connecting to database");
  await mongoose.connect(DB_URI);
  console.log("✅ Connected to database");
};