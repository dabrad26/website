export class NavItem {
  name: string;
  link: string;
}

export class FilterItem {
  name: string;
  id: string;
}

export class PortfolioItem {
  name: string;
  id: string;
  type: string;
  gridSize: string;
  category: Array<'design'|'web'|'mobile'|'desktop'>;
  imageUrl: string;
}

export class EducationItem {
  school: string;
  degree: string;
  program: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string|null;
  displayDateString?: string;
}

export class ExperienceItem {
  company: string;
  jobTitle: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string|null;
  displayDateString?: string;
}

export class TestimonialItem {
  quote: string;
  entity: {
    name: string;
    url?: string;
    imageUrl: string;
  };
  dateCreated: string;
}
