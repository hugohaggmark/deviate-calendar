import React, { Component } from 'react';
import { connect } from 'react-redux';
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
      <div className="row">
        <ul className="months col-md-12">
          <PreviousMonth/>
          <li className="col-xs-8 col-sm-5 month">{months[month]} - {year}</li>
          <NextMonth/>
        </ul>
        <ul className="weekdays col-md-12">
          {weekdays.map(function(weekday, index){
            return <li className="weekday col-sm-1 hidden-xs" key={index}>{weekday}</li>
          })}
        </ul>
        <ul className="days visible-xs col-md-12">
          {daysInMonth.map(function(day, index){
            switch (day.type) {
              case 'weekend':
                return <WeekendDay value={day.date} key={index} index={index}/>
              case 'vab':
                return <SwipeableDay value={day.date} key={index} swipeStartIndex="1"/>
              case 'sickness':
                return <SwipeableDay value={day.date} key={index} swipeStartIndex="2"/>
              case 'vacation':
                return <SwipeableDay value={day.date} key={index} swipeStartIndex="3"/>
              case 'aptitud':
                return <SwipeableDay value={day.date} key={index} swipeStartIndex="4"/>
              case 'workday':
                return <SwipeableDay value={day.date} key={index} swipeStartIndex="0"/>
              default:
                return <OtherMonthDay key={index} index={index} type={day.type} value={day.date}/>
            }
          })}
        </ul>
        <ul className="days hidden-xs col-md-12">
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
