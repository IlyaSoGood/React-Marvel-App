import AppHeader from '../appHeader/AppHeader';

import SingleComic from '../singleComic/SingleComic';

import { MainPage, ComicsPage } from '../pages';
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
                    </Routes>


                </main>
            </div>
        </Router>

    );


}

export default App;