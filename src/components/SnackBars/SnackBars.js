import React, { Component } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

class SnackBars extends Component {
  state = { open: this.props.open };

  // componentDidMount = () => {
  //   console.log("com: " + this.props.open);
  //   this.setState({ open: this.props.open });
  //   console.log("com: " + this.state.open);
  // };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    console.log("close");
    this.setState({ open: false });
    console.log("stae; " + this.state.open);
  };
  render() {
    return (
      <Snackbar
        open={this.state.open}
        autoHideDuration={3000}
        onClose={this.handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <MuiAlert
          onClose={this.handleClose}
          severity={this.props.severity}
          elevation={6}
          variant="filled"
        >
          {this.props.children}
        </MuiAlert>
      </Snackbar>
    );
  }
}

export { SnackBars };
