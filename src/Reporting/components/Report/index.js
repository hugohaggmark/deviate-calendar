import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getformattedDate, getDatesInArrayForThisYearMonth} from '../../../dateHelper'
import {gmail} from '../../../Application'
import './style.css'

class Report extends Component {
  componentDidMount() {
    document.getElementById("report").scrollIntoView()
  }
  createHtmlReport = (calendar, info, showInReportDeviations) => {
    const year = calendar.date.getFullYear()
    const month = calendar.date.getMonth()
    const startTableRow = "<tr>"
    const endTableRow = "</tr>"
    const startTableHeader = '<th style="text-align: left;">'
    const endTableHeader = "</th>"
    const startTableData = '<td style="text-align: left;">'
    const endTableData = "</td>"
    const rows = []
    rows[0] = '<table style="width: 100%;border-collapse: collapse;font-family: arial, sans-serif;"><tbody>'
    rows[rows.length] = startTableRow
      rows[rows.length] = startTableHeader
      rows[rows.length] = "Kollega"
      rows[rows.length] = endTableHeader
      rows[rows.length] = '<th colspan="4" style="text-align: left;">'
      rows[rows.length] = "Period"
      rows[rows.length] = endTableHeader
    rows[rows.length] = endTableRow
    rows[rows.length] = startTableRow
      rows[rows.length] = startTableData
      rows[rows.length] = info.colleague
      rows[rows.length] = endTableData
      rows[rows.length] = '<td colspan="4" style="text-align: left;">'
      rows[rows.length] = `${calendar.formattedStartDate} -> ${calendar.formattedEndDate}`
      rows[rows.length] = endTableData
    rows[rows.length] = endTableRow
    rows[rows.length] = "<tr><td>&nbsp;</td></tr>"
    rows[rows.length] = startTableRow
      rows[rows.length] = startTableHeader
      rows[rows.length] = "Kund"
      rows[rows.length] = endTableHeader
      rows[rows.length] = startTableHeader
      rows[rows.length] = "Konto"
      rows[rows.length] = endTableHeader
      rows[rows.length] = startTableHeader
      rows[rows.length] = "Timmar"
      rows[rows.length] = endTableHeader
      rows[rows.length] = startTableHeader
      rows[rows.length] = "Pris"
      rows[rows.length] = endTableHeader
      rows[rows.length] = startTableHeader
      rows[rows.length] = "Summa"
      rows[rows.length] = endTableHeader
    rows[rows.length] = endTableRow
    rows[rows.length] = startTableRow
      rows[rows.length] = startTableData
      rows[rows.length] = info.customer
      rows[rows.length] = endTableData
      rows[rows.length] = startTableData
      rows[rows.length] = info.account
      rows[rows.length] = endTableData
      rows[rows.length] = startTableData
      rows[rows.length] = calendar.billableHours
      rows[rows.length] = endTableData
      rows[rows.length] = startTableData
      rows[rows.length] = info.pricerate
      rows[rows.length] = endTableHeader
      rows[rows.length] = startTableData
      rows[rows.length] = calendar.billableHours * info.pricerate
      rows[rows.length] = endTableData
    rows[rows.length] = endTableRow

    if (showInReportDeviations) {
      // eslint-disable-next-line
      showInReportDeviations.map((deviation, index) => {
        const property = deviation.type
        const array = calendar[property]
        const deviationDates = getDatesInArrayForThisYearMonth(year, month, array)
        if (deviationDates.length > 0) {
          rows[rows.length] = "<tr><td>&nbsp;</td></tr>"
          rows[rows.length] = startTableRow
            rows[rows.length] = '<th colspan="3" style="text-align: left;">'
            rows[rows.length] = `${deviation.label} - totalt ${deviationDates.length} dag(ar)`
            rows[rows.length] = endTableHeader
          rows[rows.length] = endTableRow
          // eslint-disable-next-line
          deviationDates.map((date, index) => {
            rows[rows.length] = startTableRow
              rows[rows.length] = '<td colspan="3" style="text-align: left;">'
              rows[rows.length] = getformattedDate(date)
              rows[rows.length] = endTableData
            rows[rows.length] = endTableRow
          })
        }
      })
    }

    let html = ""
     for (var i = 0; i < rows.length; i++) {
      html += rows[i]
    }
    html += "</tbody><table>"

    return html
  }
  sendEmail = (showSpinner, hideSpinner, email, subject, htmlReport) => {
    showSpinner()
    gmail.sendMessage(hideSpinner, email, subject, htmlReport)
  }
  render() {
    const {calendar, info, showSpinner, hideSpinner} = this.props
    const total = info.pricerate * calendar.billableHours
    const year = calendar.date.getFullYear()
    const month = calendar.date.getMonth()
    const showInReportDeviations = calendar.deviations.filter(deviation => deviation.showInReport === true)
    const subject = `Tidrapport perioden ${calendar.formattedStartDate} -> ${calendar.formattedEndDate}`
    const htmlReport = this.createHtmlReport(calendar, info, showInReportDeviations)
    return (
      <div id="report" className="col-xs-12 box">
        <div className="table-responsive">
          <table className="table table-borderless table-condensed">
            <tbody>
              <tr>
                <th colSpan="1">Kollega</th>
                <th colSpan="2">Period</th>
              </tr>
              <tr>
                <td colSpan="1">{info.colleague}</td>
                <td colSpan="2">{calendar.formattedStartDate} -> {calendar.formattedEndDate}</td>
              </tr>
              <tr>
                <th colSpan="1">Kund</th>
                <th colSpan="1">Konto</th>
                <th colSpan="1">Timmar</th>
                <th colSpan="1">Pris</th>
                <th colSpan="1">Summa</th>
              </tr>
              <tr>
                <td colSpan="1">{info.customer}</td>
                <td colSpan="1">{info.account}</td>
                <td colSpan="1">{calendar.billableHours}</td>
                <td colSpan="1">{info.pricerate}</td>
                <td colSpan="1">{total}</td>
              </tr>
              {
                showInReportDeviations && showInReportDeviations.map((deviation, index) => {
                  let property = deviation.type
                  let array = calendar[property]
                  if(!array){
                    return null
                  }
                  const deviationDates = getDatesInArrayForThisYearMonth(year, month, array)
                  console.log('deviationDates', deviationDates);
                  if(deviationDates && deviationDates.length > 0) {
                    return ([
                      <tr key={property + '-header-' + index}>
                        <th colSpan="2">{deviation.label} - totalt {deviationDates.length} dag(ar)</th>
                      </tr>,
                    deviationDates.map((day, childIndex) => {
                      return ([
                        <tr key={property + '-details-' + childIndex}>
                          <td colSpan="2">{getformattedDate(day)}</td>
                        </tr>
                      ])
                    })
                    ])
                  }
                  return null
                })
              }
            </tbody>
          </table>
        </div>
        <div className="col-xs-12">
          {info && info.email &&
            <input type="button" className="margin-bottom btn btn-primary" value={`Skicka tidrapport`} onClick={() => this.sendEmail(showSpinner, hideSpinner, info.email, subject, htmlReport)}/>
          }
        </div>
      </div>
) } }
export default connect(
state =>({
  calendar : state.calendar,
  info : state.info,
}), dispatch => ({
  showSpinner: () => dispatch({type:'ShowSpinner'}),
  hideSpinner: () => dispatch({type:'HideSpinner'})
}))(Report)
