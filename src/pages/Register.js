import React, { PureComponent } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { register } from "../components/UserFunctions";
import LoginBg from "../images/backgroundImages/loginBg.png";

class Register extends PureComponent {
  state = {
    isRegistered: false,
    displayName: "",
    registerEmail: "",
    registerPassword: ""
  };

  submitRegister = () => {
    const userData = {
      email: this.state.registerEmail,
      displayName:
        this.state.displayName === 0 ? this.state.displayName : "no-name",
      password: this.state.registerPassword
    };

    console.log(userData);

    register(userData).then(res => {
      console.log(res);
      if (res) {
        console.log(res);
        console.log("good");
        this.props.history.push(`/login`);
      } else {
        console.log("bad");
      }
    });
  };

  render() {
    let Register = (
      <div style={{ width: "100vw" }}>
        <Title>Register</Title>
        {/* {this.state.isRegistered ? <p>You have successfully registered</p> : <p>Error, please try again!</p>} */}
        <FormContainer>
          <TextField
            onChange={e => {
              this.setState({ registerEmail: e.target.value });
            }}
            label="Email: "
          />
          <TextField
            onChange={e => {
              this.setState({ displayName: e.target.value });
            }}
            label="Display name: "
          />
          <TextField
            type="password"
            onChange={e => {
              this.setState({ registerPassword: e.target.value });
            }}
            label="Password"
          />
          <Button onClick={this.submitRegister}>Submit</Button>
        </FormContainer>
        <LinkContainer>
          <Button
            onClick={() => {
              this.setState({ isAuthenticated: !this.state.isAuthenticated });
            }}
          >
            Already have an account? Click to Login
          </Button>
        </LinkContainer>
      </div>
    );

    return <Wrapper>{Register}</Wrapper>;
  }
}

export { Register };

const Wrapper = styled.div`
  text-align: center;
  background-image: url(${LoginBg});
  height: 90vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
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
`;

const LinkContainer = styled.div`
display: flex;
flex-direction: row;
align-items; center;
justify-content: space-between;
margin: 0 30%;
`;
