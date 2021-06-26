import {NavBarLink} from './../generics/nav-bar-link';
export const ABOUT = new NavBarLink(
  `about`,
  false,
  true
);
export const CONTACT = new NavBarLink(
  `contact`,
  false,
  true
);
export const BLOG = new NavBarLink(
  `blog`,
  false,
  true
);
export const GALLERY = new NavBarLink(
  'gallery',
  false,
  true
);
export const LOGIN = new NavBarLink(
  `login`,
  false,
  true
);
export const LOGOUT = new NavBarLink(
  `logout`,
  false,
  false
);
export const POST = new NavBarLink(
  `post`,
  true,
  false
);
export const DASHBOARD = new NavBarLink(
  'admin',
  true,
  false
);
