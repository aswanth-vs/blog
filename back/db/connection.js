//define mongodb connection

//import mongoose
const mongoose = require("mongoose");

//getting the connection string from .env
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to Databse");
  })
  .catch((err) => {
    console.log(err);
  });
