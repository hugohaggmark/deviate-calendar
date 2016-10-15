import React, {Component} from 'react'
import {connect} from 'react-redux'
import './style.css'

class SickDay extends Component{
  render(){
    const {value, index, clearSickness} = this.props;
    return (
      <li id={'day-' + index} className="col-sm-1 sick-day">
        <div className="col-sm-12">
          <span className="label label-info">Sjuk  <span onClick={() => clearSickness(value)} className="glyphicon glyphicon-remove" aria-hidden="true"></span></span>
        </div>
      </li>
    )
  }
}

export default connect(state =>({
}), dispatch => ({
  clearSickness: (date) => {dispatch({type:'REMOVE_SICKNESS', payload:{date: date}})
  },
}))(SickDay)
