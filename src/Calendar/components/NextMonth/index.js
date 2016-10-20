import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions'

class NextMonth extends Component{
  render(){
    const {date, addMonth} = this.props
    const month = date.getMonth()
    const year = date.getFullYear()
    const nextMonth = new Date(year, month + 1, 1)
    return(
      <li className="col-xs-2 col-sm-1 month" onClick={() => addMonth(nextMonth)}>&gt;</li>
    )
  }
}

export default connect( state => ({
  date: state.calendar.date
}), dispatch => ({
  addMonth: nextDate => dispatch(actions.loadDatesAction(nextDate))
}))(NextMonth)
