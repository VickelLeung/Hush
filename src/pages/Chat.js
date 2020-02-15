import React, {PureComponent} from "react";
import styled from "styled-components";
import { w3cwebsocket as W3CWebSocket } from "websocket";

//const client = new W3CWebSocket('ws://localhost:8080/', 'echo-protocol');
const client = new W3CWebSocket('ws://localhost:3030');

class Chat extends React.PureComponent{
    
  state = {
        currentUsers: [],
        userActivity: [],
        username: "null",
        userMsg: "",
        messages: []

    };

    componentDidMount = () =>{

      client.onopen = function() {
        console.log('WebSocket Client Connected');
     
    };

    client.onmessage = (message) => {
      // this.setState({test : message.data});
      const getMsg = JSON.parse(message.data)
      this.addMessage(getMsg);
      console.log("got msg " + message.data);
    };

    client.onclose = function() {
      
        console.log('echo-protocol Client Closed');
    };

    }

    addMessage=(message)=>{ this.setState(state => ({ messages: [message, ...state.messages] })) }

    logInUser = () => {
        const username = this.username.value;
        if (username.trim()) {
          const data = {
            username
          };
          this.setState({
            ...data
          }, () => {
            client.send(JSON.stringify({
              ...data,
              type: "userevent"
            }));
          });
        }
      }
    
    sendMsg = () =>{
      const msg = {name: this.state.username, message: this.state.userMsg}
        console.log("send message: " + this.state.userMsg);

        client.send(JSON.stringify(msg));
        this.addMessage(msg);
       // console.log("thi: " + this.state.receiveMsg[0]);
    }

    render(){
        return(
            <Wrapper>
              <h>Message box</h>
                <MessageBox>
                  {this.state.messages.map((msg, index)=>{
                    return<div key={index}>
                      <h3>username: {msg.name}</h3>
                      <p>msg: {msg.message}</p>
                    </div>
                  })}
                </MessageBox>

                
                <span>Username: </span><input onChange={(e)=>{this.setState({username: e.target.value})}}/>

                <input onChange={(e)=>{this.setState({userMsg: e.target.value})}} />
                <button onClick={this.sendMsg}>Submit</button>
            </Wrapper>
        )
    }
}

export {Chat};

const Wrapper = styled.div``;

const MessageBox = styled.div``;