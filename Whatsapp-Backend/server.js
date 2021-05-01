// imports
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";

import Messages from "./dbMessages.js";

// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1197247",
  key: "0a73fc52f56787dbfe48",
  secret: "5e90b5d2c5f774a9bcd8",
  cluster: "ap2",
  useTLS: true,
});

// middleware
// to correctly get the json response from server
app.use(express.json());

// db config
const connection_url =
  "mongodb+srv://anjali:CSZ08hClXSVZxSif@cluster0.e8mfj.mongodb.net/whatsappdb?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// run only 1 time, once the connection is open
db.once("open", () => {
  console.log("DB Connected");

  //   access collection with all documents
  const msgCollection = db.collection("messagecontents");

  //   something changed in our DB
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    // console.log(change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;

      // channel, event, obj
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

// api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));

// CSZ08hClXSVZxSif
