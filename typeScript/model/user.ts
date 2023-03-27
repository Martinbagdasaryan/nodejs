import mongoose from "mongoose";
import Role from "./roles";

const User = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  roles: [{ type: String, ref: Role }],
});

export default mongoose.model("User", User);
