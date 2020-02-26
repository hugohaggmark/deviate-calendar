import React, { Component } from "react";
import { connect } from "react-redux";

class OAuth extends Component {
  render() {
    console.log("OAuth page rendered");
    const { authenticate } = this.props;
    authenticate(this.props.location.hash);
    console.log("OAuth page rendered", this.props.location.hash);
    return <div className="container"></div>;
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    authenticate: payload => dispatch({ type: "Authenticated", payload: payload })
  })
)(OAuth);
