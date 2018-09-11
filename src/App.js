import React, { Component } from 'react';
import './App.css';
import GetFixtures from './components/getFixtures'

class App extends Component {
  constructor(){
    super()
    this.state = {
      source:'http://dev.webuildbots.ai:9123',
      token:'eFExWCgsmCX066dKSsJVmGu2HUYATekkGFcxbgnIfjPTtQ67JZrWjDnmwS3dn93p',
    }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">We Build Bots League</h1>
        </header>
          <div>
            <GetFixtures 
              source={this.state.source}
              token={this.state.token}
              endPoint={'fixtures'}
              fixtureId={'1234567'}
            />
          </div>
      </div>
    );
  }
}

export default App;
