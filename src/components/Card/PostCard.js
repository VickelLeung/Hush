import React, { PureComponent } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import axios from "axios";

import { ShareSocial } from "../ShareSocial/ShareSocial";

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
    isLoggedIn: true,
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
      .then((result) => {
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
      .then((r) => console.log(r.status))
      .catch((e) => console.log(e));

    //get comments
    axios
      .get("https://hushbackend.herokuapp.com/post/love/" + id)
      .then((result) => {
        let tempArr = result.data[0].comment;
        console.log("s: " + tempArr);
        this.setState({ comments: tempArr });
      });
  };

  render() {
    let form = (
      <FormContainer>
        <CommentInput
          label="Post a comment"
          rows="4"
          variant="standard"
          required
          onChange={(e) => {
            this.setState({ message: e.target.value });
          }}
        />
        <Button
          style={{ margin: "2% 0" }}
          type="submit"
          onClick={this.postComment}
        >
          Comment
        </Button>
      </FormContainer>
    );

    let message = (
      <div>
        <h2>Please sign in to be able to comment</h2>
      </div>
    );

    return (
      <Wrapper>
        {this.state.card.map((item) => {
          return (
            <MainContainer>
              <TitleContainer>
                <Typography style={{ color: "white" }} component="h3">
                  {item.title}
                </Typography>
                <Typography style={{ color: "white" }} component="h3">
                  {item.date}
                </Typography>
              </TitleContainer>

              <CardItem style={{ padding: "5%" }} variant="outlined">
                <CardContent>
                  {/* <Typography color="textSecondary" component="h3">
                    {item.title}
                  </Typography> */}
                  <div>
                    <Typography variant="body2" component="p">
                      From: {item.user}
                    </Typography>
                  </div>

                  <div>
                    <Typography color="textSecondary" component="h3">
                      {item.description}
                    </Typography>
                  </div>
                </CardContent>
              </CardItem>
            </MainContainer>
          );
        })}
        <ShareSocial
          url={
            "https://hushbackend.herokuapp.com/post/love/" +
            this.props.match.params.id
          }
        />
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
          {this.state.comments.map((item) => {
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
// const Form = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin: 0 20%;
// `;

const MainContainer = styled.div`
  border: 1px solid white;
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  padding: 2% 0;
  background: linear-gradient(
    0deg,
    rgba(124, 123, 123, 0) 0%,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.5872724089635855) 0%,
    rgba(0, 0, 0, 1) 67%
  );
`;

const CardItem = styled.div`
  margin: 0 4%;

  box-shadow: 1px 5px 2px 2px #bebebe;
`;

const CommentContainer = styled.div`
  text-align: left;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2% 4%;
`;

const CommentInput = styled(TextField)`
  width: 100vw;
  margin: 2% 0;
`;
