import { useState , useEffect } from 'react';
import PropTypes from 'prop-types';

import setContent from '../../utils/setContent';

import useMarvelService from '../../services/MarvelService';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const {getCharacter, clearError, status, setStatus} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        if (!props.charId) {
            return;
        }

        clearError();
        getCharacter(props.charId)
            .then(onCharLoaded)
            .then(() => setStatus('confirmed'))
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }


    return (
        <div className="char__info">
            {setContent(status, View, char)}
        </div>
    );
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;

    let styleThumbnail = {};
    if(thumbnail.match(/not_available/)) {styleThumbnail = {objectFit: 'contain'}};

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={styleThumbnail}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            {comics.length > 0 &&
                <>
                    <div className="char__comics">Comics:</div>
                    <ul className="char__comics-list">
                        {
                            comics.map((item, i) => {
                                if (i > 9) return;
                                return (
                                    <li key={i} className="char__comics-item">
                                        {item.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </>
            }

        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number,
}

export default CharInfo;