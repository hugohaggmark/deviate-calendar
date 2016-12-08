import React, {Component} from 'react';
import {connect} from 'react-redux'
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
    const {hasInfo} = this.props
    const showReport = this.state.showReport
    const showInfo = this.state.showInfo || !hasInfo
    return (
      <div className="container col-md-offset-3">
        <Calendar />
        <div className="box col-md-7">
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
        <div className="box col-md-7">
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
    )
  }
}

export default connect(state => ({
  hasInfo: state.info.colleague &&
  state.info.customer &&
  state.info.account &&
  state.info.pricerate &&
  state.info.workHours &&
  state.info.email
}), dispatch =>({

}))(App)
