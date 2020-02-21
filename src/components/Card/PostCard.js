import React, { PureComponent } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import axios from "axios";
import { one } from "../../images/backgroundImages";
import bgImg from "../../images/backgroundImages/motoki-tonn-vV1a1Leq-dQ-unsplash.jpg";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class PostCard extends PureComponent {
  state = {
    card: [],
    picture: "",
    comments: [],
    username: "",
    message: "",
    isLoggedIn: false
  };

  generateRandomImage = () => {};

  componentDidMount = () => {
    this.getCard();
  };

  getCard = () => {
    let id = this.props.match.params.id;
    console.log(id);
    axios
      .get("https://hushbackend.herokuapp.com/post/love/" + id)
      .then(result => {
        let tempArr = result.data[0].comment;
        console.log("s: " + tempArr);
        this.setState({ card: result.data, comments: tempArr });
      });
  };

  postComment = () => {
    let id = this.props.match.params.id;
    let data = { username: this.state.username, message: this.state.message };
    axios
      .put("https://hushbackend.herokuapp.com/love/comment/" + id, data)
      .then(r => console.log(r.status))
      .catch(e => console.log(e));

    //get comments
    axios
      .get("https://hushbackend.herokuapp.com/post/love/" + id)
      .then(result => {
        let tempArr = result.data[0].comment;
        console.log("s: " + tempArr);
        this.setState({ comments: tempArr });
      });
  };

  render() {
    let form = <div></div>;

    let message = (
      <div>
        <h2>Please sign in to be able to comment</h2>
      </div>
    );

    return (
      <Wrapper>
        {this.state.card.map(item => {
          return (
            <MainContainer>
              <TitleContainer>
                <Typography color="textSecondary" component="h3">
                  {item.title}
                </Typography>
              </TitleContainer>
              <CardItem style={{ padding: "5%" }} variant="outlined">
                <CardContent>
                  {/* <Typography color="textSecondary" component="h3">
                    {item.title}
                  </Typography> */}
                  <Typography variant="body2" component="p">
                    from: {item.user}
                  </Typography>
                  <Typography color="textSecondary" component="h3">
                    {item.date}
                  </Typography>
                  <Typography color="textSecondary" component="h3">
                    {item.description}
                  </Typography>
                </CardContent>
              </CardItem>
            </MainContainer>
          );
        })}

        {/* <Form>
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
            </Form> */}

        {/* Comment sections below */}
        {this.state.isLoggedIn ? form : message}

        <CommentContainer>
          {this.state.comments.map(item => {
            return (
              <User>
                <p>{item.username}</p>
                <p>{item.message}</p>
              </User>
            );
          })}
        </CommentContainer>
      </Wrapper>
    );
  }
}

export { PostCard };

const Wrapper = styled.div`
  text-align: center;
  justify-content: center;
  align-items: center;

  margin: 2% 15%;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20%;
`;

const MainContainer = styled.div`
  border: 2px solid green;
  position: relative;
`;

const TitleContainer = styled.div`
  position: absolute;
  border: 2px solid black;
  height: 15vh;
  width: 10vw;
`;

const CardItem = styled.div`
  border: 2px solid red;
  margin: 5%;
`;

const CommentContainer = styled.div`
  border: 2px solid red;
  text-align: left;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
`;
