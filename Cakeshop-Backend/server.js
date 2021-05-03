import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import cloudinary from "./utils/cloudinary";
// import upload from "./utils/multer";
import Users from "./dbUsers.js";
import fileupload from "express-fileupload";
import cloudinary from "cloudinary";

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());
app.use(
  fileupload({
    useTempFiles: true,
  })
);
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

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
        res.status(200).send({ message: "User already exists" });
      } else {
        userData.token = token();
        Users.create(userData, (err, data) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(201).send({ message: "User registered successfully" });
          }
        });
      }
    }
  });
});

app.post("/api/login", (req, res) => {
  const userData = req.body;

  Users.find(
    { email: userData.email, password: userData.password },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (Object.keys(data).length === 0) {
          res.status(200).send({ message: "Invalid Credentials" });
        } else {
          res.status(200).send({
            email: data[0].email,
            name: data[0].name,
            token: data[0].token,
          });
        }
      }
    }
  );
});

app.post("/api/upload", (req, res) => {
  const file = req.files.photo;
  // console.log(file);

  // save image from temp file location to the server
  cloudinary.v2.uploader.upload(file.tempFilePath, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send({ imageUrl: data.url });
    }
  });
});

app.listen(port, () => console.log(`Listening on localhost:${port}`));
