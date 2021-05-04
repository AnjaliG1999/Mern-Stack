import express from "express";
import Users from "./dbUsers.js";
import cloudinary from "./utils/cloudinary.js";
import fileupload from "express-fileupload";

const app = express.Router();

app.use(fileupload({ useTempFiles: true }));

// console.log(cloudinary.config);

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
  const file = req.files.file;
  const authtoken = req.headers.authtoken;

  Users.countDocuments({ token: authtoken }, (err, count) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (count) {
        // save image from temp file location to the server
        cloudinary.v2.uploader.upload(file.tempFilePath, (err, data) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(201).send({ imageUrl: data.url });
          }
        });
      } else {
        res.send("Invalid user");
      }
    }
  });
});

export default app;
