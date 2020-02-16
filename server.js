const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.uri, {useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("connection established");
});

//const getRouter = require('./routes/get');
const postRouter = require('./routes/post');

const userRouter = require('./routes/user');

app.use("/post", postRouter);

app.use("/user", userRouter);

// app.get('/', function (req, res) {
//     res.send('hello world')
//   })

// const exerciseRouter = require('./routes/exercises');
// const userRouter = require('./routes/users');

// app.use("/exercises", exerciseRouter);
// app.use("/users", userRouter);


app.listen(port, ()=>{
    console.log("Server is running on port: " + port);
});