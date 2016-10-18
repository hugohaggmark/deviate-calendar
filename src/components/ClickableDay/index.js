import React, {Component} from 'react'
import {connect} from 'react-redux'
import './style.css'

class ClickableDay extends Component{
  pad = (n) => {
    return (n < 10) ? ("0" + n) : n;
  }
  render(){
    const {value, index, reportVAB, reportSickness, reportVacation} = this.props;
    return (
      <li className="col-sm-1 work-day">
        <div className="dropdown col-sm-12">
          <span id={'day-' + index} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            {this.pad(value.getDate())}
          </span>
          <ul className="dropdown-menu" id={'dropdown-menu-' + index } aria-labelledby={'day-' + index}>
            <li className="dropdown-header">Avvikelser</li>
            <li><a href="#" onClick={() => reportVAB(value)}>VAB</a></li>
            <li><a href="#" onClick={() => reportSickness(value)}>Sjuk</a></li>
            <li><a href="#" onClick={() => reportVacation(value)}>Semester</a></li>
            {/* <li role="separator" className="divider"></li>
              <li className="dropdown-header">Timmar +/-</li>
              <li><a href="#" onClick={() => reportOverTime(value)}>+1</a></li>
            <li><a href="#" onClick={() => reportShortTime(value)}>-1</a></li> */}
          </ul>
        </div>
      </li>
    )
  }
}

export default connect(state =>({
}), dispatch => ({
  reportVAB: (date) => {
    dispatch({type:'REPORT_VAB', payload:{date: date}})
  },
  reportSickness: (date) => {
    dispatch({type:'REPORT_SICKNESS', payload:{date: date}})
  },
  reportVacation: (date) => {
    dispatch({type:'REPORT_VACATION', payload:{date: date}})
  },
  reportOverTime: (date) => {
    dispatch({type:'REPORT_OVERTIME', payload:{date: date}})
  },
  reportShortTime: (date) => {
    dispatch({type:'REPORT_SHORTTIME', payload:{date: date}})
  },
}))(ClickableDay)
