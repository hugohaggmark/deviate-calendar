import React, {Component} from 'react';
import {Calendar} from './Calendar'
import {Info} from './Information'
import {Report} from './Reporting'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      showInfo: false,
      showReport: false,
    }
  }
  toggleInfo = () => {
    this.setState({
      showInfo: !this.state.showInfo
    })
  }
  toggleReport = () => {
    this.setState({
      showReport: !this.state.showReport
    })
  }
  render() {
    const showReport = this.state.showReport
    const showInfo = this.state.showInfo
    return (
      <div className="container">
        <div className="row">
          <Calendar />
          <div className="row">
            <div className="box col-xs-10 col-xs-offset-1 col-sm-7 col-sm-offset-2">
              <div className="box-header pointer" onClick={this.toggleInfo}>
                {!showInfo && <span>Visa personuppgifter</span>}
                {!showInfo && <span className="pull-right"><i className="glyphicon glyphicon-chevron-right"></i></span>}
                {showInfo && <span>Dölj personuppgifter</span>}
                {showInfo && <span className="pull-right"><i className="glyphicon glyphicon-chevron-down"></i></span>}
              </div>
              {showInfo &&
                <Info />
              }
            </div>
          </div>
          <div className="row">
            <div className="box col-xs-10 col-xs-offset-1 col-sm-7 col-sm-offset-2">
              <div className="box-header pointer" onClick={this.toggleReport}>
                {!showReport && <span>Visa tidrapport</span>}
                {!showReport && <span className="pull-right"><i className="glyphicon glyphicon-chevron-right"></i></span>}
                {showReport && <span>Dölj tidrapport</span>}
                {showReport && <span className="pull-right"><i className="glyphicon glyphicon-chevron-down"></i></span>}
              </div>
              {showReport &&
                <Report />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
