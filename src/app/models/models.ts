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
