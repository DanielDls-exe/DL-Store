import { FastifyPluginAsync } from "fastify";
import { MainPlugin } from "./routes/main";
import { GamePlugin } from "./routes/game"; 
import { DBPlugin } from "./lib/db";
import fastifyFormbody from "@fastify/formbody";
import fastifyBlipp from "fastify-blipp";
import fastifyCors from "@fastify/cors";
import auth0Verify from "fastify-auth0-verify";
import { AUTH0_AUDIENCE, AUTH0_DOMAIN } from "./config";

const routesPlugin: FastifyPluginAsync = async (server) => {

  server.register(MainPlugin);
  server.register(GamePlugin, { prefix: "/games" });
};

export const mainApp: FastifyPluginAsync = async (server) => {
  // DB Connection
  server.register(DBPlugin);

 
  server.register(auth0Verify, {
    domain: AUTH0_DOMAIN,
    audience: AUTH0_AUDIENCE,
  });

 
  server.register(fastifyBlipp);


  server.register(fastifyFormbody);


  server.register(fastifyCors);

  // Routes registration
  await server.register(routesPlugin);

  // fastify-blipp initializer
  server.blipp();
};
