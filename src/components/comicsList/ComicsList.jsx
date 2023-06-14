import { useState, useEffect, useRef } from 'react';
import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

const setContent = (status, Component, newItemLoading) => {
    switch (status) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state');
    }
}

const ComicsList = (props) => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);


    const { getAllComics, status, setStatus } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setStatus('confirmed'))
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

    return (
        <div className="comics__list">
            {setContent(status, () => renderItems(comicsList), newItemLoading)}

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