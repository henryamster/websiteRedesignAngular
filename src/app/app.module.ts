/* Angular imports */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

/* Libraries */
import { AngularFireModule } from '@angular/fire';

/* Created Components*/
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BlogPostComposerComponent } from './blog/blog-post-composer/blog-post-composer.component';
import { BlogCommentComposerComponent } from './blog/blog-comment-composer/blog-comment-composer.component';
import { BlogPostComponent } from './blog/blog-post/blog-post.component';
import { BlogCommentComponent } from './blog/blog-comment/blog-comment.component';
import { BlogPostListComponent } from './blog/blog-post-list/blog-post-list.component';
import { BlogPostSingleComponent } from './blog/blog-post-single/blog-post-single.component';
import { BlogCommentListComponent } from './blog/blog-comment-list/blog-comment-list.component';
import { BlogComponent } from './pages/blog/blog.component';
import { PostComponent } from './thirdParty/instagram/post/post.component';
import { GalleryComponent } from './pages/gallery/gallery.component';

/** Main Components */
import { MainComponent } from './main/main.component';

/** Common Components */
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { NavListComponent } from './common/nav-list/nav-list.component';
import { LogTemplateComponent } from './common/snackBar/log-template/log-template.component';
import { PageHeaderComponent } from './common/page-header/page-header.component';

/** Brand Components */
import { BrandLogoComponent } from './brand/brand-logo/brand-logo.component';

/** Common Services */
import { ResponsiveService } from './generic/responsive.service';

/** Auth Components */
import { LoginFormComponent } from './auth/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';

/** Admin Components */
import { BugReportListComponent } from './admin/bugReport/bug-report-list/bug-report-list.component';
import { BugReportItemComponent } from './admin/bugReport/bug-report-item/bug-report-item.component';
import { InquiryListComponent } from './admin/inquiry/inquiry-list/inquiry-list.component';
import { InquiryItemComponent } from './admin/inquiry/inquiry-item/inquiry-item.component';


/** Firebase Services */
import { PERSISTENCE } from '@angular/fire/auth';
import { BugReportComponent } from './common/dialog/bug-report/bug-report.component';
import { ProfileMenuComponent } from './common/profile-menu/profile-menu.component';

/** Emulator Providers */
import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/auth';
import { USE_EMULATOR as USE_DATABASE_EMULATOR } from '@angular/fire/database';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';
import { USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/functions';

/** Third Party */
import { QuillModule } from 'ngx-quill';
import { ScrobblerComponent } from './thirdParty/scrobbler/scrobbler/scrobbler.component';
import { CodepenComponent } from './thirdParty/codepen/codepen.component';
import { YoutubeComponent } from './thirdParty/youtube/youtube.component';
import { FacebookLikeComponent } from './thirdParty/facebook-like/facebook-like.component';
import { FeedComponent } from './thirdParty/instagram/feed/feed.component';





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
    FacebookLikeComponent,
    FeedComponent,
    PostComponent,
    GalleryComponent,
    BugReportListComponent,
    BugReportItemComponent,
    InquiryListComponent,
    InquiryItemComponent,
    PageHeaderComponent,
    BlogPostComponent,
    BlogCommentComponent,
    BlogPostListComponent,
    BlogPostSingleComponent,
    BlogCommentListComponent,
    CodepenComponent,
    YoutubeComponent,
    BlogPostComposerComponent,
    BlogCommentComposerComponent,

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
    MatDatepickerModule,
   MatNativeDateModule,
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
