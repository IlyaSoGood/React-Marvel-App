import { useState } from 'react';

import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import AppBanner from '../appBanner/AppBanner';
import ComicsList from '../comicsList/ComicsList';
import SingleComic from '../singleComic/SingleComic';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import './App.scss';
import vision from '../../resources/img/vision.png';

const App = () => {
    const [selectedChar, setChar] = useState(null);


    const onCharSelected = (id) => {
        setChar(id);
    }

    // const typePage = this.state.type.page;
    // const typeComicsPage = this.state.type.pageComics;

    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/* {typePage === 'Characters' &&  */}
                {/* <> */}
                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className='char__content'>
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                    
                    </div>
                    <img className="bg-decoration" src={vision} alt="vision"></img>
                {/* </> */}
                {/* } */}
                {/* {typePage === 'Comics' &&
                <>
                    <AppBanner/>
                    {typeComicsPage === 'list' &&
                    <ComicsList/>
                    }
                    {typeComicsPage === 'single' &&
                    <SingleComic/>
                    }
                </>
                } */}

            </main>
        </div>
    );


}

export default App;