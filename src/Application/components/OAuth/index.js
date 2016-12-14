import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions'

class OAuth extends Component {
  render() {
    const {authenticate} = this.props
    authenticate(this.props.location.hash)
    return(
      <div className="container">

      </div>
    )
  }
}

export default connect(state => ({

}), dispatch => ({
  authenticate: payload => dispatch(actions.authenticatedAction(payload))
}))(OAuth)
