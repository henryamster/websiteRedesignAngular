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
import { MatSnackBarModule, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

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
import { BugReportComponent } from './common/dialog/bug-report/bug-report.component';
import { ProfileMenuComponent } from './common/profile-menu/profile-menu.component';

/** Emulator Providers */
import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/auth';
import { USE_EMULATOR as USE_DATABASE_EMULATOR } from '@angular/fire/database';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';
import { USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/functions';

/** Quill Import */
import { QuillModule } from 'ngx-quill';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ScrobblerComponent } from './thirdParty/scrobbler/scrobbler/scrobbler.component';
import { HttpClientModule } from '@angular/common/http';
import { BlogComponent } from './pages/blog/blog.component';


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
    BugReportComponent,
    ProfileMenuComponent,
    AboutComponent,
    DashboardComponent,
    ContactComponent,
    ScrobblerComponent,
    BlogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,

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
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatChipsModule,
    MatExpansionModule,
    MatStepperModule,
    MatSelectModule,
    MatSlideToggleModule,

    //Quill
    QuillModule.forRoot()
  ],
  providers: [ResponsiveService,

    { provide: PERSISTENCE, useValue: 'session' },
    // { provide: USE_STORAGE_EMULATOR, useValue: environment.useEmulators? ['localhost', ]},

    { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9099] : undefined },
    { provide: USE_DATABASE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9000] : undefined },
    { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8080] : undefined },
    { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['localhost', 5001] : undefined },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
