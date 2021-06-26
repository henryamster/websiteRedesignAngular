export interface INavBarLink {
  link: string;
  adminOnly: boolean;
  anonymousAccess: boolean;
}
export class NavBarLink implements INavBarLink {
  link: string;
  adminOnly: boolean;
  anonymousAccess: boolean;
  constructor(link:string='test',
              adminOnly:boolean = true,
              anonymousAccess:boolean = false){
    [this["link"], this["adminOnly"], this["anonymousAccess"]]
    =
    [link, adminOnly, anonymousAccess]
  }

}
