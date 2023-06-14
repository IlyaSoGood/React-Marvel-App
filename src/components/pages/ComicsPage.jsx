import { Helmet } from 'react-helmet';

import ComicsList from '../comicsList/ComicsList';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import AppBanner from '../appBanner/AppBanner';

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of comics"
                />
                <title>Comics Page</title>
            </Helmet>

            <AppBanner/>
            <ErrorBoundary>
                <ComicsList/>
            </ErrorBoundary>
        </>
    );
};

export default ComicsPage;