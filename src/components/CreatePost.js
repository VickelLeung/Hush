import React, { Component } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
// import Modal from '@material-ui/core/Modal';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";
import createPostBg from "../images/backgroundImages/createPostBg.png";
import axios from "axios";
import Captcha from "demos-react-captcha";

import { SnackBars } from "../components/SnackBars/SnackBars";

import { withNamespaces } from "react-i18next";

class CreatePost extends Component {
  state = {
    title: "",
    user: "",
    category: "",
    description: "",
    checked: "a",
    isModal: false,
    linkID: "",
    isValid: false,
    isError: false,
  };

  submit = () => {
    let username = "";
    if (
      this.state.checked === "a"
        ? (username = "Anonymous")
        : (username = this.state.user)
    );

    const post = {
      isValid: this.state.isValid,
      user: username,
      title: this.state.title,
      category: this.state.category,
      description: this.state.description,
      date: new Date().toDateString(),
    };
    // console.log("submit...");
    if (this.state.title && this.state.category && this.state.description) {
      axios
        .post("https://hushbackend.herokuapp.com/post/add", post)
        .then((response) => {
          console.log(response.data);
          console.log("id:" + response.data.id);
          //set link
          this.setState({ linkID: response.data });
        })
        .catch((err) => console.log(err));
      //this.resetContent();
      this.displayModal();
    } else {
      this.setState({ isError: true });
    }
  };

  displayModal = () => {
    //display modal
    this.setState({ isModal: true });
  };

  resetContent = () => {
    //reset all state
    this.setState({
      title: "",
      user: "",
      category: "",
      description: "",
      checked: "a",
    });
  };

  handleChange = (event) => {
    console.log("event" + event.target.value);
    this.setState({ category: event.target.value });
  };

  render() {
    const { t } = this.props;
    return (
      <Wrapper>
        <MainContainer>
          <InfoContainer>
            <Title>{t("Post Title")}</Title>
            <Title>{t("Post Description")}</Title>
            <SubTitle>{t("Post Subdescription")}</SubTitle>
          </InfoContainer>
          <FormContainer>
            <LabelText>{t("Post Form Title")}</LabelText>
            {this.state.isError && !this.state.title ? (
              <ErrorMsg>ERROR: Please write a title</ErrorMsg>
            ) : null}
            <TextInput
              id="standard-multiline-static"
              onChange={(e) => this.setState({ title: e.target.value })}
              required
            />
            <LabelText>{t("Post Form Categories")}</LabelText>
            {this.state.isError && !this.state.category ? (
              <ErrorMsg>ERROR: Please choose a category</ErrorMsg>
            ) : null}

            <SelectOption onChange={this.handleChange} required>
              <MenuItem value={"love"}>{t("Love")}</MenuItem>
              <MenuItem value={"work"}>{t("Work")}</MenuItem>
              <MenuItem value={"school"}>{t("School")}</MenuItem>
              <MenuItem value={"dating"}>{t("Dating")}</MenuItem>
              <MenuItem value={"finance"}>{t("Finance")}</MenuItem>
              <MenuItem value={"family"}>{t("Family")}</MenuItem>
            </SelectOption>
            <LabelText>{t("Post Form Description")}</LabelText>
            {this.state.isError && !this.state.description ? (
              <ErrorMsg>ERROR: Please share your secret</ErrorMsg>
            ) : null}

            <TextInput
              id="standard-multiline-static"
              multiline
              rows="4"
              onChange={(e) => this.setState({ description: e.target.value })}
              required
            />
            <LabelText>{t("Post Form anonymous")}</LabelText>
            <div>
              <Label>{t("Yes")}</Label>
              <Radio
                checked={this.state.checked === "a"}
                onChange={(e) => {
                  this.setState({ checked: "a" });
                }}
                value="a"
                color="default"
                name="radio-button-demo"
              />
              <Label>{t("No")}</Label>
              <Radio
                checked={this.state.checked === "b"}
                onChange={(e) => {
                  this.setState({ checked: "b" });
                }}
                value="b"
                color="default"
                name="radio-button-demo"
              />

              {this.state.checked === "b" ? (
                <TextInput
                  id="standard-multiline-static"
                  onChange={(e) => this.setState({ user: e.target.value })}
                  label="Enter username"
                />
              ) : (
                <TextField
                  id="standard-multiline-static"
                  onChange={(e) => this.setState({ user: e.target.value })}
                  disabled
                />
              )}
            </div>
            {this.state.isValid ? null : (
              <Captcha
                onChange={(e) => this.setState({ isValid: e })}
                placeholder="Enter captcha"
              />
            )}
            {this.state.isValid ? (
              <SubmitBtn onClick={this.submit}>{t("Submit")}</SubmitBtn>
            ) : null}
          </FormContainer>

          <Dialog open={this.state.isModal} onClose={this.state.isModal}>
            <DialogTitle id="alert-dialog-title">{"Sucess!"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {t("Post Dialog Success")}
                {this.state.category}
                <div>
                  <Link
                    to={
                      "/categories/" +
                      this.state.category +
                      "/" +
                      this.state.linkID
                    }
                  >
                    {t("Post View Dialog")}
                  </Link>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {/* Add link to post? */}
              <Button
                onClick={() => {
                  this.resetContent();
                  this.setState({ isModal: false });
                }}
                color="primary"
                autoFocus
              >
                {t("Done")}
              </Button>
            </DialogActions>
          </Dialog>
          {/* <SnackBars open="open" severity="ERROR:">
            Error
          </SnackBars> */}
        </MainContainer>
      </Wrapper>
    );
  }
}

export default withNamespaces()(CreatePost);

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: url(${createPostBg});
`;

const FormContainer = styled.form`
  background: white;
  display: flex;
  flex-direction: column;
  margin: 0 12%;
  border: 1px solid black;
  border-radius: 8px;
  padding: 2% 4%;
  width: 50vw;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 4% 0;
`;

const Label = styled.label`
  margin: 5% 0;
`;

const Title = styled.h2`
  text-align: center;
`;

const SubTitle = styled.h4`
  text-align: center;
`;

const LabelText = styled(Label)`
  font-size: 1.2em;
  font-weight: bold;
`;

const InfoContainer = styled.div`
  width: 50vw;
  height: 100%;
  margin: 2% 4%;
  background: white;
  border: 1px solid black;
  border-radius: 8px;
  color: black;
`;

const SubmitBtn = styled(Button)`
  .MuiButton-label {
    margin: 4%;
  }
`;

const TextInput = styled(TextField)`
  .MuiInput-underline:after {
    border-bottom: 2px solid black;
  }
`;

const SelectOption = styled(Select)`
  .MuiInput-underline&::after {
    border-bottom: 2px solid black;
  }
`;

const ErrorMsg = styled.span`
  color: red;
`;
