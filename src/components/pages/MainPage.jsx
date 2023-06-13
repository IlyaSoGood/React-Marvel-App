import { useState } from 'react';
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
        <div>
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
        </div>
    );
};

export default MainPage;