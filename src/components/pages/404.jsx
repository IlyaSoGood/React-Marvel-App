import React from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../errorMessage/ErrorMessage';

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <Link to="/" style={{marginTop : 30}}>Back to main page</Link>
        </div>
    );
};

export default Page404;