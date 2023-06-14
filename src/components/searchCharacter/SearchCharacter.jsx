import React, { useState } from 'react';

import { Formik, Form, useField } from 'formik';

import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';


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
    const [error, setError] = useState(null);

    const { getCharacterByName } = useMarvelService();

    const searchChar = (name) => {
        getCharacterByName(name)
            .then(res => {
                    setChar(res)
                    setError(false)
                }
            )
            .catch(res => {
                    setChar(null)
                    setError(true)
                }
            )
        
    }
    

    return (
        <Formik
            initialValues={{
                name: ''
            }}
            validate = {validate}
            onSubmit = {value => searchChar(value.name)}
        >
            <Form className="char__search">
                <div className="char__search-title">Or find a character by name:</div>
                <div className="char__search-wrapper">
                    <MyTextInput 
                        type="text"
                        // ref={inputRef}
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

                {char
                    ?   <div className="char__search-info">
                            <div className="char__search-info-title">There is! Visit {char.name} page?</div>
                            <Link className="button button__secondary char__search-info-link" to={`/character/${char.id}`}>
                                <div className="inner">TO PAGE</div>
                            </Link>
                        </div>
                    : null
                }
                {error
                    ?   <div className="char__search-error">The character was not found. Check the name and try again</div>
                    : null
                }
            </Form>
        </Formik>
    );
};

export default SearchCharacter;