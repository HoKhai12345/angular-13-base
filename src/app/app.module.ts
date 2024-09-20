import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {LoginComponent} from "./_components/login/login.component";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MainLayoutComponent} from "./components/main-layout/main-layout.component";
import {SiteFooterComponent} from "./components/site-footer/site-footer.component";
import {SiteHeaderComponent} from "./components/size-header/site-header.component";
import {DashboardComponent} from "./_components/dashboard/dashboard.component";
import { SiteNavbarComponent } from './components/site-navbar/site-navbar.component';
import { AuthInterceptorInterceptor } from './interceptor/auth-interceptor.interceptor';
import { LoaderInterceptor } from './interceptor/loader.interceptor';
import { LoaderComponent } from './components/loader/loader.component';
import { UsersComponent } from './_components/users/users.component';
import {Error404Component} from "./components/404-error/404-error.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainLayoutComponent,
    SiteFooterComponent,
    SiteHeaderComponent,
    DashboardComponent,
    SiteNavbarComponent,
    LoaderComponent,
    UsersComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
