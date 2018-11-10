import React, { Component } from 'react';
import './App.scss';
import Datadisplay from './Components/Datadisplay';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Breached Sites Details</h1>
        <Datadisplay />
      </div>
    );
  }
}

export default App;
