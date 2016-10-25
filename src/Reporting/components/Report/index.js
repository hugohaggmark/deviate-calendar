import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getformattedDate, getDatesInArrayForThisYearMonth} from '../../../dateHelper'
import './style.css'

class Report extends Component{
  sendMonthMail = (
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
    reportedVacationDays) => {
    const rows = []
    rows[0] = "<strong>Kollega</strong>&#09;&#09;<strong>Period</strong>"
    rows[rows.length] = `${colleague}&#09;${formattedStartDate} -> ${formattedEndDate}`
    rows[rows.length] = ""
    rows[rows.length] = "<strong>Kund</strong>&#09;&#09;<strong>Konto</strong>&#09;&#09;<strong>Timmar</strong>&#09;<strong>Pris</strong>&#09;<strong>Summa</strong>"
    rows[rows.length] = `${customer}&#09;&#09;${account}&#09;${billableHours}&#09;${pricerate}&#09;${billableHours * pricerate}`
    rows[rows.length] = ""
    const vabDatesThisMonth = getDatesInArrayForThisYearMonth(date.getFullYear(), date.getMonth(), reportedVABDays)
    const showVAB = vabDatesThisMonth.length > 0 ? true : false
    const sicknessDatesThisMonth = getDatesInArrayForThisYearMonth(date.getFullYear(), date.getMonth(), reportedSicknessDays)
    const showSickness = sicknessDatesThisMonth.length > 0 ? true : false
    const vacationDatesThisMonth = getDatesInArrayForThisYearMonth(date.getFullYear(), date.getMonth(), reportedVacationDays)
    const showVacation = vacationDatesThisMonth.length > 0 ? true : false
    if(showVAB){
      rows[rows.length] = `<strong>VAB - totalt ${vabDatesThisMonth.length} dag(ar)</strong>`
      vabDatesThisMonth.map((day, index) =>{
        rows[rows.length] = `${getformattedDate(day)}`
      })
      rows[rows.length] = ""
    }
    if(showSickness){
      rows[rows.length] = `<strong>Sjuk - totalt ${sicknessDatesThisMonth.length} dag(ar)</strong>`
      sicknessDatesThisMonth.map((day, index) =>{
        rows[rows.length] = `${getformattedDate(day)}`
      })
      rows[rows.length] = ""
    }
    if(showVacation){
      rows[rows.length] = `<strong>Semester - totalt ${vacationDatesThisMonth.length} dag(ar)</strong>`
      vacationDatesThisMonth.map((day, index) =>{
        rows[rows.length] = `${getformattedDate(day)}`
      })
      rows[rows.length] = ""
    }
    let html = ""
    for (var i = 0; i < rows.length; i++) {
      html += encodeURIComponent(rows[i] + "<br/>")
    }

    html += "<br/>"
    window.location = "mailto:?subject=Tidrapport&body=" + html
  }
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
    const vabDatesThisMonth = getDatesInArrayForThisYearMonth(date.getFullYear(), date.getMonth(), reportedVABDays)
    const showVAB = vabDatesThisMonth.length > 0 ? true : false
    const sicknessDatesThisMonth = getDatesInArrayForThisYearMonth(date.getFullYear(), date.getMonth(), reportedSicknessDays)
    const showSickness = sicknessDatesThisMonth.length > 0 ? true : false
    const vacationDatesThisMonth = getDatesInArrayForThisYearMonth(date.getFullYear(), date.getMonth(), reportedVacationDays)
    const showVacation = vacationDatesThisMonth.length > 0 ? true : false
    return(
      <div>
        <div className="row">
          <div className="col-md-10">
            <a href="#" className="btn btn-primary" onClick={() => this.sendMonthMail(date,
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
            )}>Send month report...</a>
          </div>
        </div>
        <div className="row">
          <div id="report" className="table-responsive col-md-10">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <th colSpan="2">Kollega</th>
                  <th colSpan="2">Period</th>
                </tr>
                <tr>
                  <td colSpan="2">{colleague}</td>
                  <td colSpan="2">{formattedStartDate} -> {formattedEndDate}</td>
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
                { showVAB &&
                  <tr>
                    <th>VAB - totalt {vabDatesThisMonth.length} dag(ar)</th>
                  </tr>
                }
                { showVAB &&
                  vabDatesThisMonth.map(function(day, index) {
                    return <tr key={index}><td>{getformattedDate(day)}</td></tr>
                  })
                }
                { showSickness &&
                  <tr>
                    <th>Sjuk - totalt {sicknessDatesThisMonth.length} dag(ar)</th>
                  </tr>
                }
                { showSickness &&
                  sicknessDatesThisMonth.map(function(day, index) {
                    return <tr key={index}><td>{getformattedDate(day)}</td></tr>
                  })
                }
                { showVacation &&
                  <tr>
                    <th>Semester - totalt {vacationDatesThisMonth.length} dag(ar)</th>
                  </tr>
                }
                { showVacation &&
                  vacationDatesThisMonth.map(function(day, index) {
                    return <tr key={index}><td>{getformattedDate(day)}</td></tr>
                  })
                }
              </tbody>
            </table>
          </div>
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
