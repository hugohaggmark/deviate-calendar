import React, {Component} from 'react'
import {connect} from 'react-redux'
import './style.css'

class VacationDay extends Component{
  render(){
    const {value, index, clearVacation} = this.props;
    return (
      <li id={'day-' + index} className="col-sm-1 vacay-day">
        <span onClick={() => clearVacation(value)}>Semester</span>
      </li>
    )
  }
}

export default connect(state =>({
}), dispatch => ({
  clearVacation: (date) => {dispatch({type:'REMOVE_VACATION', payload:{date: date}})
  },
}))(VacationDay)
