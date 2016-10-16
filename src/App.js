import React, { Component } from 'react';
import Info from './components/Info'
import Calendar from './components/Calendar'
import Result from './components/Result'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="container">
        <Info/>
        <Calendar />
        <Result />
      </div>
    )
  }
}

export default App
