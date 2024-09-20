// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    return this.authService.isLoggedIn().pipe(
      map((checkVerify: boolean) => {
        if (checkVerify) {
          return true; // Token hợp lệ
        } else {
          // xử lý lấy refresh token
          this.authService.refreshAccessToken().subscribe((result) => {
            if (!result) {
              localStorage.removeItem('accessToken');
              this.router.navigate(['/login']); // Token không hợp lệ, điều hướng đến login
              return true;
            }
            console.log("result", result)
            return result;
          });
            return false;
        }
      }),
      catchError((error) => {
        console.error('Error verifying token', error);
        this.router.navigate(['/login']); // Xử lý lỗi và điều hướng đến login
        return of(false); // Trả về Observable<boolean> với giá trị false
      })
    );
}
}
