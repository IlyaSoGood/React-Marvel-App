import { Component } from 'react';

import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';

import './app.scss';
import vision from '../../resources/img/vision.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'Characters'
    }
  }

  render () {
    const typePage = this.state.type;

    return (
      <div className="app">
        <AppHeader/>
        <main>
          {typePage === 'Characters' && 
            <RandomChar/>
            <div className='char__content'>
              <CharList/>
              <CharInfo/>
            </div>
            <img className="bg-decoration" src={vision} alt="vision"></img>
          }

        </main>
      </div>
    );
  }


}

export default App;