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
      reportDeviation,
      deviations,
    } = this.props;
    return (
      <li className="col-sm-1 work-day">
        <div className="dropdown col-sm-12">
          <div id={'day-' + index} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            {this.pad(value.getDate())}
          </div>
          <ul className="dropdown-menu" id={'dropdown-menu-' + index } aria-labelledby={'day-' + index}>
            <li className="dropdown-header">Avvikelser</li>
            {deviations &&
              deviations.map(function(deviation, index){
                return <li key={index}><a href="#" onClick={() => reportDeviation(value, deviation.type)}>{deviation.label}</a></li>
              })}
          </ul>
        </div>
      </li>
    )
  }
}

export default connect(state =>({
  deviations: state.calendar.deviations
}), dispatch => ({
  reportDeviation: (date, type) => dispatch(actions.reportDeviation(date, type))
}))(ClickableDay)
