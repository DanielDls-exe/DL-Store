import { FastifyPluginAsync } from "fastify";

export const MainPlugin: FastifyPluginAsync = async (server) => {
  // Basic example with headers
  server.get("/", (request, reply) => {
    return reply.send({
      status: "on",
    });
  });
};
