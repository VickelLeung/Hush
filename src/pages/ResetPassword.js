import React, { PureComponent } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { resetPassword } from "../components/UserFunctions";

import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";

class ResetPassword extends PureComponent {
  state = {
    id: "",
    password: "",
    confirmPass: ""
  };

  componentDidMount = () => {
    this.setState({ id: this.props.match.params.id });
  };

  requestReset = () => {
    const userData = {
      id: this.state.id,
      password: this.state.password
    };

    resetPassword(userData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        // this.setState({ errorMsg: err });
      });
  };

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
          <FormControl>
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              label="Password"
              id="standard-adornment-password"
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      this.setState({ showPassword: !this.state.showPassword });
                    }}
                    onMouseDown={event => {
                      event.preventDefault();
                    }}
                  >
                    {this.state.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="standard-adornment-password">
              Confirm Password
            </InputLabel>
            <Input
              label="Password"
              id="standard-adornment-password"
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.confirmPass}
              onChange={e => this.setState({ confirmPass: e.target.value })}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      this.setState({ showPassword: !this.state.showPassword });
                    }}
                    onMouseDown={event => {
                      event.preventDefault();
                    }}
                  >
                    {this.state.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button onClick={this.requestReset}>Submit</Button>
          <p>{this.state.email}</p>
        </FormContainer>
      </LoginContainer>
    );
    return <Wrapper>{Login}</Wrapper>;
  }
}

export { ResetPassword };

const Wrapper = styled.div`
  text-align: center;

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
