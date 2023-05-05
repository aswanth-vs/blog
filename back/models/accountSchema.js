//import mongoose
const mongoose = require("mongoose");

//define schema for product collection to store data
const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//creating a model to store products
const accounts = new mongoose.model("accounts", accountSchema);

//export model
module.exports = accounts;

exports.createPost = async (req, res) => {
  const { username, date, title, content } = req.body;
  console.log("Body", req.body);
  try {
    const account = await accounts.findOne({ username: username });
    if (account) {
      console.log("Inside If");
      const post = new pendingposts({ author: username, date, title, content });
      console.log("After post");
      await post.save();
      console.log("After Save");
      res.status(200).json("Post created");
    } else {
      res.status(404).json("Account not Found");
    }
  } catch (error) {
    //error

    res.status(401).json(error);
  }
};
