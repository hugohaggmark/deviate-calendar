import React, {Component} from 'react'
import {connect} from 'react-redux'

class Info extends Component{
  render(){
    const {colleague,
      customer,
      account,
      pricerate,
      workHours,
      colleagueChanged,
      customerChanged,
      accountChanged,
      pricerateChanged,
      workHoursChanged,
    } = this.props
    return(
      <div className="row">
        <div className="form-group col-sm-4">
          <label htmlFor="colleague">Kollega</label>
          <input type="text" defaultValue={colleague} id="colleague" className="form-control" onChange={colleagueChanged}/>
          <label htmlFor="customer">Kund</label>
          <input type="text" defaultValue={customer} id="customer" className="form-control" onChange={customerChanged}/>
        </div>
        <div className="form-group col-sm-4">
          <label htmlFor="account">Konto</label>
          <input type="text" defaultValue={account} id="account" className="form-control" onChange={accountChanged}/>
          <label htmlFor="pricerate">Pris</label>
          <input type="text" defaultValue={pricerate} id="pricerate" className="form-control" onChange={pricerateChanged}/>
        </div>
        <div className="form-group col-sm-1" style={{clear:"left"}}>
          <label htmlFor="workHours">Arbetstid</label>
          <input type="text" defaultValue={workHours} id="workHours" className="form-control" onChange={workHoursChanged}/>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  colleague: state.info.colleague,
  customer: state.info.customer,
  account: state.info.account,
  pricerate: state.info.pricerate,
  workHours: state.info.workHours,
}), dispatch => ({
  colleagueChanged: event => dispatch({type:'COLLEAGUE_CHANGED', payload: {colleague:event.target.value} }),
  customerChanged: event => dispatch({type:'CUSTOMER_CHANGED', payload: {customer:event.target.value} }),
  accountChanged: event => dispatch({type:'ACCOUNT_CHANGED', payload: {account:event.target.value} }),
  pricerateChanged: event => dispatch({type:'PRICERATE_CHANGED', payload: {pricerate:parseInt(event.target.value)}}),
  workHoursChanged: event => dispatch({type:'WORKHOURS_CHANGED', payload: {workHours:parseInt(event.target.value)}}),
}))(Info)
