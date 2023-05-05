//import mongoose
const mongoose = require("mongoose");

//define schema for product collection to store data
const postSchema = new mongoose.Schema({
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
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
});

//creating a model to store products
const posts = new mongoose.model("posts", postSchema);

//export model
module.exports = posts;
