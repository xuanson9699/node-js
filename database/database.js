import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { print, OutputType } from "../helpers/print.js";
import Exception from "../exceptions/Exception.js";
dotenv.config();

async function connect() {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URI);
    print("connect mongoose successfull", OutputType.SUCCESS);
    return connection;
  } catch (error) {
    const { code } = error;
    if (code === 8000) {
      throw new Exception(Exception.WRONG_DATABASE_USERNAME_PASSWORD)
    } else if (code == "ENOTFOUND") {
      throw new Exception(Exception.WRONG_SERVER_NAME_CONNECTION_STRING)
    }
    throw new Exception(Exception.CAN_NOT_CONNECTION_MONGGO_DB)
  }
}

export default connect;

connect();
