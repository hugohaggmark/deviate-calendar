import React, { Component } from 'react';
import { Calendar } from './Calendar'
import { Info } from './Information'
import { Report } from './Reporting'
import './App.css'

export default class App extends Component {

  render() {
    return (
      <div className="container">
        <Info/>
        <Calendar />
        <Report />
      </div>
    )
  }
}
