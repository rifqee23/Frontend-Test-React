import './index.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/templates/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductPage from './pages/ProductPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductPage />} />
      </Route>
    </Routes>
  );
};

export default App;
