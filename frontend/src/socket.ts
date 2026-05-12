import { io } from "socket.io-client";
import { getOrCreateClientId } from "./client-id.ts";

export const socket = io(window.location.origin, {
  path: "/socket.io",
  auth: {
    clientId: getOrCreateClientId(),
  },
});
