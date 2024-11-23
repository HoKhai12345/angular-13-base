import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../service/auth.service";
import {JwtPayload} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivateChild {
  constructor(private router: Router, private authService: AuthService) {}

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let userInfo: JwtPayload | null = this.authService.getDecodedToken();
    // let roleId: any;
    // roleId = userInfo??.id ?? 0;
    const roleId = 1;
    console.log("roleId", userInfo);
    if (roleId === 1) {
      return true;
    } else {
      this.router.navigate(['/404']);
      return false;
    }
  }


}
