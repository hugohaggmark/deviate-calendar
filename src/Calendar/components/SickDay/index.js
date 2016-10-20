import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import './style.css'

class SickDay extends Component{
  render(){
    const {value, index, clearSickness} = this.props;
    return (
      <li id={'day-' + index} className="col-sm-1 sick-day">
        <span onClick={() => clearSickness(value)}>Sjuk</span>
      </li>
    )
  }
}

export default connect(state =>({
}), dispatch => ({
  clearSickness: date => dispatch(actions.clearSicknessAction(date))
}))(SickDay)
