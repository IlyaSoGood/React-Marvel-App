import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    state = {
        charList: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onLoadCharList(9);
    }

    onCharListLoading = () => {
        this.setState({
            loading: true,
            error: false
        })
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList,
            loading: false
        })
     }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onLoadCharList = (number) => {
        if (!this.state.loading) {this.onCharListLoading()};
        this.marvelService
            .getAllCharacters(number)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    render () {
        const {charList, loading, error} = this.state;
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
                <button className="button button__main button__long">
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