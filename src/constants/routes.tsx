import type React from 'react';
import Home from '../views/Home';
import About from '../views/About';
import Resume from '../views/Resume';
import Portfolio from '../views/Portfolio';
import Contact from '../views/Contact';

export interface RouteType {
  name: string;
  path: string;
  component: React.ReactNode;
}

export const routes: RouteType[] = [
  {name: 'Home', path: '/', component: <Home />},
  {name: 'About me', path: '/about', component: <About />},
  {name: 'Résumé', path: '/resume', component: <Resume />},
  {name: 'Portfolio', path: '/portfolio', component: <Portfolio />},
  {name: 'Contact', path: '/contact', component: <Contact />},
];
