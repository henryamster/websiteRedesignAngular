/* Angular imports */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';

/* Routing and root component */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Material Components*/
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card/';
import { MatSnackBarModule, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar'

/* Libraries */
import { AngularFireModule } from '@angular/fire';

/* Created Components*/

/** Main Components */
import { MainComponent } from './main/main.component';

/** Common Components */
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { NavListComponent } from './common/nav-list/nav-list.component';
import { LogTemplateComponent } from './common/snackBar/log-template/log-template.component';

/** Brand Components */
import { BrandLogoComponent } from './brand/brand-logo/brand-logo.component';

/** Common Services */
import { ResponsiveService } from './generic/responsive.service';

/** Auth Components */
import { LoginFormComponent } from './auth/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';


/** Firebase Services */
import { PERSISTENCE } from '@angular/fire/auth';




@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    BrandLogoComponent,
    NavListComponent,
    LoginFormComponent,
    NotFoundComponent,
    LoginComponent,
    LogTemplateComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,

    //Firebase
    AngularFireModule.initializeApp(environment.firebase),

    // Material
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [ResponsiveService,

    { provide: PERSISTENCE, useValue: 'session' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
