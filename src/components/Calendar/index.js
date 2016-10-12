import React, { Component } from 'react';
import { connect } from 'react-redux';
import Day from '../Day'
import NextMonth from '../NextMonth'
import PreviousMonth from '../PreviousMonth'
import './style.css'

class Calendar extends Component{
  getDaysInMonthArray = (date,numberOfDaysInMonth) => {
    const month = date.getMonth()
    const year = date.getFullYear()
    const firstDayInMonth = new Date(year, month, 1).getDay() - 1
    const lastDayInMonth = new Date(year, month, numberOfDaysInMonth).getDay() - 1
    const daysInMonthArray = []
    for (var j = 0; j < firstDayInMonth; j++) {
      daysInMonthArray.push('-')
    }
    for (var i = 0; i < numberOfDaysInMonth; i++) {
      daysInMonthArray.push(i + 1)
    }
    for (var k = lastDayInMonth; k < 6; k++) {
      daysInMonthArray.push('-')
    }
    return daysInMonthArray
  }
  render(){
    const {date,weekdays,months,numberOfDaysInMonth} = this.props
    const month = date.getMonth()
    const year = date.getFullYear()
    const daysInMonthArray = this.getDaysInMonthArray(date,numberOfDaysInMonth)
    return (
      <div className="row">
        <ul className="months col-md-12">
          <PreviousMonth/>
          <li className="col-sm-5 month">{months[month]} - {year}</li>
          <NextMonth/>
        </ul>
        <ul className="weekdays col-md-12">
          {weekdays.map(function(weekday, index){
            return <li className="weekday col-sm-1 hidden-xs" key={index}>{weekday}</li>
          })}
        </ul>
        <ul className="days col-md-12">
          {daysInMonthArray.map(function(day, index){
            return <Day dayNumber={day} key={index}/>
          })}
        </ul>
      </div>
    )
  }
}

export default connect(state => ({
  date: state.calendar.date,
  weekdays: state.calendar.weekdays,
  months: state.calendar.months,
  numberOfDaysInMonth: state.calendar.numberOfDaysInMonth,
}), dispatch =>({

}))(Calendar)
