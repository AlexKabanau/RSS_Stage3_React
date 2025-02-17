import './App.css';
import { BrowserRouter } from 'react-router';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import NotFoundPager from './pages/NotFoundPager';
import { Toaster } from 'sonner';
import { useTheme } from './hooks/useTheme';

const App = () => {
  const { theme } = useTheme();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="character/:id" element={<CartPage />} />
        </Route>
        <Route path="*" element={<NotFoundPager />} />
      </Routes>
      <Toaster theme={theme} position="bottom-right" duration={5000} />
    </BrowserRouter>
  );
};

export default App;
