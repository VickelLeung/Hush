import React, { PureComponent } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import logo from "../../images/logo/logo1.png";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import i18n from "../../i18n";

import { withNamespaces } from "react-i18next";

class NavigationBar extends PureComponent {
  state = {
    currentTab: 0,
    language: "en",
  };

  setTab = (tab) => {
    this.setState({
      currentTab: tab,
    });
  };

  handleChange = (e) => {
    let lang = e.target.value;

    this.setState({ language: lang });
    i18n.changeLanguage(lang);
  };

  render() {
    const linkCss = { color: "white" };
    const { t } = this.props;
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
            label={t("Home")}
            component={Link}
            to="/"
          />

          <Tab
            style={linkCss}
            onClick={() => this.setTab(1)}
            label={t("Explore")}
            component={Link}
            to="/explore"
          />

          <Tab
            style={linkCss}
            onClick={() => this.setTab(2)}
            label={t("View Post")}
            component={Link}
            to="/categories"
          />

          <Tab
            style={linkCss}
            onClick={() => this.setTab(3)}
            label={t("Post Secret")}
            component={Link}
            to="/createpost"
          />
        </TabContainer>

        <AuthenticateContainer>
          <AuthWrap>
            <LoginBtn to="/login">{t("Login")}</LoginBtn>
            <RegisterBtn to="/register">{t("Register")}</RegisterBtn>
          </AuthWrap>
          <TranslationConrainer>
            <SelectOption
              value={this.state.language}
              onChange={this.handleChange}
            >
              <MenuItem value="en">
                <Icon className="fas fa-language"></Icon>English
              </MenuItem>
              <MenuItem value="fr">
                <Icon className="fas fa-language"></Icon>French
              </MenuItem>
            </SelectOption>
          </TranslationConrainer>
        </AuthenticateContainer>
      </Wrapper>
    );
  }
}

export const NavBar = withNamespaces()(NavigationBar);

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
  position: relative;
  margin-right: 2%;
  display: flex;
  flex-direction: column;
`;

const AuthWrap = styled.div`
  margin: 3% 0;
`;
const TranslationConrainer = styled.div`
  position: absolute;
  bottom: 0;
`;
const TabContainer = styled(Tabs)`
  background-color: rgba(0, 0, 0, 0.6);
  height: 4em;

  .MuiTabs-indicator {
    background-color: white;
  }
`;

const LogoContainer = styled.div``;

const SelectOption = styled(Select)`
  .MuiSelect-select.MuiSelect-select {
    color: white;
  }
  .MuiInput-underline&::after {
    border-bottom: 2px solid white;
  }

  width: 8vw;
`;

const Icon = styled.i`
  margin-right: 3%;
`;
