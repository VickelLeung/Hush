const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const nodemailer = require("nodemailer");

users.use(cors());

process.env.SECRET_KEY = "secret";

//register a user
users.post("/register", (req, res) => {
  const today = new Date();

  let email = req.body.email;
  let displayName = req.body.displayName;
  let password = req.body.password;
  // let securityQuestion = req.body.securityQuestion;
  let created = today;

  if (email === "" || displayName === "" || password === "")
    res.send("Error, empty parameters");

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
              res.json({ item });
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

users.post("/forgotten_password", (req, res) => {
  User.findOne({ email: req.body.email }).then(async user => {
    //if such user exist
    if (user) {
      console.log(user);
      console.log(user._id);
      //send the hash to email
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "joanne.carter@ethereal.email",
          pass: "D7TpwYezDsvVBB3GGn"
        }
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" vickelleung@gmail.com ', // sender address
        to: "vickel1993@hotmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Forgotten password", // plain text body
        html:
          "<b>Hello, you have requested a password reset. Please click on the link below to reset your password</b>" +
          "<br /><a href='https://sharehush.herokuapp.com/reset_password/" +
          user.id +
          " '>Reset your password </a> " +
          "<br/> <b>If you did not request a password reset, please ignore this message."
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      res.send("Password reset at " + nodemailer.getTestMessageUrl(info));
    } else {
      res.send("No such email exist");
    }
  });
});

//reset password
users.put("/reset_password/:id", (req, res) => {
  const id = req.params.id;

  console.log(req.body.password);
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    let password = req.body.password;
    password = hash;

    console.log(password);
    //update
    User.updateOne({ _id: id }, { $set: { password: password } })
      .then(() => {
        res.send("Password reset for " + id);
      })
      .catch(err => {
        err.send(err);
      });
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
