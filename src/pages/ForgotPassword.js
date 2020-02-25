import React, { PureComponent } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LoginBg from "../images/backgroundImages/loginBg.png";
import { sendResetLink } from "../components/UserFunctions";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

class ForgotPassword extends PureComponent {
  state = {
    email: "",
    errorMsg: "",
    open: false
  };

  requestReset = () => {
    const userData = {
      email: this.state.email
    };

    sendResetLink(userData)
      .then(res => {
        if (res === "No such email exist") console.log("error");
        else this.setState({ open: true });
        console.log(res);
      })
      .catch();
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  render() {
    let displayError = <p>Error : {this.state.errorMsg}</p>;

    let Login = (
      <LoginContainer>
        <Title>Fogotten password</Title>

        {this.state.errorMsg ? displayError : null}

        <FormContainer>
          <Details>
            Please enter your email so we can send a link to reset password
          </Details>
          <TextField
            style={{ background: "white", color: "white" }}
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
            label="Email: "
          />

          <Button variant="outlined" onClick={this.handleClick}>
            Open success snackbar
          </Button>

          <Snackbar
            open={this.state.open}
            autoHideDuration={3000}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
          >
            <MuiAlert
              onClose={this.handleClose}
              severity="success"
              elevation={6}
              variant="filled"
            >
              Sucess! Please check your email for reset password link.
            </MuiAlert>
          </Snackbar>

          {/* <Snackbar
            open={this.state.open}
            autoHideDuration={3000}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
          >
            <MuiAlert
              onClose={this.handleClose}
              severity="error"
              elevation={6}
              variant="filled"
            >
              Error, we could not send an email
            </MuiAlert>
          </Snackbar> */}

          <Button onClick={this.requestReset}>Submit</Button>
        </FormContainer>
      </LoginContainer>
    );
    return <Wrapper>{Login}</Wrapper>;
  }
}

export { ForgotPassword };

const Wrapper = styled.div`
  text-align: center;
  background-image: url(${LoginBg});
  height: 90vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  width: 100vw;
`;

const Title = styled.h1``;

const FormContainer = styled.div`
border: 1px solid black;
border-radius: 20px;
display: flex;
flex-direction: column;
align-items; center;
justify-content: center;
margin: 0 30%;
padding: 1% 2%;
height: 20vh;
`;

const Details = styled.div``;
