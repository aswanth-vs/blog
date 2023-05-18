const admin = require("../models/adminSchema");

const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  //logic to solve register(acno,uname,psswd)
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const account = await admin.findOne({ username });

    if (account) {
      res.status(401).json("Account already exists");
    } else {
      const newAccount = new admin({ username, password });
      await newAccount.save();
      res.status(200).json("Account Successfully Created");
    }
  } catch (error) {
    //error
    res.status(401).json(error);
  }
};

exports.login = async (req, res) => {
  console.log("Inside login logic");
  const { username, password } = req.body;
  try {
    const account = await admin.findOne({ username, password });

    if (account) {
      console.log("ADMIN LOGIN");
      const token = jwt.sign(
        {
          username: username,
        },
        "ultrasecretkey"
      );
      //   let adminAcc = true;
      //send login success or token?
      //check db.accounts vs await.findOne()

      res.status(200).json({ token, admin: true });
    } else {
      res.status(400).json("Invalid Account Number or Password");
    }
  } catch (error) {
    //error
    res.status(401).json(error);
  }
};
