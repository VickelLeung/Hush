const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var http = require("http").createServer(express);
const io = require("socket.io")(http);

const Chatroom = require("./chat/chatroom");

require("dotenv").config();

io.emit("some event", {
  someProperty: "some value",
  otherProperty: "other value",
}); // This will emit the event to all connected sockets

io.on("connection", function (client) {
  socket.broadcast.emit("hello there");

  socket.on("chat message", function (msg) {
    io.emit("chat message", msg);
  });

  //   const {
  //     handleRegister,
  //     handleJoin,
  //     handleLeave,
  //     handleMessage,
  //     handleGetChatrooms,
  //     handleGetAvailableUsers,
  //     handleDisconnect,
  //   } = makeHandlers(client, clientManager, chatroomManager, Chatroom);

  //   console.log("client connected...", client.id);
  //   clientManager.addClient(client);

  //   client.on("register", handleRegister);

  //   client.on("join", handleJoin);

  //   client.on("leave", handleLeave);

  //   client.on("message", handleMessage);

  //   client.on("chatrooms", handleGetChatrooms);

  //   client.on("availableUsers", handleGetAvailableUsers);

  //   client.on("disconnect", function () {
  //     console.log("client disconnect...", client.id);
  //     handleDisconnect();
  //   });

  client.on("error", function (err) {
    console.log("received error from client:", client.id);
    console.log(err);
  });
});

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("connection established");
});

const postRouter = require("./routes/post");

const userRouter = require("./routes/user");

app.use("/post", postRouter);

app.use("/user", userRouter);

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
