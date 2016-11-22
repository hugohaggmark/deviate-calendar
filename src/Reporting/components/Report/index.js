import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getformattedDate, getDatesInArrayForThisYearMonth } from '../../../dateHelper'
import './style.css'

class Report extends Component {
  render( ) {
    const {
      calendar,
      info,
    } = this.props
    const total = info.pricerate * calendar.billableHours
    const year = calendar.date.getFullYear()
    const month = calendar.date.getMonth()
    const showInReportDeviations = calendar.deviations.filter(deviation => deviation.showInReport === true)
    return (
      <div>
        <div className="row">
          <div id="report" className="table-responsive col-md-10">
            <table className="table table-borderless">
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
                    let deviationDates = getDatesInArrayForThisYearMonth(year, month, array)
                    if(deviationDates && deviationDates.length > 0) {
                      return ([
                        <tr key={property + '-header-' + index}>
                          <th>{deviation.label} - totalt {deviationDates.length} dag(ar)</th>
                        </tr>,
                      deviationDates.map((day, childIndex) => {
                        return ([
                          <tr key={property + '-details-' + childIndex}>
                            <td>{getformattedDate(day)}</td>
                          </tr>
                        ])
                      })
                      ])
                    }
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      ) } }
export default connect(
  state =>({
    calendar : state.calendar,
    info : state.info,
}), dispatch => ({

}))(Report)
