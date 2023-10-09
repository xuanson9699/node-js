import { print, OutputType } from "../helpers/print.js";

export default class Exception extends Error {
  static WRONG_DATABASE_USERNAME_PASSWORD = "Wrong database's username and password";
  static WRONG_SERVER_NAME_CONNECTION_STRING = "Wrong server name/connection string";
  static CAN_NOT_CONNECTION_MONGGO_DB = "Cannot connect to MongooDB";
  static USER_EXIST = "User already exists";
  static USER_NOT_EXIST = "User not exists";
  static CANNOT_REGISTER_USER = "Cannot register user";
  static THE_SYSTEM_HAS_AN_ERROR = "The system has an error";
  static USER_OR_PASSWORD_NOT_CORRECT = "User or password not correct";
  constructor(message) {
    super(message);
    print(message, OutputType.ERROR);
  }
}
