import * as dotenv from "dotenv";
import express from "express";
import { checkToken } from "./authentication/auth.js";
import connect from "./database/database.js";
import { commonRouter, studentRouter, userRouter, viewsRouter } from "./routes/index.js";
dotenv.config();
const app = express();
app.use(checkToken);
app.use(express.json());

const port = process.env.PORT;
app.use('/files', express.static('files'));
app.use("/users", userRouter);
app.use("/students", studentRouter);
app.use("/", commonRouter);
app.use("/view", viewsRouter);

app.listen(port || 3000, async (req, res) => {
  await connect();
  console.log("port", port);
});
