import './PortfolioItem.scss';
import { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import type { PortfolioEntry, PortfolioItem } from '../../constants/models';
import Error from '../../components/Error';
import { useParams } from 'react-router';

export default function PortfolioItem() {
  const {id} = useParams();
  const [status, setStatus] = useState('loading');
  const [portfolioData, setPortfolioData] = useState(undefined as PortfolioEntry|undefined);
  const [htmlData, setHtmlData] = useState(undefined as string|undefined);

  useEffect(() => {
    fetch(`/assets/api/portfolio-items/${id}.json`)
      .then(response => response.json())
      .then((data: PortfolioEntry) => {
        setPortfolioData(data);
        document.title = `${data.name} - Portfolio - David Bradshaw`;

        if (data.useHtmlVersion) {
          return fetch(`/assets/api/html/${id}.html`)
            .then(response => response.text())
            .then(response => {
              setHtmlData(response);
              setStatus('html');
            });
        } else {
          setStatus('ready');
        }
      }).catch(error => {
        console.error('PortfolioItem: unable to get data', error);
        setStatus('error');
      });
  }, []);

  const isQuickFactUrl = (key: string): boolean =>  {
    if (!portfolioData || !portfolioData.quickFacts) {
      return false;
    }

    const item = portfolioData.quickFacts[key];

    return (typeof item === 'string' && item.indexOf('http') === 0);
  };

  const shareText = `Checkout ${portfolioData?.name} from David Bradshaw's portfolio!`;
  const shareBodyText = `${shareText}\n\n${location.href}`;


  const shareEmail = (): void => {
    window.open(`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareBodyText)}`);
  };

  const copy = (): void => {
    const clipboardItemData = {
      ['text/plain']: shareBodyText,
    };
    const clipboardItem = new ClipboardItem(clipboardItemData);
    navigator.clipboard.write([clipboardItem]).catch(error => {
      console.error('Unable to write to clipboard', error);
    });
  };

  const quickFactKeys = Object.keys(portfolioData?.quickFacts || {});

  const getMainView = (): React.ReactNode => {
    switch (status) {
    case 'loading':
      return <Loading />;
    case 'error':
      return <Error mainText="Unable to get data" />;
    case 'html':
      return <div id="html-inject-point" className="injected-portfolio-item" dangerouslySetInnerHTML={{ __html: htmlData || '' }} ></div>;
    default:
      return portfolioData ? (
        <>
          <div className="portfolio_details_inner">
            <div className="row">
              <div className="col-md-6">
                <div className="left_img">
                  <img className="img-fluid" src={portfolioData.imageUrl} alt={portfolioData.name} />
                </div>
              </div>
              <div className="offset-md-1 col-md-5">
                <div className="portfolio_right_text mt-30">
                  <h4>{portfolioData.name}</h4>
                  <p>{portfolioData.shortDescription}</p>
                  {quickFactKeys.length && (
                    <ul className="list list-quick-facts">
                      {quickFactKeys.map((key, index) => {
                        return portfolioData && portfolioData.quickFacts ? (
                          <li key={`quick-fact-${index}`}>
                            <span className="label">{key}:</span>
                            <span className="data">
                              {(key === 'URL' || isQuickFactUrl(key)) ? <a href={portfolioData.quickFacts[key] as string} target="_blank">{portfolioData.quickFacts[key]}</a> : portfolioData.quickFacts[key]}
                            </span>
                          </li>
                        ) : null;
                      })}
                    </ul>
                  )}
                  <ul className="list social_details">
                    <h5>Share this item</h5>
                    <li><a onClick={copy}><i className="fa fa-clipboard"></i></a></li>
                    <li><a onClick={shareEmail}><i className="fa fa-envelope"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              {!!portfolioData.projectLinks?.length && (
                <div className="col-lg-3 project-links">
                  <h5>Project links</h5>
                  <ul>
                    {portfolioData.projectLinks.map((link, linkIndex) => <li key={`project-links-${linkIndex}`}><a href={link.link} target="_blank">{link.name}</a></li>)}
                  </ul>
                </div>
              )}
              <div className={`col-lg-${portfolioData.projectLinks ? '9' : '12'}`}>
                <p className="long-description">{portfolioData.longDescription}</p>
              </div>
            </div>
            <div className="row">
              {!!portfolioData.projectImages?.length && (
                <div className="col-sm-12 project-images">
                  <h5>Project images</h5>
                  <div className="project-images-wrapper">
                    {portfolioData.projectImages.map((image, index) => {
                      return (
                        <div key={`image-${index}`} className="project-image-image">
                          <h6>{image.name}</h6>
                          <img className="img-fluid" src={image.url} alt={image.name} title={image.name} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : null;
    }
  };

  return (
    <section className="portfolio_details_area section_gap">
      <div className="container">
        {getMainView()}
      </div>
    </section>
  );
}
