//import product collection/model
const accounts = require("../models/accountSchema");

const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  //logic to solve register(acno,uname,psswd)
  const { name, username, password } = req.body;
  console.log(req.body);
  try {
    const account = await accounts.findOne({ username: username });

    if (account) {
      res.status(401).json("Account already exists");
    } else {
      const newAccount = new accounts({ name, username, password });
      await newAccount.save();
      res.status(200).json("Account Successfully Created");
    }
  } catch (error) {
    //error
    res.status(401).json(error);
  }
};

//login
exports.login = async (req, res) => {
  console.log("Inside login logic");
  const { username, password } = req.body;
  try {
    const account = await accounts.findOne({ username, password });
    console.log("loginnn");

    if (account) {
      const token = jwt.sign(
        {
          username: username,
        },
        "ultrasecretkey"
      );
      //send login success or token?
      //check db.accounts vs await.findOne()

      res.status(200).json({ token });
    } else {
      res.status(400).json("Invalid Account Number or Password");
    }
  } catch (error) {
    //error
    res.status(401).json(error);
  }
};
