import Fastify from "fastify";
import fastifyIO from "fastify-socket.io";

import * as dotenv from "dotenv";

dotenv.config();

const server = Fastify();
server.register(fastifyIO, {
  cors: { origin: process.env?.["ALLOWED_URL"] },
});

server.ready().then(() => {
  server.io.use((socket, next) => {
    socket.userId = socket.handshake.auth["userId"];
    next();
  });
  server.io.on("connection", (socket) => {
    socket.userId && socket.join(socket.userId);
  });
});

server.listen(
  { port: parseInt(process.env?.["WS_PORT"] as string) },
  (err, address) => {
    err ? process.exit(1) : console.log("Server now running at: ", address);
  }
);
