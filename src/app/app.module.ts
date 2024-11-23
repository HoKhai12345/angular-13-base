import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
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
import { ChannelComponent } from './_components/channel/channel.component';
import { authReducer } from 'src/store/reducers/auth.reducer';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ButtonComponent } from './shared/common/button/button.component';
import { SubChannelComponent } from './_components/channel/sub-channel/sub-channel.component';
import {MatCardModule} from "@angular/material/card";
import { TestStringComponent } from './_components/test-string/test-string.component';
import { TestColumnComponent } from './_components/test-column/test-column.component';
import { TestTableComponent } from './_components/test-table/test-table.component';
import { TaskFormComponent } from './_components/task/task-form/task-form.component';
import { TaskListComponent } from './_components/task/task-list/task-list.component';
import {TaskComponent} from "./_components/task/task.component";
import { ProductsComponent } from './_components/products/products.component';
import { ModalComponent } from './components/modal/modal.component';
import { CreateProductComponent} from './_components/products/dialog/create/create.component';
import { DynamicModalComponent } from './components/dynamic-modal/dynamic-modal.component';
import { BaseComponent } from './components/base-component/base-component.component';
import {MatDialogModule} from "@angular/material/dialog";
import { UserInfoDialogComponent } from './components/dialog/user-info/user-info.component';

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
    Error404Component,
    ChannelComponent,
    AlertsComponent,
    ButtonComponent,
    SubChannelComponent,
    TestStringComponent,
    TestColumnComponent,
    TestTableComponent,
    TaskComponent,
    TaskFormComponent,
    TaskListComponent,
    ProductsComponent,
    ModalComponent,
    CreateProductComponent,
    DynamicModalComponent,
    BaseComponent,
    UserInfoDialogComponent
  ],
    imports: [
        BrowserModule,
        RouterModule,
        MatDialogModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatButtonModule,
        MatInputModule,
        StoreModule.forRoot({auth: authReducer}),
        MatCardModule
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
