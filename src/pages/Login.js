import React, { PureComponent } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { login } from "../components/UserFunctions";
import LoginBg from "../images/backgroundImages/loginBg.png";
import { Link } from "react-router-dom";

import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import { SnackBars } from "../components/Snacbkar/SnackBars";
import { connect } from "react-redux";
import { userLogin } from "../actions/actions";

class Login extends PureComponent {
  state = {
    userDetail: [],
    isLogin: false,
    loginEmail: "",
    loginPassword: "",
    errorMsg: "",
    password: "",
    showPassword: false,
    openError: false
  };

  submitLogin = () => {
    const userData = {
      email: this.state.loginEmail,
      password: this.state.loginPassword
    };

    this.props.userLogin(userData);

    // login(userData)
    //   .then(res => {
    //     // console.log(res);
    //     // console.log(res === null);
    //     // console.log(res.error);

    //     if (res.error) {
    //       console.log("Erros ");
    //       this.setState({ openError: true });
    //     }

    //     if (res._doc != null) {
    //       console.log(res);
    //       this.setState({ isLogin: true });

    //       this.props.history.push({
    //         pathname: "/profile",
    //         // search: "?query=abc",
    //         state: { detail: res }
    //       });
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     // this.setState({ errorMsg: err });
    //   });
  };

  render() {
    let displayError = <p>Error : {this.state.errorMsg}</p>;

    let Login = (
      <LoginContainer>
        <Title>
          Login <i className="fas fa-sign-in-alt" />
        </Title>

        {this.state.errorMsg ? displayError : null}

        <FormContainer>
          <TextField
            type="email"
            style={{ background: "white", color: "white" }}
            onChange={e => {
              this.setState({ loginEmail: e.target.value });
            }}
            label="Email: "
          />

          <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              label="Password"
              id="standard-adornment-password"
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.loginPassword}
              onChange={e => this.setState({ loginPassword: e.target.value })}
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

          <Button onClick={this.submitLogin}>Submit</Button>
        </FormContainer>
        <LinkContainer>
          <Link style={{ textDecoration: "none" }} to="forgotten_password">
            <Button>Forgot password?</Button>
          </Link>

          <LinkItem to="/register">
            <Button>Register an account</Button>
          </LinkItem>
        </LinkContainer>
      </LoginContainer>
    );
    return (
      <Wrapper>
        {Login}

        <SnackBars open={this.state.openError} severity="error">
          Error! You did not provide the right email or password.
        </SnackBars>
        {/* <p>Test {this.props.userDetail}</p> */}
      </Wrapper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  userLogin: userInfo => dispatch(userLogin(userInfo))
});

const mapStateToProps = state => {
  console.log(state.currentUser._doc);
  return {
    userDetails: state.currentUser._doc
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

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
`;

const LinkContainer = styled.div`
display: flex;
flex-direction: row;
align-items; center;
justify-content: space-between;
margin: 0 30%;
`;

const LinkItem = styled(Link)`
  text-decoration: none;
`;
