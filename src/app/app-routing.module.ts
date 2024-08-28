import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./_components/login/login.component";
import {DashboardComponent} from "./_components/dashboard/dashboard.component";
import {MainLayoutComponent} from "./components/main-layout/main-layout.component";
import { LoginGuard } from './auth/login-guard.service';
import { AuthGuard } from './auth/auth-guard.service';
import { UsersComponent } from './_components/users/users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
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
  { path: '**', redirectTo: 'error/404.html' },
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
