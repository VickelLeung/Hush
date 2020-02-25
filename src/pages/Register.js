import React, { PureComponent } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { register } from "../components/UserFunctions";
import LoginBg from "../images/backgroundImages/loginBg.png";
import { Link } from "react-router-dom";
import { SnackBars } from "../components/Snacbkar/SnackBars";

import { connect } from "react-redux";
import { userPostFetch } from "../actions/actions";

class Register extends PureComponent {
  state = {
    displayName: "",
    registerEmail: "",
    registerPassword: "",
    openRegister: false,
    openError: false
  };

  submitRegister = () => {
    const userData = {
      email: this.state.registerEmail,
      displayName:
        this.state.displayName.length === 0
          ? "no-name"
          : this.state.displayName,
      password: this.state.registerPassword
    };

    console.log(userData);
    // const userData = {
    //   displayName: this.state.displayName,
    //   registerEmail: this.state.registerEmail,
    //   registerPassword: this.state.registerPassword
    // };

    this.props.userPostFetch(userData);

    register(userData).then(res => {
      console.log(res);
      if (res) {
        console.log(res);
        console.log("good");
        this.setState({ openRegister: true });
        console.log("open" + this.state.openRegister);

        setTimeout(() => {
          this.props.history.push(`/login`);
        }, 4000);
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
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button
              onClick={() => {
                this.setState({ isAuthenticated: !this.state.isAuthenticated });
              }}
            >
              Already have an account? Click to Login
            </Button>
          </Link>
        </LinkContainer>

        <SnackBars open={this.state.openRegister} severity="success">
          Sucessfully registered! You will be redirect to login.
        </SnackBars>
        <SnackBars open={this.state.openError} severity="error">
          Error, could not register. Please try again.
        </SnackBars>
      </div>
    );

    return <Wrapper>{Register}</Wrapper>;
  }
}

const mapDispatchToProps = dispatch => ({
  userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
});

export default connect(null, mapDispatchToProps)(Register);

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
  text-align: center;
  margin: 0 30%;
`;
