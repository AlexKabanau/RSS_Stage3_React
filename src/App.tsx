import './App.css';
import { BrowserRouter } from 'react-router';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import NotFoundPager from './pages/NotFoundPager';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="character/:id" element={<CartPage />} />
        </Route>
        <Route path="*" element={<NotFoundPager />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
