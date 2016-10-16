import React, {Component} from 'react'
import {connect} from 'react-redux'
import './style.css'

class VABDay extends Component{
  render(){
    const {value, index, clearVAB} = this.props;
    return (
      <li id={'day-' + index} className="col-sm-1 vab-day">
        <span onClick={() => clearVAB(value)}>VAB</span>
      </li>
    )
  }
}

export default connect(state =>({
}), dispatch => ({
  clearVAB: (date) => {dispatch({type:'REMOVE_VAB', payload:{date: date}})
  },
}))(VABDay)
