import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 1544,
        charEnded: false,
        // scroll: 0
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
        // window.addEventListener('scroll', this.loadListByScroll(this.state.offset));
    }
    componentDidUpdate() {
        console.log('componentDidUpdate');
    }
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    //Не доделана загрузка элементов при скролле. В данном исполнении обработчик scroll при скролле срабатывает много раз, вызывая метод this.onRequest много раз одновременно, создавая баги.
    // loadListByScroll(offset) {
    //     if ((Math.floor(window.outerHeight + window.pageYOffset) > Math.floor(document.scrollingElement.offsetHeight) - 20) && window.pageYOffset > 0) {
    //         this.onRequest(offset);
    //         console.log('loaded-List-By-Scroll');
    //         // window.removeEventListener('scroll', () => this.loadListByScroll(this.state.offset));
    //     }
    // }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    render () {
        const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <ViewCharList charList={charList} props={this.props}/> : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                <ul className="char__grid">
                    {content}
                </ul>
                <button 
                        className="button button__main button__long"
                        disabled={newItemLoading}
                        style={{'display' : charEnded ? 'none' : 'block'}}
                        onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

const ViewCharList = ({charList, props}) => {
    return (
        charList.map((item, i) => {
            let {name, thumbnail, id} = item;
            let className = "char__item";
            if (i === 2) {className = 'char__item char__item_selected'}

            let styleThumbnail = {};
            if(thumbnail.match(/not_available/)) {styleThumbnail = {objectFit: 'contain'}};

            // {
            //     item.addEventListener('click', (e) => {
            //         e.classList.toggle('char__item_selected')
            //     })
            // }

            return (
                <li className={className} key={id} onClick={() => props.onCharSelected(id)}>
                    <img src={thumbnail} alt={name} style={styleThumbnail}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })
    )
}


export default CharList;