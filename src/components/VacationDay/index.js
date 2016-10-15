import React, {Component} from 'react'
import {connect} from 'react-redux'
import './style.css'

class VacationDay extends Component{
  render(){
    const {value, index, clearVacation} = this.props;
    return (
      <li id={'day-' + index} className="col-sm-1 vacay-day">
        <div className="col-sm-12">
          <span className="label label-success">Ledig  <span onClick={() => clearVacation(value)} className="glyphicon glyphicon-remove" aria-hidden="true"></span></span>
        </div>
      </li>
    )
  }
}

export default connect(state =>({
}), dispatch => ({
  clearVacation: (date) => {dispatch({type:'REMOVE_VACATION', payload:{date: date}})
  },
}))(VacationDay)
