import mongoose from "mongoose";

import validate from "../serviceFunctions/validate.js";

const cakesSchema = mongoose.Schema({
  cakeid: {
    type: String,
    required: true,
  },
  createdate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  eggless: {
    type: Boolean,
    required: true,
  },
  flavour: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
    min: 0,
  },
  owner: {
    email: {
      type: String,
      required: true,
      validate: validate.validateEmail,
    },
    name: {
      type: String,
      required: true,
    },
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  ratings: {
    type: Number,
    min: 0,
    max: 5,
    default: 3.5,
  },
  reviews: {
    type: Number,
    default: 0,
    min: 0,
  },
  type: {
    type: String,
    required: true,
    enum: ["Birthday", "Anniversary", "General", "Photo Cake"],
  },
  weight: {
    type: Number,
    min: 0,
    max: 5,
  },
});

export default mongoose.model("cakes", cakesSchema);
