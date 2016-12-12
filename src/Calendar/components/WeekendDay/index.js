import React, {Component} from 'react'
import './style.css'

export default class WeekendDay extends Component{
  pad = (n) => {
    return (n < 10) ? ("0" + n) : n;
  }
  render(){
    const {value, index} = this.props;
    return (
      <li id={'day-' + index} className="col-sm-1 weekend-day">
        <span className="text-muted">
          {this.pad(value.getDate())}
        </span>
      </li>
    )
  }
}
