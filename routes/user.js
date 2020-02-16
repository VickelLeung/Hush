const express = require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require("../model/userModel");

users.use(cors());

process.env.SECRET_KEY = "secret";

//register a user
users.post("/register", (req, res)=>{
    const today = new Date();

    const userData = {
        email :  req.body.email,
        displayName : req.body.displayName,
        password  : req.body.password,
        created: today
    }

    console.log(userData);

    //verify if email exist
    User.findOne({
        email: req.body.email
    })
    .then((user)=>{
        //if user doesn't exist
        console.log(user);
        console.log(!user);
        if(!user){
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                userData.password = hash

                //create new user
                User.create(userData)
                .then((user)=>{
                    res.json({status: email.email + "Registered"});
                })
                .catch((err)=>{
                    res.send("Error: " + err);
                })
            })
        }
        else{
            res.json({error : "User already exist"})
        }
    })
    .catch((err)=>{
        res.send("Error: " + err);
    })
})

users.post('/login', (req, res)=>{
    User.findOne({
        email: req.body.email
    })
    .then((user)=>{
        //compare data if it is true
        if(bcrypt.compareSync(req.body.password, user.password)){
            const payload = {
                _id: user._id,
                displayName: user.displayName,
                email: user.email
            }
            //set a token to be passed to client
            let token = jwt.sign(payload, process.env.SECRET_KEY,{
                expiresIn: 2400
            })
            console.log("sucessfully sign in");
            res.send(token);
        }
        else{
            //password don't match
            res.json({error: "Error, password does not match"})
        }
    })
    .catch((err)=>{
        res.send("Error: " + err);
    })
})

users.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  
    User.findOne({
      _id: decoded._id
    })
      .then(user => {
        if (user) {
          res.json(user)
        } else {
          res.send('User does not exist')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })

  module.exports = users