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

export class PortfolioEntry {
  id: string;
  name: string;
  imageUrl: string;
  shortDescription: string;
  longDescription: string;
  quickFacts?: any;
  projectLinks?: Array<{name: string, link: string}>;
  projectImages?: Array<{name: string, url: string}>;
}

export class ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}
