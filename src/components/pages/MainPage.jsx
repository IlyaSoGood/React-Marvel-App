import { useState } from 'react';
import { Helmet } from 'react-helmet';

import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import SearchCharacter from '../searchCharacter/SearchCharacter';

import vision from '../../resources/img/vision.png';

const MainPage = () => {
    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel Information Portal"
                />
                <title>Marvel Information Portal</title>
            </Helmet>
            
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
                <ErrorBoundary>
                    <SearchCharacter/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={vision} alt="vision"></img>
        </>
    );
};

export default MainPage;