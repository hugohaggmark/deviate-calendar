import React, {Component} from 'react'
import Modal from '../Modal'

export default class State extends Component {
  render() {
    const redux = localStorage.getItem("redux")
    return(
      <div className="container">
        <div className="row">
          <div className="well">
            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#myModal">
              Nollställ tillståndet
            </button>
            <Modal title="Nollställ tillståndet" body="Nollställ kommer att rensa allt du har matat in någonsin" okLabel="Nollställ tillståndet" okAction={() => localStorage.removeItem('redux')}/>
          </div>
          <h3>Nuvarande tillstånd</h3>
          <div className="well well-lg">
            {redux}
          </div>
        </div>
      </div>
    )
  }
}
