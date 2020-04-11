import React, { PureComponent } from "react";
import styled from "styled-components";
// import { w3cwebsocket as W3CWebSocket } from "websocket";
import io from "socket.io-client";
//const client = new W3CWebSocket('ws://localhost:8080/', 'echo-protocol');
// const client = new W3CWebSocket("ws://localhost:3030");

const SOCKET_URI = "https://hushbackend.herokuapp.com/";
//process.env.REACT_APP_SERVER_URI;

class Chat extends React.PureComponent {
  socket = null;
  state = {
    currentUsers: [],
    userActivity: [],
    username: "null",
    userMsg: "",
    historyMsg: [],
  };

  componentDidMount = () => {
    this.initSocketConnection();
    this.setupSocketListeners();
  };

  initSocketConnection() {
    this.socket = io.connect(SOCKET_URI);
  }

  setupSocketListeners() {
    this.socket.on("message", this.onMessageRecieved.bind(this));
    // this.socket.on("reconnect", this.onReconnection.bind(this));
    // this.socket.on("disconnect", this.onClientDisconnected.bind(this));
  }

  onMessageRecieved = (message) => {
    let userChatData = this.state.historyMsg;
    let messageData = message.message;

    // userChatData[targetIndex].messages.push(messageData);
    this.setState({ userChatData });
  };

  addMessage = (message) => {
    this.setState((state) => ({ messages: [message, ...state.messages] }));
  };

  // logInUser = () => {
  //     const username = this.username.value;
  //     if (username.trim()) {
  //       const data = {
  //         username
  //       };
  //       this.setState({
  //         ...data
  //       }, () => {
  //         client.send(JSON.stringify({
  //           ...data,
  //           type: "userevent"
  //         }));
  //       });
  //     }
  //   }

  sendMsg = () => {
    console.log("test");
    this.socket.emit("message", this.state.userMsg);
  };

  render() {
    return (
      <Wrapper>
        <h>Message box</h>
        <MessageBox>
          {this.state.historyMsg.map((msg, index) => {
            return (
              <div key={index}>
                <h3>username: {msg.name}</h3>
                <p>msg: {msg.message}</p>
              </div>
            );
          })}
        </MessageBox>

        {/* <span>Username: </span><input onChange={(e)=>{this.setState({username: e.target.value})}}/> */}

        <input
          onChange={(e) => {
            this.setState({ userMsg: e.target.value });
          }}
        />
        <button onClick={this.sendMsg}>Submit</button>
      </Wrapper>
    );
  }
}

export { Chat };

const Wrapper = styled.div``;

const MessageBox = styled.div``;
