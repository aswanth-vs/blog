const mongoose = require("mongoose");

//define schema for product collection to store data
const adminSchema = new mongoose.Schema({
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
const adminAccount = new mongoose.model("adminAccount", adminSchema);

//export model
module.exports = adminAccount;
