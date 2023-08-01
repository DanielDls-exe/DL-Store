import fastify from "fastify";
import { pino } from "pino";
import { mainApp } from "./main_app";
import { PORT } from "./config";

// Server instance
const server = fastify({
  logger: pino({
    transport: {
      target: "pino-pretty",
    },
  }),
  disableRequestLogging: true,
});


server.register(mainApp);

server.listen({ port: PORT, host: '0.0.0.0' }, (error, address) => {
  if (error) throw error;
});

