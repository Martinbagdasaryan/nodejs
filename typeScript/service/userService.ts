import mongoose, { Error, ObjectId } from "mongoose";
import User from "../model/user";
import Role from "../model/roles";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userSchema, loginSchema, uirshus } from "../types/user";

const ObjectId = mongoose.Types.ObjectId;

const generateAccessToken = (id: uirshus, roles: Array<string>) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, process.env.SECRET!, { expiresIn: "24h" });
};

class UserService {
  async create(data: userSchema) {
    if (!data.name) throw new Error("The name field is required.");

    if (!data.surname) throw new Error("The surname field is required. ");

    if (!data.password) throw new Error("The password field is required. ");

    if (!data.email) throw new Error("The email field is required. ");

    const { name, surname, password, email, roles } = data;
    const hashPassword = bcrypt.hashSync(password, 7);
    const users = await User.findOne({ email });

    if (users) throw new Error("this is such a user");

    const userRole = await Role.findOne({ value: roles });

    const user = await User.create({
      name,
      surname,
      password: hashPassword,
      email,
      roles: userRole?.value || "USER",
    });

    await user.save();

    if (!user) throw new Error("User can not be created.");

    return "user registered";
  }

  async getAll() {
    const user = await User.find();
    if (user === null) throw new Error("user not found");
    return user;
  }

  async getOne(id: string) {
    if (id.length !== 24) throw new Error("user not found");

    const user = await User.findById(id);

    return user;
  }

  async update(user: userSchema) {
    const { _id } = user;
    if (_id.length !== 24) throw new Error("user not found");

    const updateUser = await User.findOneAndUpdate({ _id }, user, {
      new: true,
    });

    return updateUser;
  }

  async delete(id: string) {
    if (!id) throw new Error("is not id");

    if (id.length !== 24) throw new Error("user not found");

    const user = await User.findOneAndDelete(new ObjectId(id));
    if (user === null) throw new Error("user not found")

    return user;
  }

  async login(login: loginSchema) {
    const { email, password } = login;
    const user: uirshus | null = await User.findOne({ email });

    if (!user) {
      throw new Error("ther is no such user");
    }

    const validPossword = bcrypt.compareSync(password, user.password);

    if (validPossword === false) throw new Error("ther is no such user ");

    const token = generateAccessToken(user, user.roles);

    return { token };
  }
}

export default new UserService();
