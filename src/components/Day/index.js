import React, {Component} from 'react'
import {connect} from 'react-redux'
import './style.css'

class Day extends Component{
  pad = (n) => {
    return (n < 10) ? ("0" + n) : n;
  }
  render(){
    const {year, month, dayNumber, index, reportVAB, reportSickness, reportVacation} = this.props;
    const dayType = dayNumber === '-' ? "col-sm-1 other-month-day" : "col-sm-1 normal-day"
    return (
      <div className="dropdown">
        <li id={'day-' + index} className={dayType} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.pad(dayNumber)}</li>
        <ul className="dropdown-menu" id={'dropdown-menu-' + index } aria-labelledby={'day-' + index}>
          <li><a href="#" onClick={() => reportVAB(new Date(year, month, dayNumber))}>VAB</a></li>
          <li><a href="#" onClick={() => reportSickness(new Date(year, month, dayNumber))}>Sjuk</a></li>
          <li><a href="#" onClick={() => reportVacation(new Date(year, month, dayNumber))}>Semester</a></li>
        </ul>
      </div>
    )
  }
}

export default connect(state =>({
}), dispatch => ({
  reportVAB: (date) => {
    dispatch({type:'REPORT_VAB', payload:{date: date}})
  },
  reportSickness: (date) => {
    dispatch({type:'REPORT_SICKNESS', payload:{date: date}})
  },
  reportVacation: (date) => {
    dispatch({type:'REPORT_VACATION', payload:{date: date}})
  },
}))(Day)
