import { useEffect } from 'react';
import { routes, type RouteType } from '../../constants/routes';
import Banner from '../Banner';
import Error from '../Error';
import './Header.scss';
import { useLocation, useNavigate } from 'react-router';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const header = document.querySelector('header');

    if (!header) {
      return;
    }

    const headerArea = document.querySelector('.header_area');
    const navOffsetTop = header.clientHeight + 50;

    if (headerArea) {
      const onScroll = () => {
        const scroll = window.scrollY;

        if (scroll >= navOffsetTop) {
          headerArea.classList.add('navbar_fixed');
        } else {
          headerArea.classList.remove('navbar_fixed');
        }
      };

      window.addEventListener('scroll', onScroll);

      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }
  }, []);

  const getCurrentRoute = (): RouteType => {
    return routes.find(item => item.path === '/' ? location.pathname === item.path : location.pathname.includes(item.path)) || {path: '/error', name: 'Not found', component: <Error mainText="Page not found" />};
  };

  const isCurrentRoute = (route: string): boolean => {
    return route === getCurrentRoute().path;
  };

  const navigateRoute = (route: string): void => {
    navigate(route);
  };

  return (
    <>
      <header className={`header_area ${isCurrentRoute('/') ? 'header-home-page' : ''}`}>
        <div className="main_menu">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
              <a className="navbar-brand" onClick={() => navigateRoute('/')}><img src="/assets/images/logo.svg" alt="David Bradshaw Home" /></a>
              <button className="navbar-toggler" id="mobile-button" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                <ul className="nav navbar-nav menu_nav justify-content-end">
                  {routes.map(route => {
                    return (
                      <li key={route.path} className={`nav-item ${isCurrentRoute(route.path) ? 'active' : ''}`}>
                        <a className="nav-link" onClick={() => navigateRoute(route.path)}>
                          <span className="nav-text">{route.name}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <Banner currentRoute={getCurrentRoute()}/>
    </>
  );
}
