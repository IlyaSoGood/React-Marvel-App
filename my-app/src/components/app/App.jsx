import { Component } from 'react';

import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import AppBanner from '../appBanner/AppBanner';
import ComicsList from '../comicsList/ComicsList';
import SingleComic from '../singleComic/SingleComic';

import './app.scss';
import vision from '../../resources/img/vision.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: {
        page: 'Characters',
        pageComics: 'list'
      }
    }
  }

  render () {
    const typePage = this.state.type.page;
    const typeComicsPage = this.state.type.pageComics;

    return (
      <div className="app">
        <AppHeader/>
        <main>
          {typePage === 'Characters' && 
            <>
              <RandomChar/>
              <div className='char__content'>
                <CharList/>
                <CharInfo/>
              </div>
              <img className="bg-decoration" src={vision} alt="vision"></img>
            </>
          }
          {typePage === 'Comics' &&
            <>
              <AppBanner/>
              {typeComicsPage === 'list' &&
                <ComicsList/>
              }
              {typeComicsPage === 'single' &&
                <SingleComic/>
              }
            </>
          }

        </main>
      </div>
    );
  }


}

export default App;