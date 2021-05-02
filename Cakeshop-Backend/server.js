import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import Users from "./dbUsers.js";

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());
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

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

const rand = () => {
  return Math.random().toString(36).substr(2); // remove `0.`
};

const token = () => {
  return rand() + rand(); // to make it longer
};

app.post("/api/register", (req, res) => {
  const userData = req.body;

  //   check if user exists, else add in db
  Users.countDocuments({ email: userData.email }, (err, count) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (count !== 0) {
        res.status(409).send("User already exists");
      } else {
        userData.token = token();
        Users.create(userData, (err, data) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(201).send("User registered successfully");
          }
        });
      }
    }
  });
});

// app.post("/api/login", (req, res) => {
//   console.log(req.body);
// });

app.listen(port, () => console.log(`Listening on localhost:${port}`));
