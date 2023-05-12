//to define routes for client requests, create routes folder and router.js file

//import express
const express = require("express");

const router = new express.Router();

const accountController = require("../controllers/accountController");

const pendingpostController = require("../controllers/pendingpostController");

//import webtoken
const jwt = require("jsonwebtoken");

//Router specific middleware for verifying token
const jwtMiddleware = (req, res, next) => {
  console.log("JWT Middleware");
  //getting token from req headers
  const token = req.headers["verify-token"];
  console.log(token);
  try {
    //verify token
    const data = jwt.verify(token, "ultrasecretkey");
    if (data) {
      console.log("Success");
    }
    // console.log(data);
    //to get login account number
    req.username = data.username;
    //to process client request
    next();
    console.log("Error in try");
  } catch {
    console.log("Error!!");
    res.status(401).json({ message: "Error Occured...Please Log In!" });
  }
};

//register
router.post("/home/register", accountController.register);

//login
router.post("/home/login", accountController.login);

//create post
router.post("/home/create-post", jwtMiddleware, pendingpostController.createPost);

//all-posts
router.get("/home/all-posts", pendingpostController.getPosts);

//view-post
router.get("/home/view-post/:id", pendingpostController.viewPost);

module.exports = router;
