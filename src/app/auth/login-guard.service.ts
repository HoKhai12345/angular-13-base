// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    return this.authService.isLoggedInLoginCheck().pipe(
      map((checkVerify: boolean) => {
        if (checkVerify) {
          return true; // Token hợp lệ
        } else {
          this.router.navigate(['/dashboard']); // Token không hợp lệ, điều hướng đến login
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
