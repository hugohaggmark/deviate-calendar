import React, {Component} from 'react'
import json from '../../../Calendar/deviations.json'
console.log(json.deviations);
export default class Settings extends Component {
  render () {
    return (
      <div className="container">
        <div className="row">
          <h1>Inställningar</h1>
          { json.deviations && json.deviations.map((deviation, index) => {
            return <span key={index}>{deviation.type}</span>
          })}
        </div>
      </div>
    )
  }
}
