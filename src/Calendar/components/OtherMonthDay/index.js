import React, {Component} from 'react'
import './style.css'

export default class OtherMonthDay extends Component{
  render(){
    const {index} = this.props;
    return (
        <li id={'day-' + index} className="col-sm-1 other-month-day">-</li>
    )
  }
}
