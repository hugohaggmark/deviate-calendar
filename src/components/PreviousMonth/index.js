import React, {Component} from 'react'
import {connect} from 'react-redux'

class PreviousMonth extends Component{
  render(){
    const {date, addMonth} = this.props
    const month = date.getMonth()
    const year = date.getFullYear()
    const previousMonth = new Date(year, month - 1, 1)
    return(
      <li className="col-sm-1 month" onClick={() => addMonth(previousMonth)}>&lt;</li>
    )
  }
}

export default connect( state => ({
  date: state.calendar.date
}), dispatch => ({ addMonth: (previousDate) => dispatch({type:'INIT_DATES', payload: { date: previousDate }})

}))(PreviousMonth)
