import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { getProfileFetch } from "../actions/actions";
import styled from "styled-components";
class Profile extends PureComponent {
  state = {
    userInfo: {},
    displayName: "",
  };

  componentDidMount = () => {
    //set userdetails
    this.setState({ userInfo: this.props.userDetails });
    // this.props.getProfileFetch();
    // let getProps = this.props.location.state.detail._doc;
    // this.setState({
    //   userInfo: getProps._doc,
    //   displayName: getProps.displayName
    // }
    // );
    // console.log(this.state.userInfo);
    // console.log(getProps);
  };

  render() {
    return (
      <div>
        <h2>Welcome, {this.state.userInfo.displayName}</h2>
        <p> {this.state.userInfo.email}</p>
        <ImgContainer>
          <ProfileImg alt="profile" />
          <Name>John</Name>
        </ImgContainer>
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => console.log(dispatch);
// {
//userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
// }

// mapStateToProps: this is used to retrieve the store state
// const mapStateToProps = (state) => ({
//   ...state,
// });

// const mapDispatchToProps = (dispatch) => ({
//   getProfileFetch: () => dispatch(getProfileFetch()),
// });

const mapStateToProps = (state) => {
  console.log(state.currentUser._doc);
  return {
    userDetails: state.currentUser._doc,
  };
};

export default connect(mapStateToProps, {})(Profile);

const ImgContainer = styled.div`
  border: 1px solid black;
  text-align: center;
`;

const ProfileImg = styled.img`
  border: 1px solid black;
  border-radius: 10px;
`;

const Name = styled.div``;
