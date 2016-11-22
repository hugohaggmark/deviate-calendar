import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import './style.css'

class DeviationDay extends Component{
  render(){
    const {payload, index, clearDeviation} = this.props;
    const style = `col-sm-1 ${payload.type}`
    return (
      <li id={'day-' + index} className={style} onClick={() => clearDeviation(payload.date, payload.type)}>
        <span>{payload.label}</span>
      </li>
    )
  }
}

export default connect(state =>({
}), dispatch => ({
  clearDeviation: (date, type) => dispatch(actions.clearDeviation(date, type))
}))(DeviationDay)
