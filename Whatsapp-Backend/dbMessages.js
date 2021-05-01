import mongoose from "mongoose";

// db schema
const whatsappSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
});

// collection will always be created in mongodb in lowercase, no matter what you write: messagecontents

// if not there, mongo adds the "s" automaticaaly at the end of the collection name

// this is a collection
export default mongoose.model("messagecontents", whatsappSchema);
