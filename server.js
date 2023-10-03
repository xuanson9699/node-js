import express from "express"
import * as dotenv from "dotenv"
const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.listen(PORT || 3000, async(req, res) => {
    console.log("PORTss", PORT)
})