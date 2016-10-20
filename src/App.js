import React, { Component } from 'react';
import { Calendar } from './Calendar'
import { Info } from './Information'
import Report from './components/Report'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="container">
        {/* <a href="#" className="btn btn-default" onClick={() => localStorage.removeItem('redux')}>Clear state...</a> */}
        <Info/>
        <Calendar />
        <Report />
      </div>
    )
  }
}

export default App
