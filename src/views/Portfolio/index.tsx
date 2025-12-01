import './Portfolio.scss';
import { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import type { PortfolioItem } from '../../constants/models';
import Error from '../../components/Error';
import { useNavigate } from 'react-router';

export default function Portfolio(props: {limited?: boolean}) {
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');
  const [portfolioItems, setPortfolioItems] = useState([] as PortfolioItem[]);
  const [filter, setFilter] = useState('');

  const availableFilters = [
    {
      name: 'All',
      id: ''
    },
    {
      name: 'Design',
      id: 'design'
    },
    {
      name: 'Web',
      id: 'web'
    },
    {
      name: 'Applications',
      id: 'applications'
    },
    {
      name: 'Papers',
      id: 'papers'
    }
  ];

  useEffect(() => {
    fetch('/assets/api/portfolio-items.json')
      .then(response => response.json())
      .then(data => {
        setPortfolioItems(data);
        setStatus('ready');
      }).catch(error => {
        console.error('Portfolio: unable to get data', error);
        setStatus('error');
      });
  }, []);

  const portfolioItemVisible = (categories: string[]): boolean => {
    if (!filter) {
      return true;
    }

    if (Array.isArray(categories)) {
      return (categories.indexOf(filter) > -1);
    }

    return false;
  };

  const changeFilter = (newFilter: string): void => {
    setFilter(newFilter);
  };

  const changeRoute = (route: string): void => {
    navigate(route);
  };

  const getMainView = (): React.ReactNode => {
    switch (status) {
    case 'loading':
      return <Loading />;
    case 'error':
      return <Error mainText="Unable to get data" />;
    default:
      return (
        <>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {!props.limited && (<div className="projects_fillter">
                <ul className="filter list">
                  {availableFilters.map(filterItem => <li key={filterItem.id} className={`${filterItem.id === filter ? 'active' : ''}`} onClick={() => changeFilter(filterItem.id)}>{filterItem.name}</li>)}
                </ul>
              </div>)}
            </div>
          </div>
          <div className="projects_inner row grid">
            {portfolioItems.filter(item => portfolioItemVisible(item.category)).slice(0, props.limited ? 5 : undefined).map(item => {
              return (
                <div key={item.id} className={`grid-item brand ${item.gridSize}`}>
                  <a className="projects_item" onClick={() => changeRoute(`/portfolio/${item.id}`)}>
                    <img className="img-fluid w-100" src={item.imageUrl} alt={item.name} />
                    <div className="projects_text">
                      <h4>{item.name}</h4>
                      <p>{item.type}</p>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </>
      );
    }
  };

  return (
    <section className="section_gap portfolio_area" id="work">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <div className="main-title">
              <h1>{props.limited ? 'Latest works' : 'Portfolio items'}</h1>
              <p>
                <span>You can browse projects I have worked on below.</span>
                {!props.limited && <span> Filter by type to explore stuff I designed or programmed.</span>}
                <span> Click an item to view the full details of the project.</span>
                {props.limited && <span> Below are my most recent works, to view the entire portfolio visit the portfolio page.</span>}
              </p>
              {props.limited && <a onClick={() => changeRoute('/portfolio')} className="primary-btn top-space">View portfolio</a>}
            </div>
          </div>
        </div>
        {getMainView()}
      </div>
    </section>
  );
}
