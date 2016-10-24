import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import './style.css'

class AptitudDay extends Component{
  render(){
    const {value, index, clearAptitudDay} = this.props;
    return (
      <li id={'day-' + index} className="col-sm-1 aptitud-day">
        <span onClick={() => clearAptitudDay(value)}>.</span>
      </li>
    )
  }
}

export default connect(state =>({
}), dispatch => ({
  clearAptitudDay: date => dispatch(actions.clearAptitudDayAction(date))
}))(AptitudDay)
