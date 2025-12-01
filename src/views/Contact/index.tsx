import './Contact.scss';

export default function Contact() {
  return (
    <section className="contact_area section_gap">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="contact_info">
              <div className="info_item">
                <i className="fa fa-home"></i>
                <h6>Silicon Valley</h6>
                <p>Santa Clara</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="contact_info">
              <div className="info_item">
                <i className="fa fa-envelope"></i>
                <h6>Send a message</h6>
                <p>Send me an email or LinkedIn message</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="contact_info">
              <div className="info_item">
                <i className="fa fa-linkedin"></i>
                <h6>Connect on LinkedIn</h6>
                <p>Connect or message me via <a href="https://linkedin.com/in/davidbradshawus" target="_blank" title="LinkedIn">LinkedIn</a></p>
              </div>
            </div>
          </div>
        </div>
        <div className="mapBox">
          <div className="gmap_canvas">
            <iframe className="gmap_iframe" width="100%" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} src="https://maps.google.com/maps?output=embed&ll=37.397617,-121.960823&z=11"></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
