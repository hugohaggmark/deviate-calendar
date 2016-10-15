import React, { Component } from 'react';
import { connect } from 'react-redux';
import VABDay from '../VABDay'
import SickDay from '../SickDay'
import VacationDay from '../VacationDay'
import WeekendDay from '../WeekendDay'
import WorkDay from '../WorkDay'
import OtherMonthDay from '../OtherMonthDay'
import NextMonth from '../NextMonth'
import PreviousMonth from '../PreviousMonth'
import './style.css'

class Calendar extends Component{
  render(){
    const {date, weekdays, months, daysInMonth} = this.props
    const month = date.getMonth()
    const year = date.getFullYear()
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
          {daysInMonth.map(function(day, index){
            switch (day.type) {
              case 'weekend':
                return <WeekendDay value={day.payload} key={index} index={index}/>
              case 'vab':
                return <VABDay value={day.payload} key={index} index={index}/>
              case 'sickness':
                return <SickDay value={day.payload} key={index} index={index}/>
              case 'vacation':
                return <VacationDay value={day.payload} key={index} index={index}/>
              case 'workday':
                return <WorkDay value={day.payload} key={index} index={index}/>
              default:
                return <OtherMonthDay key={index} index={index}/>
            }
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
  daysInMonth: state.calendar.daysInMonth,
}), dispatch =>({

}))(Calendar)
