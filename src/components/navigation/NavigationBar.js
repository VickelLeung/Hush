import React, { PureComponent } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import logo from "../../images/logo/logo1.png";

import i18n from "../../i18n";

class NavigationBar extends PureComponent {
  state = {
    currentTab: 0,
  };

  setTab = (tab) => {
    this.setState({
      currentTab: tab,
    });
  };
  changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  render() {
    const linkCss = { color: "white" };
    return (
      <Wrapper>
        <LogoContainer>
          <Link to="/">
            <img src={logo} onClick={() => this.setTab(0)} />
          </Link>
        </LogoContainer>

        <TabContainer
          value={this.state.currentTab}
          aria-label="navigation"
          centered
        >
          <Tab
            style={linkCss}
            onClick={() => this.setTab(0)}
            label="Home"
            component={Link}
            to="/"
          />

          <Tab
            style={linkCss}
            onClick={() => this.setTab(1)}
            label="Explore"
            component={Link}
            to="/explore"
          />

          <Tab
            style={linkCss}
            onClick={() => this.setTab(2)}
            label="View posts"
            component={Link}
            to="/categories"
          />

          <Tab
            style={linkCss}
            onClick={() => this.setTab(3)}
            label="Post secrets"
            component={Link}
            to="/createpost"
          />
        </TabContainer>

        <AuthenticateContainer>
          <AuthWrap>
            <LoginBtn to="/login">Login</LoginBtn>
            <RegisterBtn to="/register">Register</RegisterBtn>
          </AuthWrap>
          <TranslationConrainer>
            <button onClick={() => this.changeLanguage("fr")}>fr</button>
            <button onClick={() => this.changeLanguage("en")}>en</button>
          </TranslationConrainer>
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LinkItem = styled(NavLink)`
  margin: 0 2%;
  text-decoration: none;
  color: gray;
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
  padding: 1%;
  margin-right: 2%;
  display: flex;
  flex-direction: column;
`;

const AuthWrap = styled.div``;
const TranslationConrainer = styled.div``;
const TabContainer = styled(Tabs)`
  background-color: rgba(0, 0, 0, 0.6);
  height: 4em;

  .MuiTabs-indicator {
    background-color: white;
  }
`;

const LogoContainer = styled.div``;
