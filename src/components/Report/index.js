import React, {Component} from 'react'
import {connect} from 'react-redux'
import './style.css'
import VABReport from '../VABReport'

class Report extends Component{
  render(){
    const {
      date,
      formattedStartDate,
      formattedEndDate,
      colleague,
      customer,
      account,
      pricerate,
      billableHours,
      reportedVABDays,
      reportedSicknessDays,
      reportedVacationDays,
    } = this.props
    const total = pricerate * billableHours
    return(
      <div className="row">
        <div className="table-responsive col-md-10">
          <table className="table table-borderless">
            <tbody>
              <tr>
                <th colSpan="4">Kollega</th>
                <th colSpan="3">Period</th>
              </tr>
              <tr>
                <td colSpan="4">{colleague}</td>
                <td colSpan="3">{formattedStartDate} -> {formattedEndDate}</td>
              </tr>
              <tr>
                <th colSpan="2">Kund</th>
                <th colSpan="2">Konto</th>
                <th colSpan="1">Timmar</th>
                <th colSpan="1">Pris</th>
                <th colSpan="1">Summa</th>
              </tr>
              <tr>
                <td colSpan="2">{customer}</td>
                <td colSpan="2">{account}</td>
                <td colSpan="1">{billableHours}</td>
                <td colSpan="1">{pricerate}</td>
                <td colSpan="1">{total}</td>
              </tr>
              <VABReport values={reportedVABDays} year={date.getFullYear()} month={date.getMonth()}/>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default connect(state =>({
  date: state.calendar.date,
  formattedStartDate: state.calendar.formattedStartDate,
  formattedEndDate: state.calendar.formattedEndDate,
  billableHours: state.calendar.billableHours,
  reportedVABDays: state.calendar.reportedVABDays,
  reportedSicknessDays: state.calendar.reportedSicknessDays,
  reportedVacationDays: state.calendar.reportedVacationDays,
  colleague: state.info.colleague,
  customer: state.info.customer,
  account: state.info.account,
  pricerate: state.info.pricerate,
}), dispatch => ({
}))(Report)
