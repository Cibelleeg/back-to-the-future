import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './contexts/CartProvider';
import { Home } from './pages/Home';
import { FilmesPage } from './pages/Filmes';
import { CinemasPage } from './pages/Cinemas';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/filmes"  element={<FilmesPage />} />
          <Route path="/cinemas" element={<CinemasPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
