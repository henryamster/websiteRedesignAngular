export interface INavBarLink {
  link: string;
  adminOnly: boolean;
  anonymousAccess: boolean;
}
export class NavBarLink implements INavBarLink {
  link: string;
  adminOnly: boolean;
  anonymousAccess: boolean;
  loggedIn:boolean
  constructor(link:string='test',
              adminOnly:boolean = true,
              anonymousAccess:boolean = false,
              loggedIn:boolean=true){
    [this["link"], this["adminOnly"], this["anonymousAccess"], this["loggedIn"]]
    =
    [link, adminOnly, anonymousAccess, loggedIn]
  }

}
