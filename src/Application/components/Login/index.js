import React, { Component } from "react";
import ReactRedirect from "react-redirect";
import settings from "../../../settings.json";

export default class Login extends Component {
  render() {
    console.log("Login page rendered");
    const authuri = settings.authUri;
    const scopes = settings.scopes;
    const redirect = window.location.origin + process.env.PUBLIC_URL + settings.redirectUri;
    const clientid = settings.clientId;
    const href = `${authuri}?scope=${scopes}&redirect_uri=${redirect}&response_type=token&client_id=${clientid}`;
    console.log("Login page rendered", href);
    return <ReactRedirect location={href}></ReactRedirect>;
  }
}
