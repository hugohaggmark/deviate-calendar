import React, {Component} from 'react'
// import Modal from '../Modal'
import Api from './api'

export default class Login extends Component {
  _onLoginClick = () => {
    Api.login();
  };
  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-xs-10 col-md-12">
            <input className="btn btn-danger" type="button" onClick={() => this._onLoginClick()} value="Sign in with Google"/>
          </div>
        </div>
      </div>
    )
  }
}
