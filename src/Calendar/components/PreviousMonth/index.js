import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions'

class PreviousMonth extends Component{
  render(){
    const {date, subMonth} = this.props
    const month = date.getMonth()
    const year = date.getFullYear()
    const previousMonth = new Date(year, month - 1, 1)
    return(
      <li className="col-xs-2 col-sm-1 month" onClick={() => subMonth(previousMonth)}>&lt;</li>
    )
  }
}

export default connect( state => ({
  date: state.calendar.date
}), dispatch => ({
  subMonth: previousDate => dispatch(actions.loadDatesAction(previousDate))
}))(PreviousMonth)
