import React, {Component} from 'react'
import {connect} from 'react-redux'
import './style.css'

class SickDay extends Component{
  render(){
    const {value, index, clearSickness} = this.props;
    return (
      <li id={'day-' + index} className="col-sm-1 sick-day">
        <span onClick={() => clearSickness(value)}>Sjuk</span>
      </li>
    )
  }
}

export default connect(state =>({
}), dispatch => ({
  clearSickness: (date) => {dispatch({type:'REMOVE_SICKNESS', payload:{date: date}})
  },
}))(SickDay)
