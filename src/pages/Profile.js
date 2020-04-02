import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { getProfileFetch } from "../actions/actions";
import styled from "styled-components";
class Profile extends PureComponent {
  state = {
    userInfo: [],
    displayName: ""
  };

  componentDidMount = () => {
    this.props.getProfileFetch();
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
        <h2>Welcome, {this.state.displayName}</h2>
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

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch())
});

// const mapStateToProps = state => {
//   console.log(state);
//   // return {
//   //    items: state.cart.items,
//   // };
// };

export default connect(null, mapDispatchToProps)(Profile);

const ImgContainer = styled.div`
  border: 1px solid black;
  text-align: center;
`;

const ProfileImg = styled.img`
  border: 1px solid black;
  border-radius: 10px;
`;

const Name = styled.div``;
