import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(200);
    const [charEnded, setCharEnded] = useState(false);


    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {
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

            let styleThumbnail = {};
            if(thumbnail.match(/not_available/)) {styleThumbnail = {objectFit: 'contain'}};

            return (
                <CSSTransition
                    key={id}
                    // nodeRef={nodeRef}
                    timeout={500}
                    classNames="item"
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
                        <img src={thumbnail} alt={name} style={styleThumbnail}/>
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

    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display' : charEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    );
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
}


export default CharList;