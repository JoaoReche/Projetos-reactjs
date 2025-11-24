import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Filme from './pages/Detalhes';
import MyList from './pages/My-List';
import NotFound from './pages/NotFound';

function RoutesFile() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/filme/:id' element={<Filme />} />
                <Route path='/minha-lista' element={<MyList />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default RoutesFile;