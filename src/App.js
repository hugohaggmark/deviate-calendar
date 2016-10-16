import React, { Component } from 'react';
import Info from './components/Info'
import Calendar from './components/Calendar'
import Report from './components/Report'
import './App.css'

class App extends Component {
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

export default App
