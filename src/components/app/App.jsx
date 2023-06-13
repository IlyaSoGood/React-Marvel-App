import { lazy , Suspense } from 'react';

import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';

import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';

import './App.scss';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicpage = lazy(() => import('../pages/SingleComicPage'));
const SingleCharacterPage = lazy(() => import('../pages/SingleCharacterPage'));

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path='/' element={<MainPage/>} />
            
                            <Route path='/comics' element={<ComicsPage/>} />

                            <Route path='/comics/:comicId' element={<SingleComicpage/>} />

                            <Route path='/character/:characterId' element={<SingleCharacterPage/>} />

                            <Route path="*" element={<Page404/>} />

                        </Routes>
                    </Suspense>

                </main>
            </div>
        </Router>

    );


}

export default App;