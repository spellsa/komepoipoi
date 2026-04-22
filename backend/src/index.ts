import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const port = 8000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("hello world");
});

io.on("connection", (socket) => {
  console.log("connected: " + socket.id);

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
