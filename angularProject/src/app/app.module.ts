import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { RequestListComponent } from './request-list/request-list.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';
import { AddPostComponent } from './add-post/add-post.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

import { NotificationComponent } from './notification/notification.component';
import { MatIconModule } from '@angular/material/icon';
import { ProtectionGuard } from './protection.guard';

import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ProviderListComponent,
    RequestListComponent,
    PostDetailComponent,
    UserDetailComponent,
    MyProfileComponent,
    EditPostComponent,
    EditProfileComponent,
    EditCommentComponent,
    AddPostComponent,
    LoginComponent,
    SignupComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatBadgeModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      {
        path: 'requests',
        component: RequestListComponent,
        canActivate: [ProtectionGuard],
      },
      {
        path: 'providers',
        component: ProviderListComponent,
        canActivate: [ProtectionGuard],
      },
      {
        path: 'post/:id',
        component: PostDetailComponent,
        canActivate: [ProtectionGuard],
      },
      { path: 'post/:id/edit', component: EditPostComponent },
      {
        path: 'post/:id/comment/:comid/edit',
        component: EditCommentComponent,
        canActivate: [ProtectionGuard],
      },

      {
        path: 'user/:id',
        component: UserDetailComponent,
        canActivate: [ProtectionGuard],
      },
      {
        path: 'profile',
        component: MyProfileComponent,
        canActivate: [ProtectionGuard],
      },
      {
        path: 'profile/edit',
        component: EditProfileComponent,
        canActivate: [ProtectionGuard],
      },

      {
        path: 'post',
        component: AddPostComponent,
        canActivate: [ProtectionGuard],
      },
      {
        path: 'notification',
        component: NotificationComponent,
        canActivate: [ProtectionGuard],
      },
    ]),
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
