import React, {Component} from 'react'
import {connect} from 'react-redux'
import Spinner from 'react-spinkit'
import {Calendar} from './Calendar'
import {Info} from './Information'
import {Report} from './Reporting'

class App extends Component {
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
    const {showSpinner} = this.props
    const showReport = this.state.showReport
    const showInfo = this.state.showInfo
    return (
      <div className="container">
        { showSpinner &&
          <Spinner spinnerName="spinner" noFadeIn />
        }
        <div className="row">
          <Calendar />
          <div className="row">
            <div className="col-xs-10 col-xs-offset-1 col-sm-7 col-sm-offset-0">
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
            <div className="col-xs-10 col-xs-offset-1 col-sm-7 col-sm-offset-0">
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

export default connect(state =>({
  showSpinner: state.application.showSpinner
}))(App)
