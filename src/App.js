import React, { Component } from 'react';
import { Calendar } from './Calendar'
import { Info } from './Information'
import { Report } from './Reporting'
import {Base64} from 'js-base64'
import mimemessage from 'mimemessage'
import './App.css'

export default class App extends Component {
  sendMessage = () => {
    const msg = mimemessage.factory({
      to:"hugo.haggmark@gmail.com",
      subject:"Today is rainy",
      contentType: 'multipart/mixed',
      body: ["Sample body text"]
    });

    var base64EncodedEmail = Base64.encodeURI(msg.toString());
    /*eslint-disable no-undef*/
    console.log(base64EncodedEmail);
    // gapi.client.load('gmail', 'v1', () => {
    //   console.log('loaded')
    //   var request = gapi.client.gmail.users.messages.send({
    //     'userId': 'me',
    //     'resource': {
    //       'raw': base64EncodedEmail
    //     }
    //   });
    //   /*eslint-enable*/
    //   request.execute((response) => {
    //     console.log(response);
    //   });
    // })
  }
  render() {
    return (
      <div className="container">
        <Info/>
        <Calendar />
        <input type="button" className="btn btn-primary" value="Send mail..." onClick={() => this.sendMessage()}/>
        <Report />
      </div>
    )
  }
}
