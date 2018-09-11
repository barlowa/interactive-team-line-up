import React, { Component } from 'react';
import './App.css';
import CurrencyConverter from './components/currencyConverter'

class App extends Component {
  constructor(){
    super()
    this.state = {
      source:'USD',
      apikey:'85b00a0c39dc5422bedd9f60a0e83d57',
      currencies:'GBP,EUR,CAD,USD',
      format: '1',
    }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Currency Converter</h1>
        </header>
        <p className="App-intro">
          <CurrencyConverter 
            source={this.state.source}
            apikey={this.state.apikey}
            currencies={this.state.currencies}
            format={this.state.format}
          />
        </p>
      </div>
    );
  }
}

export default App;
