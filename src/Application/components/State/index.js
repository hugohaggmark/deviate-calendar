import React, {Component} from 'react'
import Modal from '../Modal'

export default class State extends Component {
  render() {
    const redux = JSON.parse(localStorage.getItem("redux"))
    return(
      <div className="container">
        <div className="row">
          <div className="well">
            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#myModal">
              Nollställ data
            </button>
            <Modal title="Nollställ data" body="Nollställ kommer att rensa allt data du har matat in någonsin" okLabel="Nollställ data" okAction={() => localStorage.removeItem('redux')}/>
          </div>
          <h3>Nuvarande data</h3>
          <div className="well well-lg">
            <pre>
              {JSON.stringify(redux, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    )
  }
}
