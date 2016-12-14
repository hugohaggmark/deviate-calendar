import React, {Component} from 'react'
import {connect} from 'react-redux'
import { SketchPicker } from 'react-color';
import * as actions from '../../actions'

class Deviation extends Component {
  render () {
    const {deviation, updateDeviation} = this.props
    return (
      <div className="well">
        <div className="col-xs-4 col-sm-2 deviation-example" style={deviation.style}>
          <span>{deviation.label}</span>
        </div>
        <div className="clearfix visible-xs-block visible-sm-block visible-md-block visible-lg-block"></div>
        <div  className="form-horizontal">
          <div className="form-group">
            <label className="col-xs-5 col-sm-3 control-label" htmlFor={"deviation-id-" + deviation.id}>Id:</label>
            <div className="col-xs-4 col-sm-2">
              <input type="text" defaultValue={deviation.id} id={"deviation-id-" + deviation.id} className="form-control" readOnly/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-5 col-sm-3 control-label" htmlFor={"deviation-label-" + deviation.id}>Rubrik:</label>
            <div className="col-xs-7 col-sm-4">
              <input type="text" defaultValue={deviation.label} id={"deviation-label-" + deviation.id} className="form-control" onChange={(event) => updateDeviation({...deviation, label: event.target.value})}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-5 col-sm-3 control-label" htmlFor={"deviation-report-" + deviation.id}>Visa i tidrapport:</label>
            <div className="col-xs-2 col-sm-2 col-md-1">
              <input id={"deviation-report-" + deviation.id} type="checkbox" className="form-checkbox" defaultChecked={deviation.showInReport} onChange={(event) => updateDeviation({...deviation, showInReport: event.target.checked})}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-5 col-sm-3 control-label" htmlFor={"deviation-background-" + deviation.id}>Bakgrundsfärg:</label>
            <div className="col-xs-5 col-sm-5 col-md-3">
              <input type="text" defaultValue={deviation.style.backgroundColor} id={"deviation-background-" + deviation.id} className="form-control" readOnly/>
              <SketchPicker
                disableAlpha={true}
                width="140px"
                color={deviation.style.backgroundColor}
                onChangeComplete={(color) => updateDeviation({...deviation, style:{backgroundColor: `${color.hex}`}})}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({

}), dispatch => ({
  updateDeviation: deviation => dispatch(actions.updateDeviationAction(deviation))
}))(Deviation)
