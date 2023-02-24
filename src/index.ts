import fastify from "fastify";
import app from "./app";
import swagger from "@fastify/swagger";
import "dotenv/config";
import prismaPlugin from './plugins/prisma';

// Instantiate Fastify with some config
const server = fastify({
  logger: {
    transport:
    process.env["ENVIRONMENT"] === "DEV"
      ? {
          target: "pino-pretty",
          options: {
            translateTime: "HH:MM:ss Z",
            ignore: "pid,hostname",
          },
        }
      : undefined,
  },
  
})

server.register(swagger, {
  exposeRoute: true,
  routePrefix: "/docs",
  swagger: {
    info: { title: "Fastify Docs", version: "1.0" },
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  },
});

server.register(prismaPlugin);

// Register your application as a normal plugin.
server.register(app);

// Start listening.
server.listen({ port: Number(process.env.PORT) || 5500, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
  else server.log.info('Server running on'+ address);
})
