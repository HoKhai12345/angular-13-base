import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./_components/login/login.component";
import {DashboardComponent} from "./_components/dashboard/dashboard.component";
import {MainLayoutComponent} from "./components/main-layout/main-layout.component";
import { LoginGuard } from './auth/login-guard.service';
import { AuthGuard } from './auth/auth-guard.service';
import { UsersComponent } from './_components/users/users.component';
import {Error404Component} from "./components/404-error/404-error.component";
import { ChannelComponent } from './_components/channel/channel.component';
import {TaskListComponent} from "./_components/task/task-list/task-list.component";
import {TaskComponent} from "./_components/task/task.component";
import {ProductsComponent} from "./_components/products/products.component";
import {RoleGuard} from "./auth/role.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'error-404',
    component: Error404Component,
  },
  {
    path: 'admin',
    component: UsersComponent,
    data: {preload: true},
    canActivateChild: [AuthGuard, RoleGuard],
    children: [
      {
        path: 'user',
        component: UsersComponent,
        data: { preload: true },
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { preload: true },
        canActivate: [AuthGuard]
      },
      {
        path: 'user',
        component: UsersComponent,
        data: { preload: true },
        canActivate: [AuthGuard]
      },
      {
        path: 'channel',
        component: ChannelComponent,
        data: { preload: true },
        canActivate: [AuthGuard]
      },
      {
        path: 'task',
        component: TaskComponent,
        data: { preload: true },
        canActivate: [AuthGuard]
      },
      {
        path: 'products',
        component: ProductsComponent,
        data: { preload: true },
        // canActivate: [AuthGuard]
      }
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { preload: true },
    canActivate: [LoginGuard]
  },

  /**
   * Page 404
   */
  { path: '**', redirectTo: 'error-404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    //@ts-ignore
    relativeLinkResolution: 'legacy'
  })],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AppRoutingModule {
}
