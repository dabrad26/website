import { useEffect } from 'react';
import './About.scss';
import { useNavigate } from 'react-router';

let imageNumber = 1;

export default function About() {
  const navigate = useNavigate();

  useEffect(() => {
    imageNumber = Math.floor(Math.random() * 3);
  }, []);

  const openResume = (): void => {
    navigate('/resume');
  };

  return (
    <section className="about-area section_gap gray-bg">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-5 about-left">
            <img className="img-fluid" src={`/assets/images/david-about${imageNumber}.png`} alt="David Bradshaw" />
          </div>
          <div className="col-lg-6 col-md-12 about-right">
            <div className="main-title text-left">
              <h1>About me</h1>
            </div>
            <div className="mb-50">
              <p>
              My name is David Bradshaw and I am passionate about creating amazing user interfaces!
              My background is in Computer Science but after working on web UIs for several years
              I have fallen in love with design.
                <br />
                <br />
              I try to blend together the best of both worlds of coding enterprise level web applications
              while working closely on the experience of the user and visuals.  I am always trying to
              improve all my skills and consider my self a lifelong learner!
              </p>
            </div>
            <div className="main-title text-left">
              <h1>What I do</h1>
            </div>
            <div className="mb-50">
              <p>
              I currently work on enterprise level web applications with a focus on creating components and
              libraries that facilitate growth and safe coding. I also work closely with UX to ensure that
              all applications are user friendly, engaging, and accessible to all. I consider myself a UI and
              UX Engineer providing a design-centric approach to programming user interfaces.
              </p>
            </div>
            <a onClick={openResume} className="primary-btn">View my résumé</a>
          </div>
        </div>
      </div>
    </section>
  );
}
