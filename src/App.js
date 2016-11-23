import React, { Component } from 'react';
import { Calendar } from './Calendar'
import { Info } from './Information'
import { Report } from './Reporting'
import { Modal } from './Application'
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
            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#myModal">
              Nollställ
            </button>
            <Modal title="Nollställ" body="Nollställ kommer att rensa allt du har matat in någonsin" okLabel="Nollställ" okAction={() => localStorage.removeItem('redux')}/>
          </div>
        </div>
        <Info/>
        <Calendar />
        <Report />
      </div>
    )
  }
}

export default App
