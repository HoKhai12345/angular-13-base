import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../service/auth.service";
import {ROLES} from "../shared/global/global.constants";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivateChild {
  constructor(private router: Router, private authService: AuthService) {}

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userInfo = this.authService.getDecodedToken();
    let roleId: number;
    roleId = userInfo?.role?.id ?? 0;
    if (!roleId || roleId !== ROLES.ADMIN.ID) {
      this.router.navigate(['/404']);
      return false;
    }
    return true;
  }
}
