import React, {Component} from 'react'
import {connect} from 'react-redux'
import ReactSwipe from 'react-swipe';
import './style.css'
import * as actions from '../../actions'

class SwipeableDay extends Component{
  pad = (n) => {
    return (n < 10) ? ("0" + n) : n;
  }
  reportDeviation = (index, config) => {
    switch (index) {
      case 1:
        config.clearSickness(config.value)
        config.reportVAB(config.value)
      break;
      case 2:
        config.clearVAB(config.value)
        config.clearVacation(config.value)
        config.reportSickness(config.value)
      break;
      case 3:
        config.clearSickness(config.value)
        config.clearAptitudDay(config.value)
        config.reportVacation(config.value)
      break;
      case 4:
        config.clearVacation(config.value)
        config.reportAptitudDay(config.value)
      break;
      default:
        config.clearVAB(config.value)
        config.clearAptitudDay(config.value)
    }
  }
  getClassName = index => {
    switch (index) {
      case 1:
        return "col-sm-1 vab-day"
      case 2:
        return "col-sm-1 sick-day"
      case 3:
        return "col-sm-1 vacay-day"
      case 4:
        return "col-sm-1 aptitud-day"
      default:
        return "col-sm-1 work-day"
    }
  }
  render(){
    const {value,
      reportVAB,
      reportSickness,
      reportVacation,
      reportAptitudDay,
      clearVAB,
      clearSickness,
      clearVacation,
      clearAptitudDay,
      swipeStartIndex} = this.props;
    const startSlide = parseInt(swipeStartIndex, 10)
    const config = {
      value: value,
      reportVAB: reportVAB,
      reportSickness: reportSickness,
      reportVacation: reportVacation,
      reportAptitudDay: reportAptitudDay,
      clearVAB: clearVAB,
      clearSickness: clearSickness,
      clearVacation: clearVacation,
      clearAptitudDay: clearAptitudDay,
    }
    return (
      <li className={this.getClassName(startSlide)}>
        <ReactSwipe className="carousel" swipeOptions={
          {
            continuous: true,
            startSlide: startSlide,
            disableScroll: true,
            stopPropagation: true,
            callback: (index, elem) => this.reportDeviation(index, config)
          }} key={startSlide}>
          <div><span>{this.pad(value.getDate())}</span></div>
          <div><span>VAB</span></div>
          <div><span>Sjuk</span></div>
          <div><span>Semester</span></div>
          <div><span>.</span></div>
        </ReactSwipe>
      </li>
    )
  }
}

export default connect(state =>({
}), dispatch => ({
  reportVAB: date => dispatch(actions.reportVABAction(date)),
  reportSickness: date => dispatch(actions.reportSicknessAction(date)),
  reportVacation: date => dispatch(actions.reportVacationAction(date)),
  reportAptitudDay: date => dispatch(actions.reportAptitudDayAction(date)),
  clearVAB: date => dispatch(actions.clearVABAction(date)),
  clearSickness: date => dispatch(actions.clearSicknessAction(date)),
  clearVacation: date => dispatch(actions.clearVacationAction(date)),
  clearAptitudDay: date => dispatch(actions.clearAptitudDayAction(date)),
}))(SwipeableDay)
