import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ResetEmailComponent } from './reset-email/reset-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes = [
  
  { path: '', component: HomePageComponent },  
{ path: 'home', component: HomePageComponent },
{ path: 'user', component: UserPageComponent },
{ path: 'admin', component: AdminPageComponent },
{ path: 'login', component: LoginPageComponent },
{ path: 'signin', component: SigninPageComponent },
{ path: 'reset_email', component: ResetEmailComponent },
{ path: 'reset_password/:id', component: ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
