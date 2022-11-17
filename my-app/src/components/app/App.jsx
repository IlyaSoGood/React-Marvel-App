import { Component } from 'react';

import AppHeader from '../appHeader/AppHeader';

import './App.scss';

class App extends Component {
  render () {
    return (
      <div className="app">
        <AppHeader/>
      </div>
    );
  }


}

export default App;