import React, {Component} from 'react'
import {connect} from 'react-redux'
import ReactSwipe from 'react-swipe';
import './style.css'
import * as actions from '../../actions'

class SwipeableDay extends Component{
  pad = (n) => {
    return (n < 10) ? ("0" + n) : n;
  }
  updateDeviation = (index, payload, deviations, reportDeviation, clearDeviation) => {
    console.log('payload in update', payload);
    for (var i = 0; i < deviations.length; i++) {
      if(index === i + 1) {
        reportDeviation(payload.date, deviations[i].type)
      } else {
        clearDeviation(payload.date, deviations[i].type)
      }
    }
  }
  getDeviation = (payload, deviations) => {
    if(!deviations) {
      return null
    }

    let found = deviations.filter(deviation => deviation.type === payload.type)

    return found ? found[0] : null
  }
  getClassName = (deviation) => {
    if(!deviation) {
      return 'col-sm-1 work-day'
    }

    return `col-sm-1 ${deviation.type}`
  }
  getStartSlide = (payload, deviations) => {
    if(!deviations){
      return 0
    }

    for (let i = 0; i < deviations.length; i++) {
      if(deviations[i].type === payload.type){
        return i + 1
      }
    }

    return 0
  }
  render(){
    const { payload,
      reportDeviation,
      clearDeviation,
      deviations,
    } = this.props;
    const startSlide = this.getStartSlide(payload, deviations)
    const deviation = this.getDeviation(payload, deviations)
    return (
      <li className={this.getClassName(deviation)}>
        <ReactSwipe className="carousel" swipeOptions={
          {
            continuous: true,
            startSlide: startSlide,
            disableScroll: true,
            stopPropagation: true,
            callback: (index, elem) => this.updateDeviation(index, payload, deviations, reportDeviation, clearDeviation)
          }} key={'startslide-' + startSlide + '-' + payload.date}>
          <div><span>{this.pad(payload.date.getDate())}</span></div>
          { deviations && deviations.map((deviation, index) => {
            return <div key={index}><span>{deviation.label}</span></div>
          })
          }
        </ReactSwipe>
      </li>
    )
  }
}

export default connect(state =>({
  deviations: state.calendar.deviations
}), dispatch => ({
  reportDeviation: (date, type) => dispatch(actions.reportDeviation(date, type)),
  clearDeviation: (date, type) => dispatch(actions.clearDeviation(date, type)),
}))(SwipeableDay)
