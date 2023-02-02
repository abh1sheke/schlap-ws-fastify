import { Socket as DefaultSocket } from "socket.io";

declare module "socket.io" {
  interface Socket {
    userId: string | undefined;
    handshake: {
      auth: {
        userId: string | undefined;
      } & DefaultSocket["auth"];
    } & DefaultSocket["handshake"];
  }
}
