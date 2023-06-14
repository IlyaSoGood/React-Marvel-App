import React from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import ErrorMessage from '../errorMessage/ErrorMessage';

const Page404 = () => {
    return (
        <div>
            <Helmet>
                <meta
                    name="description"
                    content="404 this page does not exist"
                />
                <title>404</title>
            </Helmet>

            <ErrorMessage/>
            <Link to="/" style={{marginTop : 30}}>Back to main page</Link>
        </div>
    );
};

export default Page404;