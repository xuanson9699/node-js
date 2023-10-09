import express from "express";
import * as dotenv from "dotenv";
import { userRouter, studentRouter } from "./routes/index.js";
dotenv.config();
import connect from "./database/database.js";
import { checkToken } from "./authentication/auth.js";
const app = express();
app.use(checkToken);
app.use(express.json());

const port = process.env.PORT;

app.use("/users", userRouter);
app.use("/students", studentRouter);

app.listen(port || 3000, async (req, res) => {
  await connect();
  console.log("portss", port);
});
