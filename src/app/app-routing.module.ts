
// Angular Imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// AngularFire Imports
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

// Components
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NavListComponent } from './common/nav-list/nav-list.component';

const unauthorizedRedirect = () => redirectUnauthorizedTo(['login'])
const adminAccess = () => hasCustomClaim('admin')
const loginRedirect = () => redirectLoggedInTo(['dashboard']);


const routes: Routes = [
{path:'', component: LoginComponent,

},
  {path:'login',
  component: LoginComponent,
  canActivate:[AngularFireAuthGuard],
  data: {authGuardPipe: loginRedirect}},
  {path:'admin', component: NavListComponent,
  canActivate: [AngularFireAuthGuard],
  data: {authGuardPipe: adminAccess && unauthorizedRedirect}
  },
  {path:'**', component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
