import React, { useState } from 'react';

import { Formik, Form, useField } from 'formik';

import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';

import ErrorMessage from '../errorMessage/ErrorMessage';


import './searchCharacter.scss'

const validate = values => {
    const errors = {};

    if(!values.name) {
        errors.name = 'This field is required'
    } else if(values.name.length < 2) {
        errors.name = 'Min 2 symbols'
    }
    return errors;
}


const MyTextInput = ({...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className="char__search-input-wrapper">
            <input {...props} {...field}/>
            {meta.touched && meta.error 
                ? <div className="char__search-input-error">{meta.error}</div>
                : null}
        </div>
    )
}

const SearchCharacter = () => {
    const [char, setChar] = useState(null);

    const { loading, error, getCharacterByName, clearError } = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const searchChar = (name) => {
        clearError();

        getCharacterByName(name)
            .then(onCharLoaded)  
    }

    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    const results = !char 
        ?   null : char.length > 0 
        ?   <div className="char__search-info">
                <div className="char__search-info-title">There is! Visit {char[0].name} page?</div>
                <Link to={`/characters/${char[0].id}`} className="button button__secondary char__search-info-link">
                    <div className="inner">TO PAGE</div>
                </Link>
            </div>
        :   <div className="char__search-error">The character was not found. Check the name and try again</div>


    return (
        <div className="char__search">
            <Formik
                initialValues={{
                    name: ''
                }}
                validate = {validate}
                onSubmit = {value => searchChar(value.name)}
            >
                <Form>
                    <div className="char__search-title">Or find a character by name:</div>
                    <div className="char__search-wrapper">
                        <MyTextInput 
                            type="text"
                            className="char__search-input"
                            placeholder="Enter name"
                            name="name"
                        />
        
                        <button
                            type="submit"
                            className="button button__main char__search-submit"
                        >
                            <div className="inner">FIND</div>
                        </button>
                    </div>
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>


    );
};

export default SearchCharacter;