import React, { Component } from 'react'
import { connect } from 'react-redux'
import WeekendDay from '../WeekendDay'
import ClickableDay from '../ClickableDay'
import SwipeableDay from '../SwipeableDay'
import OtherMonthDay from '../OtherMonthDay'
import NextMonth from '../NextMonth'
import PreviousMonth from '../PreviousMonth'
import DeviationDay from '../DeviationDay'
import './style.css'

class Calendar extends Component{
  render(){
    const {date, weekdays, months, daysInMonth} = this.props
    const month = date.getMonth()
    const year = date.getFullYear()
    return (
      <div>
        <div className="row">
          <ul className="months col-xs-12 col-sm-12">
            <PreviousMonth/>
            <li className="col-xs-8 col-sm-5 month">{months[month]} - {year}</li>
            <NextMonth/>
          </ul>
        </div>
        <div className="row">
          <ul className="weekdays col-xs-12 col-sm-12">
            {weekdays.map(function(weekday, index){
              return <li className="weekday col-sm-1 hidden-xs" key={index}>{weekday}</li>
            })}
          </ul>
        </div>
        <div className="row">
          <ul className="days visible-xs col-xs-12">
            {daysInMonth.map(function(day, index){
              switch (day.type) {
                case 'weekend':
                  return <WeekendDay value={day.date} key={index} index={index}/>
                case 'other-month-day':
                case 'other-month-weekend':
                  return <OtherMonthDay key={index} index={index} type={day.type} value={day.date}/>
                default:
                  return <SwipeableDay key={index} index={index} payload={{...day}}/>
              }
            })}
          </ul>
        </div>
        <div className="row">
          <ul className="days hidden-xs col-sm-12">
            {daysInMonth.map(function(day, index){
              switch (day.type) {
                case 'weekend':
                  return <WeekendDay value={day.date} key={index} index={index}/>
                case 'workday':
                  return <ClickableDay value={day.date} key={index} index={index}/>
                case 'other-month-day':
                case 'other-month-weekend':
                  return <OtherMonthDay key={index} index={index} type={day.type} value={day.date}/>
                default:
                  return <DeviationDay key={index} index={index} payload={{...day}}/>
              }
            })}
          </ul>
        </div>
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
