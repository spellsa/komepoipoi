import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const MESSAGE_MAX_CHAR_COUNT = 50;
const MESSAGE_LIMIT_COUNT = 3;
const MESSAGE_LIMIT_MS = 10000;

const bannedClientIds = new Set<string>();
const clientMessageTimestamps: Record<string, number[]> = {};

const PORT = Number(process.env.PORT) || 8000;
const HOST = process.env.HOST || "0.0.0.0";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: frontendOrigin,
    methods: ["GET", "POST"],
  },
});

app.get("/api/health", (req, res) => {
  res.send("OK");
});

io.on("connection", (socket) => {
  const clientId = socket.handshake.auth.clientId;
  console.log(`Client connected: ${clientId} (socket id: ${socket.id})`);

  socket.on("chat message", (msg) => {
    const clientId: string = socket.handshake.auth.clientId;
    if (typeof clientId !== "string" || clientId.length === 0) {
      socket.disconnect();
      return;
    }

    if (typeof msg !== "string") {
      return;
    }

    const trimmedMessage = msg.trim();
    if (trimmedMessage.length === 0 || trimmedMessage.length > MESSAGE_MAX_CHAR_COUNT) {
      return;
    }

    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
});

httpServer.listen(PORT, HOST, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
});
