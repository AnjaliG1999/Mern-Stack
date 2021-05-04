import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import routes from "./routes.js";

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());
app.use("/", routes);
dotenv.config();

const connection_url = `mongodb+srv://anjali:${process.env.PASSWORD}@cluster0.4k5gg.mongodb.net/cakeshopdb?retryWrites=true&w=majority`;

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// connect db
// db.once("open", () => {
//   console.log("DB connected");

//   const userCollection = db.collection("users");
// });

app.listen(port, () => console.log(`Listening on localhost:${port}`));
