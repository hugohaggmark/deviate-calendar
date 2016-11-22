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
          </div>
        </div>
        {/* <a href="#" className="btn btn-default" onClick={() => localStorage.removeItem('redux')}>Clear state...</a> */}
        <Info/>
        <Calendar />
        <Report />
      </div>
    )
  }
}

export default App
