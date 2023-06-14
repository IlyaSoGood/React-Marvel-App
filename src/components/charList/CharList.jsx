import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const setContent = (status, Component, newItemLoading) => {
    switch (status) {
        case 'waiting':
            return <Spinner/>
            break;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
            break;
        case 'confirmed':
            return <Component/>;
            break;
        case 'error':
            return <ErrorMessage/>
            break;
        default:
            throw new Error('Unexpected process state');
    }
}

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(200);
    const [charEnded, setCharEnded] = useState(false);


    const { getAllCharacters, status, setStatus} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setStatus('confirmed'))
    }

    const onCharListLoaded = async (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
        
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let className = "char__item";
            const {thumbnail, name, id} = item;

            // let styleThumbnail = {};
            // if(thumbnail.match(/not_available/)) {styleThumbnail = {objectFit: 'contain'}};

            let imgStyle = {'objectFit' : 'cover'};
            if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (
                <CSSTransition
                    key={id}
                    // nodeRef={nodeRef}
                    timeout={500}
                    classNames="char__item"
                >
                    <li
                        tabIndex={0} 
                        ref={el => itemRefs.current[i] = el}
                        className={className} 
                        // key={id} 
                        onClick={() => {
                            props.onCharSelected(id);
                            focusOnItem(i);
                        }}
                        onKeyPress={(e) => {
                            if (e.key === ' ' || e.key === 'Enter') {
                                props.onCharSelected(id)
                                focusOnItem(i)
                            }
                        }}
                    >
                        {/* <img src={thumbnail} alt={name} style={styleThumbnail}/> */}
                        <img src={thumbnail} alt={name} style={imgStyle}/>
                        <div className="char__name">{name}</div>
                    </li>
                </CSSTransition>
            )
        })
        return (
            <TransitionGroup className="char__grid" component={'ul'}>
                {items}
            </TransitionGroup>
        )
    }

    return (
        <div className="char__list">
            {setContent(status, () => renderItems(charList), newItemLoading)}
            {console.log('render list')}

            <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display' : charEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset, false)}>
                <div className="inner">load more</div>
            </button>
        </div>
    );
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
}


export default CharList;