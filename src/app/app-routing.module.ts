
// Angular Imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// AngularFire Imports
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

// Components
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NavListComponent } from './common/nav-list/nav-list.component';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BlogComponent } from './pages/blog/blog.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { BlogPostSingleComponent } from './blog/blog-post-single/blog-post-single.component';
import { ShortComponent } from './pages/short/short.component';
import { BlogTaggedComponent } from './blog/blog-tagged/blog-tagged.component';
import { LandingComponent } from './pages/landing/landing.component';

const unauthorizedRedirect = () => redirectUnauthorizedTo(['login'])
const adminAccess = () => hasCustomClaim('admin')
// const loginRedirect = () => redirectLoggedInTo(['about']);


const routes: Routes = [
{path:'', component: LoginComponent,

},
  {path:'login',
  component: LoginComponent,
  // canActivate:[AngularFireAuthGuard],
  // data: {authGuardPipe: loginRedirect}
},
  {
    path:'about', component:AboutComponent

  },
  {path:'dashboard', component: DashboardComponent,
  // ...canActivate(adminAccess), ...unauthorizedRedirect()
  canActivate: [AngularFireAuthGuard],
  data: {authGuardPipe: adminAccess && unauthorizedRedirect}

  },
  {
    path:'contact', component: ContactComponent
  },
  {
    path:'blog', component: BlogComponent
  },
  {
    path:'post/:slug', component: BlogPostSingleComponent
  },
  {
    path:'gallery', component: GalleryComponent
  },
  {
    path: 'short/:slug', component: ShortComponent
  },
  {
    path: 'post/tagged/:tag', component: BlogTaggedComponent
  },
  {
    path: 'landing', component: LandingComponent
  },
  {path:'**', component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
