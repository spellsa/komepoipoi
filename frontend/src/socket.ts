import { io } from "socket.io-client";
import { getOrCreateClientId } from "./client-id.ts";

const URL = "http://localhost:8000";
export const socket = io(URL, {
  auth: {
    clientId: getOrCreateClientId(),
  },
});
