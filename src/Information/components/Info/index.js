import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions'

class Info extends Component{
  componentDidMount() {
    document.getElementById("info").scrollIntoView()
  }
  render(){
    const {colleague,
      customer,
      account,
      pricerate,
      workHours,
      email,
      colleagueChanged,
      customerChanged,
      accountChanged,
      pricerateChanged,
      workHoursChanged,
      emailChanged,
    } = this.props
    return(
      <div id="info" className="col-xs-12 box">
        <div className="form-group col-xs-12 col-sm-12 col-md-6">
          <label htmlFor="colleague">Kollega</label>
          <input type="text" defaultValue={colleague} id="colleague" className="form-control" onChange={colleagueChanged}/>
          <label htmlFor="customer">Kund</label>
          <input type="text" defaultValue={customer} id="customer" className="form-control" onChange={customerChanged}/>
          <label htmlFor="workHours">Arbetstid</label>
          <input type="text" defaultValue={workHours} id="workHours" className="form-control" onChange={workHoursChanged}/>
        </div>
        <div className="form-group col-xs-12 col-sm-12 col-md-6">
          <label htmlFor="account">Konto</label>
          <input type="text" defaultValue={account} id="account" className="form-control" onChange={accountChanged}/>
          <label htmlFor="pricerate">Pris</label>
          <input type="text" defaultValue={pricerate} id="pricerate" className="form-control" onChange={pricerateChanged}/>
          <label htmlFor="email">E-postadress att skicka tidrapport till</label>
          <input type="text" defaultValue={email} id="email" className="form-control" onChange={emailChanged}/>
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
  email: state.info.email
}), dispatch => ({
  colleagueChanged: event => dispatch(actions.colleagueChangedAction(event.target.value)),
  customerChanged: event => dispatch(actions.customerChangedAction(event.target.value)),
  accountChanged: event => dispatch(actions.accountChangedAction(event.target.value)),
  pricerateChanged: event => dispatch(actions.pricerateChangedAction(parseInt(event.target.value, 10))),
  workHoursChanged: event => dispatch(actions.workHoursChangedAction(parseInt(event.target.value, 10))),
  emailChanged: event => dispatch(actions.emailChangedAction(event.target.value)),
}))(Info)
