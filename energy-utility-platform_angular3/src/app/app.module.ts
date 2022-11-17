import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { DataTablesModule } from 'angular-datatables';
import { NgChartjsModule } from 'ng-chartjs';
import { ResetEmailComponent } from './reset-email/reset-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HighchartsChartModule} from 'highcharts-angular'
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UserPageComponent,
    AdminPageComponent,
    LoginPageComponent,
    SigninPageComponent,
    NavbarComponent,
    ResetEmailComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    HighchartsChartModule,
    ReactiveFormsModule,
    NgChartsModule,
    DataTablesModule,
    NgChartjsModule.registerPlugin([])
  ],
  providers: [],
  bootstrap:[AppComponent]
})
export class AppModule { }
