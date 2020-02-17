import React, { PureComponent } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import {login} from "../components/UserFunctions";
import {register} from "../components/UserFunctions";

class Authenticate extends PureComponent{
    state={
        isLogin: false,
        isAuthenticated: false,
        loginEmail:"",
        loginPassword:"",
        
        isRegistered: false,
        displayName: "",
        registerEmail:"",
        registerPassword:""
    }

    submitRegister =()=>{
        const userData = { 
            email: this.state.registerEmail,
            displayName : this.state.displayName === 0 ? this.state.displayName  : "no-name",
            password: this.state.registerPassword
        }

        console.log(userData);

        register(userData).then(res => {
            if (res) {
                console.log("good");
              this.props.history.push(`/login`)
            }
            else{
                console.log("bad");
            }
          })
    }

    submitLogin =()=>{
      const userData = {
          email: this.state.loginEmail,
          password: this.state.loginPassword
      }

      login(userData).then(res => {
        if (res) {
          this.props.history.push(`/profile`)
        }
      })
    }

    render(){
    let Login = <LoginContainer>
        <Title>Login</Title>
        {/* {this.state.isLogin ? <p>You have successfully logged in</p> : <p>Error, please try again!</p>} */}
        <FormContainer>
            <TextField onChange={(e)=>{this.setState({loginEmail: e.target.value})}} label="Email: "/>
            <TextField type="password" onChange={(e)=>{this.setState({loginPassword: e.target.value})}} label="Password"/>
            <Button onClick={this.submitLogin}>Submit</Button>
        </FormContainer>
        <LinkContainer>
            <Button>Forgot password?</Button>
            <Button onClick={()=>{this.setState({isAuthenticated: !this.state.isAuthenticated})}}>
                Register an account
            </Button>
        </LinkContainer>
    </LoginContainer>

    let Register = <div>
        <Title>Register</Title>
        {/* {this.state.isRegistered ? <p>You have successfully registered</p> : <p>Error, please try again!</p>} */}
        <FormContainer>
            <TextField onChange={(e)=>{this.setState({registerEmail: e.target.value})}} label="Email: "/>
            <TextField onChange={(e)=>{this.setState({displayName: e.target.value})}} label="Display name: "/>
            <TextField type="password" onChange={(e)=>{this.setState({registerPassword: e.target.value})}} label="Password"/>
            <Button onClick={this.submitRegister}>Submit</Button>
        </FormContainer>
        <LinkContainer>
                <Button onClick={()=>{this.setState({isAuthenticated: !this.state.isAuthenticated})}}>
                    Already have an account? Click to Login
                </Button>
        </LinkContainer>
    </div>

    return(
        <Wrapper>
           {this.state.isAuthenticated ? Login : Register}
        </Wrapper>
    )
    }
}

export {Authenticate};

const Wrapper = styled.div`
text-align: center;
`;

const LoginContainer = styled.div``;

const Title = styled.h1``;

const FormContainer = styled.div`
border: 1px solid black;
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