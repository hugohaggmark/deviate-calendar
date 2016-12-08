import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getformattedDate, getDatesInArrayForThisYearMonth} from '../../../dateHelper'
import {gmail} from '../../../Application'
import './style.css'

class Report extends Component {
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
      rows[rows.length] = startTableHeader
      rows[rows.length] = "Period"
      rows[rows.length] = endTableHeader
    rows[rows.length] = endTableRow
    rows[rows.length] = startTableRow
      rows[rows.length] = startTableData
      rows[rows.length] = info.colleague
      rows[rows.length] = endTableData
      rows[rows.length] = startTableData
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
      showInReportDeviations.map((deviation, index) => {
        const property = deviation.type
        const array = calendar[property]
        const deviationDates = getDatesInArrayForThisYearMonth(year, month, array)
        if (deviationDates.length > 0) {
          rows[rows.length] = "<tr><td>&nbsp;</td></tr>"
          rows[rows.length] = startTableRow
            rows[rows.length] = startTableHeader
            rows[rows.length] = `${deviation.label} - totalt ${deviationDates.length} dag(ar)`
            rows[rows.length] = endTableHeader
          rows[rows.length] = endTableRow
          deviationDates.map((date, index) => {
            rows[rows.length] = startTableRow
              rows[rows.length] = startTableData
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
  render() {
    const {calendar, info} = this.props
    const total = info.pricerate * calendar.billableHours
    const year = calendar.date.getFullYear()
    const month = calendar.date.getMonth()
    const showInReportDeviations = calendar.deviations.filter(deviation => deviation.showInReport === true)
    const subject = `Tidrapport perioden ${calendar.formattedStartDate} -> ${calendar.formattedEndDate}`
    const htmlReport = this.createHtmlReport(calendar, info, showInReportDeviations)
    return (
      <div className="row">
        <div id="report" className="table-responsive">
          <table className="table table-borderless table-condensed">
            <tbody>
              <tr>
                <th colSpan="2">Kollega</th>
                <th colSpan="2">Period</th>
              </tr>
              <tr>
                <td colSpan="2">{info.colleague}</td>
                <td colSpan="2">{calendar.formattedStartDate} -> {calendar.formattedEndDate}</td>
              </tr>
              <tr>
                <th colSpan="2">Kund</th>
                <th colSpan="2">Konto</th>
                <th colSpan="1">Timmar</th>
                <th colSpan="1">Pris</th>
                <th colSpan="1">Summa</th>
              </tr>
              <tr>
                <td colSpan="2">{info.customer}</td>
                <td colSpan="2">{info.account}</td>
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
          <input type="button" className="margin-bottom margin-right btn btn-primary pull-right" value="Skicka tidrapport" onClick={() => gmail.sendMessage(subject, htmlReport)}/>
        </div>
      </div>
  ) } }
export default connect(
  state =>({
    calendar : state.calendar,
    info : state.info,
}), dispatch => ({

}))(Report)
