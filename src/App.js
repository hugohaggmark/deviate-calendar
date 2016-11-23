import React, { Component } from 'react';
import { Calendar } from './Calendar'
import { Info } from './Information'
import { Report } from './Reporting'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="container">
        <a role="button" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          <h3 className="glyphicon glyphicon-menu-hamburger"></h3>
        </a>
        <div className="collapse" id="collapseExample">
          <div className="well">
            <a href="#" className="btn btn-danger" onClick={() => localStorage.removeItem('redux')}>Nollställ</a>
            <span className="text-muted"> Nollställ kommer att rensa allt du har matat in någonsin</span>
          </div>
        </div>
        {/* <Info/>
          <Calendar />
        <Report /> */}
      </div>
    )
  }
}

export default App
