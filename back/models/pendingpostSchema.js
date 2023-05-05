//import mongoose
const mongoose = require("mongoose");

//define schema for product collection to store data
const pendingpostSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  banner: {
    name: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
  },
  content: {
    text: {
      type: String,
      required: true,
    },
    images: [
      {
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
      },
    ],
  },
});

//creating a model to store products
const pendingposts = new mongoose.model("pendingposts", pendingpostSchema);

//export model
module.exports = pendingposts;
