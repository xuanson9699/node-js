import * as dotenv from "dotenv";
import express from "express";
import { checkToken } from "./authentication/auth.js";
import connect from "./database/database.js";
import { commonRouter, studentRouter, userRouter, viewsRouter } from "./routes/index.js";
import http from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(checkToken);
app.use(express.json());

app.use(express.static(__dirname + "/views"));

const port = process.env.PORT;

const server = http.createServer(app);
const io = new Server(server);

app.use("/files", express.static("files"));
app.use("/users", userRouter);
app.use("/students", studentRouter);
app.use("/", commonRouter);
app.use("/view", viewsRouter);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("message", (message) => {
    console.log("Received message:", message);
    io.emit("message", message);
  });
});
server.listen(port || 3002, async (req, res) => {
  await connect();
});
// app.listen(port || 3002, async (req, res) => {
//   await connect();
//   console.log("port", port);
// });
