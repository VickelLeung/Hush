import React, { PureComponent } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styled from "styled-components";
import axios from "axios";
import {one} from "../../images/backgroundImages";
import bgImg from "../../images/backgroundImages/motoki-tonn-vV1a1Leq-dQ-unsplash.jpg";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class PostCard extends PureComponent{

  state={
    card: [],
    picture: "",
    comments:[],
    username:"",
    message:""
  }

  generateRandomImage = () =>{
    
  }

  componentDidMount=()=>{
    this.getCard();
  }
  
  getCard=()=>{
    let id  = this.props.match.params.id;
    console.log(id);
    axios.get('http://localhost:3001/post/love/'+id)
    .then((result)=>{
    
      let tempArr = result.data[0].comment;
      console.log("s: "+ tempArr);
      this.setState({card: result.data, comments: tempArr })
    });
  }

  postComment =()=>{
    let id  = this.props.match.params.id;
    let data ={username: this.state.username, message: this.state.message}
    axios.put('http://localhost:3001/post/love/comment/'+id, data )
    .then(r => console.log(r.status))
    .catch(e => console.log(e));

    //get comments
    axios.get('http://localhost:3001/post/love/'+id)
    .then((result)=>{
    
      let tempArr = result.data[0].comment;
      console.log("s: "+ tempArr);
      this.setState({comments: tempArr });
    });
   
  }

render(){

    return(
        <Wrapper >
            {this.state.card.map((item)=>{
            return <Card style={{padding: "0 5%"}} variant="outlined">
            <CardContent>
              <Typography  color="textSecondary" component="h3">
               {item.title}
              </Typography>
              <Typography variant="body2" component="p">
                from: {item.user}
              </Typography>
              <Typography  color="textSecondary" component="h3">
               {item.date}
              </Typography>
              <Typography  color="textSecondary" component="h3">
               {item.description}
              </Typography>
            </CardContent>
          </Card>
            })}

            <Form>
            <TextField
                style={{margin: "2% 0"}}
                label="Username"
                rows="4"
                variant="filled"
                required
                onChange={(e)=>{this.setState({username:e.target.value})}}
              />
              <TextField
                style={{margin: "2% 0"}}
                id="filled-multiline-static"
                label="Post a comment"
                multiline
                rows="4"
                variant="filled"
                required
                onChange={(e)=>{this.setState({message:e.target.value})}}
              />
              <Button style={{margin: "2% 0"}} type="submit" onClick={this.postComment}>Submit</Button>
            </Form>
            
            {/* Comment sections below */}

            {this.state.comments.map((item)=>{
              return <div>
                <p>{item.username}</p>
                <p>{item.message}</p>
              </div>
            })}
        </Wrapper>
    )
 }
}

export {PostCard};

const Wrapper = styled.div`
    text-align:center;
    justify-content:center;
    align-items:center;
    border:2px solid black;
    margin: 2% 15%;
`;
const Form = styled.div`
  display:flex;
  flex-direction: column;
  margin: 0 20%;
`;