import React, {Component} from 'react'
import { SketchPicker } from 'react-color';
import json from '../../../Calendar/deviations.json'
export default class Settings extends Component {
  render () {
    return (
      <div className="container">
        <div className="row">
          <h1>Inställningar</h1>
          <div className="col-xs-12 col-sm-8">
            <h3>Avvikelser</h3>
            { json.deviations && json.deviations.map((deviation, index) => {
              return <div className="well" key={"deviation-" + index}>
                <div  className="form-horizontal">
                  <div className="form-group">
                    <label className="col-xs-3 col-sm-2 control-label" htmlFor={"deviation-id-" + deviation.id}>Id:</label>
                    <div className="col-xs-4 col-sm-2">
                      <input type="text" defaultValue={deviation.id} id={"deviation-id-" + deviation.id} className="form-control" readOnly/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-xs-3 col-sm-2 control-label" htmlFor={"deviation-label-" + deviation.id}>Rubrik:</label>
                    <div className="col-xs-7 col-sm-4">
                      <input type="text" defaultValue={deviation.label} id={"deviation-label-" + deviation.id} className="form-control"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-xs-3 col-sm-2 control-label" htmlFor={"deviation-report-" + deviation.id}>Visa i tidrapport:</label>
                    <input type="checkbox" checked={deviation.showInReport}/>
                    <div className="checkbox">
                      <label>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="clearfix visible-xs-block"></div>
              </div>
            })}
          </div>
          {/* <SketchPicker /> */}
        </div>
      </div>
    )
  }
}
