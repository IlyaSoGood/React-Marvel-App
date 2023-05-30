import { useState, useEffect, useRef } from 'react';
import './comicsList.scss';
import UW from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

const ComicsList = (props) => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);


    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 8);
        setComicsEnded(comicsEnded => ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let className = "comics__item";
            const {thumbnail, title, id, price} = item;

            let styleThumbnail = {};
            if(thumbnail.match(/not_available/)) {styleThumbnail = {objectFit: 'contain'}};

            return (
                <li
                    tabIndex={0} 
                    ref={el => itemRefs.current[i] = el}
                    className={className} 
                    key={i} 
                    onClick={() => {
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            focusOnItem(i)
                        }
                    }}
                >   
                    <Link to={`/comics/${id}`}>
                        <img src={thumbnail} alt={title} className="comics__item-img" style={styleThumbnail}/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price !== 0 ? price + "$" : 'NOT AVAILABLE'}</div>
                    </Link>
                </li>
            )
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const items = renderItems(comicsList);

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
}

export default ComicsList;