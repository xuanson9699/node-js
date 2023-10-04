import express from "express";
import * as dotenv from "dotenv";
import { userRouter, studentRouter } from "./routes/index.js";
const app = express();
app.use(express.json())
dotenv.config();
const PORT = process.env.PORT;

app.use("/users", userRouter);
app.use("/students", studentRouter);

app.listen(PORT || 3000, async (req, res) => {
  console.log("PORTss", PORT);
});
