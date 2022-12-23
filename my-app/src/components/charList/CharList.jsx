import { Component } from 'react';
import PropTypes from 'prop-types';

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
        offset: 200,
        charEnded: false,
    }

    firedList = false;

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest(this.state.offset);
        // window.addEventListener('scroll', () => this.loadListByScroll(this.state.offset));
    }
    componentDidUpdate() {
        // console.log('componentDidUpdate');
    }
    componentWillUnmount() {
        // console.log('componentWillUnmount');
    }

    //Реализована дозагрузка CharList при скролле с помощью переменной this.firedList. Эта переменная принимает значение true каждый раз когда условия на событие scroll выполняются. CharList растянет window вниз. По завершению метода this.onRequest/this.onCharListLoaded (который выполнится спустя задержку), переменная снова принимает значение false при условии, что список новых персонажей = 9. ЕДИНСТВЕННЫЙ МОМЕНТ, не реализован removeEventListener на событие скролл в момент componentWillUnmount, так как функция должна быть именованной, а я пока не знаю как сослаться на this CharList, а не this объекта Event scroll.
    loadListByScroll(offset) {
        if (this.firedList === true) {return}
        if ((Math.floor(window.outerHeight + window.pageYOffset) > Math.floor(document.scrollingElement.offsetHeight) - 20) && window.pageYOffset > 0) {
            this.onRequest(offset);
            this.firedList = true;
            console.log('loaded-List-By-Scroll');
            // window.removeEventListener('scroll', () => this.loadListByScroll(this.state.offset));
        }
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
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

        if (newCharList.length === 9) {
            this.firedList = false;
            console.log(this.firedList)
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

    setListItemRef = (elem, i) => {
        this.myRef[i] = elem;
    }

    focusListItem = (i) => {
        if (this.myRef) {
            this.myRef.classList.add('char__item_selected');
        }
    }

    renderItems(arr) {
        const items = arr.map((item, i) => {
            let className = "char__item";
            const {thumbnail, name, id} = item;

            let styleThumbnail = {};
            if(thumbnail.match(/not_available/)) {styleThumbnail = {objectFit: 'contain'}};

            return (
                <li 
                ref={this.setListItemRef(item, i)}
                className={className} 
                key={id} 
                onClick={() => {this.props.onCharSelected(id); this.focusListItem(i)}}>
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

    render () {
        const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;

        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        // const content = !(loading || error) ? <ViewCharList charList={charList} props={this.props}/> : null;
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
                        onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

// const ref = React.createRef();

// const ViewCharList = ({charList, props}, ref) => {
//     return (
//         charList.map((item, i) => {
//             let {name, thumbnail, id} = item;
//             let className = "char__item";

//             let styleThumbnail = {};
//             if(thumbnail.match(/not_available/)) {styleThumbnail = {objectFit: 'contain'}};

//             return (
//                 <li 
//                 className={className} 
//                 key={id} 
//                 onClick={() => props.onCharSelected(id)}
//                 >
//                     <img src={thumbnail} alt={name} style={styleThumbnail}/>
//                     <div className="char__name">{name}</div>
//                 </li>
//             )
//         })
//     )
// }

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
}


export default CharList;