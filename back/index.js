//automatically load env file to our app
require("dotenv").config();

//import express
const express = require("express");

//import cors
const cors = require("cors");

//import connection file
require("./db/connection");

//import router file
const router = require("./routes/router");

//to parse larger image sizes (Dont need it, use express instead)
// const bodyParser = require("body-parser");

//create server
const server = express();

//to store port number
const PORT = 3000 || process.env.PORT;

//use in server app
server.use(cors());
// server.use(bodyParser({ limit: "50mb" }));

server.use(express.json({ limit: "50mb" }));
server.use(
  express.urlencoded({
    limit: "50mb",
  })
);
server.use(router);

//run app
server.listen(PORT, () => {
  console.log(`Blog server Started at port ${PORT}`);
});

// server.get("/", (req, res) => {
//   res.send("Lol");
// });

//  "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1"
//   },
