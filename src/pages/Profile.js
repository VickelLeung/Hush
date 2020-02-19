import React, { PureComponent } from "react";

class Profile extends PureComponent {
  state = {
    userInfo: [],
    displayName: ""
  };

  componentDidMount = () => {
    let getProps = this.props.location.state.detail._doc;
    this.setState({
      userInfo: getProps._doc,
      displayName: getProps.displayName
    });
    // console.log(this.state.userInfo);

    console.log(getProps);
  };

  render() {
    return (
      <div>
        <h2>Welcome, {this.state.displayName}</h2>
      </div>
    );
  }
}

export { Profile };
