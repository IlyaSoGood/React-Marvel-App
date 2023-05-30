import AppHeader from '../appHeader/AppHeader';

import { MainPage, ComicsPage, Page404, SingleComicpage } from '../pages';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';

import './App.scss';


const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path='/' element={<MainPage/>} />
        
                        <Route path='/comics' element={<ComicsPage/>} />

                        <Route path='/comics/:comicId' element={<SingleComicpage/>} />

                        <Route path="*" element={<Page404/>} />

                    </Routes>


                </main>
            </div>
        </Router>

    );


}

export default App;