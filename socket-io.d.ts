import { Socket as DefaultSocket } from "socket.io";

declare module "socket.io" {
  interface ISocket extends DefaultSocket {
    handshake: {
      auth: {
        id: string | undefined;
      };
    } & DefaultSocket["handshake"];
  }
}
