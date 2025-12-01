import React, { useEffect, useState, type MouseEvent } from 'react';
import './Resume.scss';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import type { AwardItem, EducationItem, ExperienceItem } from '../../constants/models';

export default function Resume() {
  const [status, setStatus] = useState('loading');
  const [experiences, setExperiences] = useState([] as ExperienceItem[]);
  const [showAllExperience, setShowAllExperience] = useState(false);
  const [educations, setEducations] = useState([] as EducationItem[]);
  const [showAllEducation, setShowAllEducation] = useState(false);
  const [certificates, setCertificates] = useState([] as EducationItem[]);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [awards, setAwards] = useState([] as AwardItem[]);
  const [showAllAwards, setShowAllAwards] = useState(false);

  useEffect(() => {
    const promises = [
      fetch('/assets/api/educations.json').then(response => response.json()).then(data => setEducations(data)),
      fetch('/assets/api/experiences.json').then(response => response.json()).then(data => setExperiences(data)),
      fetch('/assets/api/certificates.json').then(response => response.json()).then(data => setCertificates(data)),
      fetch('/assets/api/awards.json').then(response => response.json()).then(data => setAwards(data)),
    ];

    Promise.all(promises).then(() => {
      setStatus('ready');
    }).catch(error => {
      console.error('Resume: unable to get data', error);
      setStatus('error');
    });
  }, []);

  const getDateStringValue = (date: string): string => {
    return new Date(date).toLocaleDateString('en-us', {year: 'numeric', month: 'short'});
  };

  const getDateString = (startDate: string, endDate?: string|null): string => {
    return `${getDateStringValue(startDate)} - ${endDate ? getDateStringValue(endDate) : 'Present'}`;
  };

  const handleShowMore = (event: MouseEvent, callback: (value: boolean) => void): void => {
    event.preventDefault();
    callback(true);
  };

  const getEducationView = (title: string, items: EducationItem[], showAll: boolean, setShowCallback: (value: boolean) => void): React.ReactNode => {
    return (
      <div className="row justify-content-center resume-grouping">
        <div className="col-md-4 padded-right">
          <div className="section-title main-title">
            <h1>{title}</h1>
          </div>
        </div>
        <div className="col-md-8">
          {items.map((education, index) => {
            return (
              <div key={`${title}-${index}`}>
                <div className={`listing ${education.collapsed && !showAll ? 'collapsed-item' : ''}`}>
                  <div className="listing-title">
                    <span>{education.degree} {education.program ? 'in' : ''} {education.program}</span>
                    {!education.endDate && <i className="fa fa-asterisk listing-note" title="In progress"></i>}
                  </div>
                  <div className="listing-subtitle">{education.school}, {education.location}; {getDateString(education.startDate, education.endDate)}</div>
                  <div className="listing-description">{education.description}</div>
                </div>
              </div>
            );
          })}
          {!showAll && <a href="" onClick={event => handleShowMore(event, setShowCallback)}>Show more</a>}
        </div>
      </div>
    );
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
          <div className="row justify-content-center resume-grouping">
            <div className="col-md-4 padded-right">
              <div className="section-title main-title">
                <h1>Experience</h1>
              </div>
            </div>
            <div className="col-md-8">
              {experiences.map((experience, index) => {
                return (
                  <div key={`experience-${index}`}>
                    <div className={`listing ${experience.collapsed && !showAllExperience ? 'collapsed-item' : ''}`}>
                      <div className="listing-title">{experience.jobTitle}</div>
                      <div className="listing-subtitle">{experience.company}, {experience.location}; {getDateString(experience.startDate, experience.endDate)}</div>
                      {!!experience.roles && (
                        <div className="listing-roles">
                          {experience.roles.map((role, roleIndex) => <div key={`experience-role-${roleIndex}`} className="listing-roles--item">{getDateString(role.startDate, role.endDate)} &mdash; {role.jobTitle}</div>)}
                        </div>
                      )}
                      <div className="listing-description">{experience.description}</div>
                    </div>
                  </div>
                );
              })}
              {!showAllExperience && <a href="" onClick={event => handleShowMore(event, setShowAllExperience)}>Show more</a>}
            </div>
          </div>
          {getEducationView('Education', educations, showAllEducation, setShowAllEducation)}
          {getEducationView('Certificates', certificates, showAllCertificates, setShowAllCertificates)}

          <div className="row justify-content-center resume-grouping">
            <div className="col-md-4 padded-right">
              <div className="section-title main-title">
                <h1>Awards</h1>
              </div>
            </div>
            <div className="col-md-8">
              {awards.map((award, index) => {
                return (
                  <div key={`award-${index}`}>
                    <div className={`listing ${award.collapsed && !showAllAwards ? 'collapsed-item' : ''}`}>
                      <div className="listing-title">
                        <span>{award.name}</span>
                      </div>
                      <div className="listing-subtitle">{award.issuer}, {award.location}; {getDateStringValue(award.issueDate)}</div>
                      <div className="listing-description">{award.description}</div>
                    </div>
                  </div>
                );
              })}
              {!showAllAwards && <a href="" onClick={event => handleShowMore(event, setShowAllAwards)}>Show more</a>}
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <section className="section_gap resume_area" id="resume">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <div className="main-title">
              <h1>My Résumé</h1>
              <p>
                My most recent education and job experiences are listed here chronologically and you can also download a PDF version if you prefer.
                <br />
                <br />
              </p>
              <a href="/assets/documents/David Bradshaw Resume.pdf" target="_blank" className="primary-btn">Download résumé</a>
            </div>
          </div>
        </div>
        <div className="resume_content">{getMainView()}</div>
      </div>
    </section>
  );
}
