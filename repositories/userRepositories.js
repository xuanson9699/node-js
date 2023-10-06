import { User } from "../models/index.js";
import Exception from "../exceptions/Exception.js";
import bcrypt from "bcrypt";

const login = async ({ email, password }) => {};
const register = async ({ email, password, name, phoneNumber, gender, address }) => {
  try {
    let existingUser = await User.findOne({ email }).exec();
    if (!!existingUser) {
      throw new Exception(Exception.USER_EXIST);
    }
    const isMatched = await bcrypt.compare(password, existingUser.password);
    // encrypt password
  } catch (exception) {}
  console.log(111, `${email} ${password}`);
};
export default { login, register };
