import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(200);
    const [charEnded, setCharEnded] = useState(false);


    const marvelService = new MarvelService();
    useEffect(() => {
        onRequest(offset);
        // window.addEventListener('scroll', () => loadListByScroll(this.state.offset));
    }, [])

    //Реализована дозагрузка CharList при скролле с помощью переменной this.firedList. Эта переменная принимает значение true каждый раз когда условия на событие scroll выполняются. CharList растянет window вниз. По завершению метода this.onRequest/this.onCharListLoaded (который выполнится спустя задержку), переменная снова принимает значение false при условии, что список новых персонажей = 9. ЕДИНСТВЕННЫЙ МОМЕНТ, не реализован removeEventListener на событие скролл в момент componentWillUnmount, так как функция должна быть именованной, а я пока не знаю как сослаться на this CharList, а не this объекта Event scroll.
    let firedList = false;
    const loadListByScroll = (offset) => {
        if (this.firedList === true) {return}
        if ((Math.floor(window.outerHeight + window.pageYOffset) > Math.floor(document.scrollingElement.offsetHeight) - 20) && window.pageYOffset > 0) {
            this.onRequest(offset);
            this.firedList = true;
            console.log('loaded-List-By-Scroll');
            // window.removeEventListener('scroll', () => this.loadListByScroll(this.state.offset));
        }
    }

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService
            .getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError);
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        if (newCharList.length === 9) {
            firedList = false;
            // console.log(firedList)
        }

        setCharList(charList => [...charList, ...newCharList]);
        setLoading(loading => false);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);

    }

    const onError = () => {
        setError(true)
        setLoading(loading => false);
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
                <li
                    tabIndex={0} 
                    ref={el => itemRefs.current[i] = el}
                    className={className} 
                    key={id} 
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
            )
        })
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;


    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {/* <ul className="char__grid"> */}
                {content}
            {/* </ul> */}
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