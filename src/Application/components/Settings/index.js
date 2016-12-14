import React, {Component} from 'react'
import {connect} from 'react-redux'
import Deviation from '../Deviation'

class Settings extends Component {
  render () {
    const {deviations} = this.props
    return (
      <div className="container">
        <div className="row">
          <h1>Inställningar</h1>
          <div className="col-xs-12 col-sm-8">
            <h3>Avvikelser</h3>
            { deviations && deviations.map((deviation, index) => {
              return <Deviation key={"deviation-" + index} deviation={deviation}/>
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  deviations: state.application.deviations
}))(Settings)
