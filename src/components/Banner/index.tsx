import { useEffect, useState } from 'react';
import type { RouteType } from '../../constants/routes';
import './Banner.scss';
import { useLocation, useNavigate } from 'react-router';

export default function Banner(props: {currentRoute: RouteType, imageNumber: number}) {
  const [pageHeight, setPageHeight] = useState(window.innerHeight);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const resizeEvent = () => {
      setPageHeight(window.innerHeight);
    };

    window.addEventListener('resize', resizeEvent);

    return () => {
      window.removeEventListener('resize', resizeEvent);
    };
  }, []);

  const scrollDown = (): void => {
    const image = document.querySelector('#fullscreen-image');

    if (image) {
      window.scrollTo({
        top: image.clientHeight - 20,
        behavior: 'smooth'
      });
    }
  };

  const clickableTitle = location.pathname !== props.currentRoute.path;

  if (props.currentRoute.path === '/') {
    return (
      <section className="banner-area owl-carousel" id="home">
        <div className={`single_slide_banner slide_bg image-${props.imageNumber}`}>
          <div className="container">
            <div className="row fullscreen d-flex align-items-center" id="fullscreen-image" style={{height: `${pageHeight}px`}}>
              <div className="banner-content col-lg-12 justify-content-center">
                <h1>David Bradshaw</h1>
                <h3>Software Engineer and UX Designer</h3>
                <a onClick={scrollDown} className="primary-btn">
                  <i className="fa fa-arrow-down" style={{marginRight: '5px'}}></i>
                  Learn more
                  <i className="fa fa-arrow-down" style={{marginLeft: '5px'}}></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
          <div className="container">
            <div className="banner_content text-right">
              <h1>{clickableTitle ? <a onClick={() => navigate(props.currentRoute.path)}>{props.currentRoute.name}</a> : props.currentRoute.name}</h1>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
