import React, {Component} from 'react'
import './style.css'

export default class Day extends Component{
  pad = (n) => {
    return (n < 10) ? ("0" + n) : n;
  }
  render(){
    const { dayNumber } = this.props;
    const dayType = dayNumber === '-' ? "col-sm-1 other-month-day" : "col-sm-1 normal-day"
    return (
      <li className={dayType}>{this.pad(dayNumber)}</li>
    )
  }
}
