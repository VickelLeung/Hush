const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/userModel");

users.use(cors());

process.env.SECRET_KEY = "secret";

//register a user
users.post("/register", (req, res) => {
  const today = new Date();

  let email = req.body.email;
  let displayName = req.body.displayName;
  let password = req.body.password;
  let created = today;

  const userData = new User({
    email,
    displayName,
    password,
    created
  });

  console.log("user: " + userData);

  //verify if email exist
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      //if user doesn't exist
      console.log("x: " + user);

      console.log(!user);
      if (!user) {
        //encrypt password and hash it with 10 salts
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;

          //create new user and save it
          userData
            .save()
            .then(item => {
              res.json({ status: userData.email + " Registered" });
            })
            .catch(err => res.status(400).json("Error: " + err));
        });
      } else {
        res.json({ error: "User already exist" });
      }
    })
    .catch(err => {
      res.send("Error: " + err);
    });
});

users.post("/login", (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      //compare data if it is true
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const payload = {
          _id: user._id,
          displayName: user.displayName,
          email: user.email
        };
        //set a token to be passed to client
        let token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 2400
        });
        // console.log("sucessfully sign in");
        // console.log(user);

        let tempObj = { ...user, token: token };
        console.log(tempObj);

        // tempObj.map(x => {
        //   return console.log(x.email);
        // });

        // user.push("token: " + token);
        res.send(tempObj);
      } else {
        //password don't match
        res.json({ error: "Error, password does not match" });
      }
    })
    .catch(err => {
      res.send("Error: " + err);
    });
});

users.get("/profile", (req, res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );

  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.send("User does not exist");
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

module.exports = users;
