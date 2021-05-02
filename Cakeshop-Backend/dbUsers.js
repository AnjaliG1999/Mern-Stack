import mongoose from "mongoose";

const Schema = mongoose.Schema;

const usersSchema = Schema({
  email: String,
  name: String,
  password: String,
  token: String,
});

export default mongoose.model("users", usersSchema);
