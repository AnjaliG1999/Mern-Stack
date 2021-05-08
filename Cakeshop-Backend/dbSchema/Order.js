import mongoose from "mongoose";

import validate from "../serviceFunctions/validate.js";

const ordersSchema = mongoose.Schema({
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
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
    validate: validate.validatePin,
  },
  phone: {
    type: String,
    required: true,
    validate: validate.validatePhone,
  },
  email: {
    type: String,
    required: true,
    validate: validate.validateEmail,
  },
  name: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    default: "cash",
  },
  orderdate: {
    type: String,
    required: true,
  },
  orderid: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("orders", ordersSchema);
