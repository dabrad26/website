import './App.scss';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import Error from '../../components/Error';
import { routes } from '../../constants/routes';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PortfolioItem from '../PortfolioItem';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for 404 redirect logic for GH pages
    const path = localStorage.getItem('path');

    if (path) {
      localStorage.removeItem('path');
      navigate(path);
    }
  }, []);

  useEffect(() => {
    const currentRoute = routes.find(item => location.pathname === item.path);

    if (location.pathname === '/') {
      document.title = 'David Bradshaw';
    } else if (currentRoute) {
      document.title = `${currentRoute.name} - David Bradshaw`;
    }

    window.scrollTo({top: 0});
  }, [location]);

  return (
    <div className="app-wrapper">
      <Header />
      <Routes>
        {routes.map(route => <Route key={route.path} path={route.path} element={route.component} />)}
        <Route path='/portfolio/:id' element={<PortfolioItem />} />
        <Route path="*" element={<Error mainText="Page not found" />} />
      </Routes>
      <Footer />
    </div>
  );
}
