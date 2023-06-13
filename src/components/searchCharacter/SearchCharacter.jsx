import React, { useRef } from 'react';

import { Formik, Form, Field, ErrorMessage, useField } from 'formik';


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
        <>
            <input {...props} {...field}/>
            {meta.touched && meta.error 
                ? <div className="error">{meta.error}</div>
                : null}
        </>
    )
}

const SearchCharacter = () => {
    // const inputRef = useRef(null);

    return (
        <Formik
            initialValues={{
                name: ''
            }}
            validate = {validate}
        >
            <Form className="char__search">
                <div className="char__search-title">Or find a character by name:</div>
                <div className="char__search-wrapper">
                    <input 
                        type="text"
                        // ref={inputRef}
                        className="char__search-input"
                        placeholder="Enter name"
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
    );
};

export default SearchCharacter;