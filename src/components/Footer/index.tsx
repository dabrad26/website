import './Footer.scss';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer_area section_gap">
      <div className="container">
        <div className="row footer_inner justify-content-center">
          <div className="col-lg-6 text-center">
            <aside className="f_widget social_widget">
              <div className="f_logo">
                <img src="/assets/images/logo.svg" alt="David Bradshaw" />
              </div>
              <div className="f_title">
                <h4>Follow me</h4>
              </div>
              <ul className="list">
                <li><a href="https://linkedin.com/in/davidbradshawus" target="_blank" title="LinkedIn"><i className="fa fa-linkedin"></i></a></li>
                <li><a href="https://instagram.com/dabrad26" target="_blank" title="Instagram"><i className="fa fa-instagram"></i></a></li>
                <li><a href="https://github.com/dabrad26" target="_blank" title="Github"><i className="fa fa-github"></i></a></li>
              </ul>
            </aside>
            <div className="copyright">
              <p>
              Copyright &copy;{currentYear} David Bradshaw. All rights reserved.<br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
