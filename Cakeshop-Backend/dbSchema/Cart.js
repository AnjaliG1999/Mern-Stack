import mongoose from "mongoose";

import validate from "../serviceFunctions/validate.js";

const cartsSchema = mongoose.Schema({
  cartid: {
    type: String,
    required: true,
    unique: true,
  },
  cakes: [
    {
      cakeid: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        validate: validate.validateEmail,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      weight: {
        type: Number,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        min: 1,
        default: 1,
      },
    },
  ],
});

export default mongoose.model("carts", cartsSchema);
