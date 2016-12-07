import React, {Component} from 'react'
import {connect} from 'react-redux'

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
  authenticate: payload => dispatch({type:'Authenticated', payload: payload})
}))(OAuth)
