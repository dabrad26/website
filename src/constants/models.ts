export interface NavItem {
  name: string;
  link: string;
}

export interface FilterItem {
  name: string;
  id: string;
}

export interface PortfolioItem {
  name: string;
  id: string;
  type: string;
  gridSize: string;
  category: ('design'|'web'|'applications'|'papers')[];
  imageUrl: string;
  hidden?: boolean;
}

export interface EducationItem {
  school: string;
  degree: string;
  program?: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string|null;
  collapsed?: boolean;
  link?: string;
}

export interface ExperienceItem {
  company: string;
  jobTitle: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string|null;
  collapsed?: boolean;
  roles?: [
    {
      jobTitle: string;
      startDate: string;
      endDate?: string;
    }
  ];
}

export interface AwardItem {
  name: string;
  issuer: string;
  location: string;
  issueDate: string;
  description: string;
  collapsed?: boolean;
}

export interface PortfolioEntry {
  id: string;
  name: string;
  imageUrl: string;
  shortDescription: string;
  longDescription: string;
  quickFacts?: {[key: string]: string|number};
  useHtmlVersion?: boolean;
  projectLinks?: {name: string; link: string}[];
  projectImages?: {name: string; url: string}[];
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}
