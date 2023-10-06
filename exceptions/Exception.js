import { print, OutputType } from "../helpers/print.js";

export default class Exception extends Error {
  static WRONG_DATABASE_USERNAME_PASSWORD = "Wrong database's username and password";
  static WRONG_SERVER_NAME_CONNECTION_STRING = "Wrong server name/connection string";
  static CAN_NOT_CONNECTION_MONGGO_DB = "Cannot connect to MongooDB";
  static USER_EXIST = "User already exists";
  constructor(message) {
    super(message);
    print(message, OutputType.ERROR);
  }
}
