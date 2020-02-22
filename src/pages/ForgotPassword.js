import React, { PureComponent } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LoginBg from "../images/backgroundImages/loginBg.png";

class ForgotPassword extends PureComponent {
  state = {
    email: "",
    errorMsg: ""
  };

  requestReset = () => {};

  render() {
    let displayError = <p>Error : {this.state.errorMsg}</p>;

    let Login = (
      <LoginContainer>
        <Title>Reset your password</Title>

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

          <Button onClick={this.requestReset}>Submit</Button>
          <p>{this.state.email}</p>
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
