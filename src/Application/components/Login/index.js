import React, {Component} from 'react'
import settings from '../../../settings.json'

export default class Login extends Component {
  render() {
    const authuri = settings.authUri
    const scopes = settings.scopes
    const redirect = window.location.origin + settings.redirectUri
    const clientid = settings.clientId
    const href = `${authuri}?scope=${scopes}&redirect_uri=${redirect}&response_type=token&client_id=${clientid}`
    return(
      <div className="container">
        <div className="row">
          <div className="col-xs-10 col-md-12">
            <a href={href} className="btn btn-danger">
              Sign in with Google
            </a>
          </div>
        </div>
      </div>
    )
  }
}
