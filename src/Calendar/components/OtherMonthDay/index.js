import React, {Component} from 'react'
import './style.css'

export default class OtherMonthDay extends Component{
  pad = (n) => {
    return (n < 10) ? ("0" + n) : n
  }
  render(){
    const {index, value, type} = this.props
    const style = `col-sm-1 ${type}`
    const date = value === '-' ? new Date() : value
    return (
        <li id={'day-' + index} className={style}>
          <span className="text-muted">
            {this.pad(date.getDate())}
          </span>
        </li>
    )
  }
}
