import mongoose from "mongoose";

const Schema = mongoose.Schema;

import validate from "./validate.js";

const usersSchema = Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [validate.validateEmail, "Please fill a valid email address"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: [validate.validatePassword, "Please fill a valid password"],
  },
  token: {
    type: String,
    required: [true, "Token is required"],
    unique: true,
  },
});

export default mongoose.model("users", usersSchema);
