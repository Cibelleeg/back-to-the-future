import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { Home } from './pages/Home';
import { FilmesPage } from './pages/Filmes';
import { CinemasPage } from './pages/Cinemas';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/filmes"  element={<FilmesPage />} />
          <Route path="/cinemas" element={<CinemasPage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
