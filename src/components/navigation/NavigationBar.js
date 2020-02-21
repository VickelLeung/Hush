import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

class NavigationBar extends PureComponent {
  state = {
    currentTab: 0
  };

  setTab = tab => {
    this.setState({
      currentTab: tab
    });

    console.log(this.state.currentTab);
  };

  render() {
    const linkCss = { color: "white" };

    return (
      <Wrapper>
        <TabContainer
          value={this.state.currentTab}
          aria-label="navigation"
          centered
        >
          <LinkItem to="/">
            <Tab onClick={() => this.setTab(0)} style={linkCss} label="Home" />
          </LinkItem>

          <LinkItem to="/explore">
            <Tab
              onClick={() => this.setTab(1)}
              style={linkCss}
              label="Explore"
            />
          </LinkItem>

          <LinkItem to="/categories">
            <Tab
              onClick={() => this.setTab(2)}
              style={linkCss}
              label="Categories"
            />
          </LinkItem>

          <LinkItem to="/createpost">
            <Tab
              onClick={() => this.setTab(3)}
              style={linkCss}
              label="Post secrets"
            />
          </LinkItem>
        </TabContainer>

        {/* <LinkItem to="/chat"/> */}

        <AuthenticateContainer>
          <LoginBtn to="/login">Login</LoginBtn>
          <RegisterBtn to="/register">Register</RegisterBtn>
        </AuthenticateContainer>
      </Wrapper>
    );
  }
}

export { NavigationBar };

const Wrapper = styled.div`
  padding: 1% 0;
  text-align: center;
  background-color: black;
`;

const LinkItem = styled(Link)`
  margin: 0 2%;
  text-decoration: none;
  color: white;
`;

const LoginBtn = styled(Link)`
  border-radius: 20px;
  border: 1px solid white;
  background-color: white;
  color: black;
  text-decoration: none;
  padding: 1%;
  margin: 0 3%;
`;

const RegisterBtn = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5%;
  margin: 0 3%;
`;

const AuthenticateContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1%;
`;

const TabContainer = styled(Tabs)`
  background-color: rgba(0, 0, 0, 0.6);
  height: 4em;

  .MuiTabs-indicator {
    background-color: gray;
  }
`;
