import React, {Component} from 'react'
import {connect} from 'react-redux'
import ReactSwipe from 'react-swipe';
import './style.css'

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
        config.reportVacation(config.value)
      break;
      default:
        config.clearVAB(config.value)
        config.clearVacation(config.value)
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
      default:
        return "col-sm-1 work-day"
    }
  }
  render(){
    const {value,
      index,
      reportVAB,
      reportSickness,
      reportVacation,
      clearVAB,
      clearSickness,
      clearVacation,
      swipeStartIndex} = this.props;
    const startSlide = parseInt(swipeStartIndex, 10)
    const config = {
      value: value,
      reportVAB: reportVAB,
      reportSickness: reportSickness,
      reportVacation: reportVacation,
      clearVAB: clearVAB,
      clearSickness: clearSickness,
      clearVacation: clearVacation,
    }
    return (
      <li className={this.getClassName(startSlide)} key={index}>
        <ReactSwipe className="carousel" swipeOptions={
          {
            continuous: true,
            startSlide: startSlide,
            disableScroll: true,
            stopPropagation: true,
            callback: (index, elem) => this.reportDeviation(index, config)
          }}>
          <div><span>{this.pad(value.getDate())}</span></div>
          <div><span>VAB</span></div>
          <div><span>Sjuk</span></div>
          <div><span>Semester</span></div>
        </ReactSwipe>
      </li>
    )
  }
}

export default connect(state =>({
}), dispatch => ({
  reportVAB: (date) => {
    dispatch({type:'REPORT_VAB', payload:{date: date}})
  },
  clearVAB: (date) => {
    dispatch({type:'REMOVE_VAB', payload:{date: date}})
  },
  reportSickness: (date) => {
    dispatch({type:'REPORT_SICKNESS', payload:{date: date}})
  },
  clearSickness: (date) => {
    dispatch({type:'REMOVE_SICKNESS', payload:{date: date}})
  },
  reportVacation: (date) => {
    dispatch({type:'REPORT_VACATION', payload:{date: date}})
  },
  clearVacation: (date) => {
    dispatch({type:'REMOVE_VACATION', payload:{date: date}})
  },
  reportOverTime: (date) => {
    dispatch({type:'REPORT_OVERTIME', payload:{date: date}})
  },
  reportShortTime: (date) => {
    dispatch({type:'REPORT_SHORTTIME', payload:{date: date}})
  },
}))(SwipeableDay)
