import React, {Component} from 'react'
import {connect} from 'react-redux'
import './style.css'
import * as actions from '../../actions'

class ClickableDay extends Component{
  pad = (n) => {
    return (n < 10) ? ("0" + n) : n;
  }
  render(){
    const {value,
      index,
      reportVAB,
      reportSickness,
      reportVacation,
      reportAptitudDay,
    } = this.props;
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
            <li><a href="#" onClick={() => reportAptitudDay(value)}>Aptitud</a></li>
          </ul>
        </div>
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
}))(ClickableDay)
