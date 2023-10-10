import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserByToken } from "../authentication/auth.js";
import Exception from "../exceptions/Exception.js";
import { User } from "../models/index.js";

const login = async ({ email, password }) => {
  let existingUser = await User.findOne({ email }).exec();
  const isMatched = await bcrypt.compare(password, existingUser?.password);
  const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
  if (!existingUser || !isMatched) {
    throw new Exception(Exception.USER_OR_PASSWORD_NOT_CORRECT);
  }
  const token = jwt.sign({ email, password: hashedPassword }, process.env.SECRET_KEY, { expiresIn: "1h" });
  return token;
};
const register = async ({ email, password, name, phoneNumber, gender, address, languages }) => {
  try {
    let existingUser = await User.findOne({ email }).exec();
    if (!!existingUser) {
      throw new Exception(Exception.USER_EXIST);
    }
    // encrypt password
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      gender,
      languages,
    });
    return {
      ...newUser._doc,
      password: "Not Show",
    };
  } catch (exception) {
    // check model validation here
    throw new Exception(Exception.CANNOT_REGISTER_USER);
  }
};

const profile = async (req, res) => {
  try {
    debugger;
    const userByToken = getUserByToken(req, res);
    const userInfo = await User.findOne({ email: userByToken.email });
    return {
      ...userInfo._doc,
      password: 'not show'
    }
  } catch (exception) {}
};

const getAllUser = async () => {
  try {
    // const query = { name: { $regex: 'c' } };
    return User.find();
  } catch (exception) {
    // check model validation here
    throw new Exception(Exception.THE_SYSTEM_HAS_AN_ERROR);
  }
};
export default { login, register, getAllUser, profile };
