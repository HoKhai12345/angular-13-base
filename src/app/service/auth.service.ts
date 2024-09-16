import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private refreshTokenInProgress = false;

  static login() {
    throw new Error('Method not implemented.');
  }

  constructor(private router: Router, private loginService: LoginService) {}
  

  login(data: { username: string; password: string }): Observable<boolean> {
    return this.loginService.login(data).pipe(
      tap((loginResult) => {
        if (loginResult) {
          // Xử lý logic khi đăng nhập thành công
          localStorage.setItem('accessToken', loginResult.accessToken);
          localStorage.setItem('refreshToken', loginResult.refreshToken);
          this.router.navigate(['/dashboard']);
        }
      }),
      map((loginResult) => !!loginResult), // Trả về true nếu loginResult tồn tại, ngược lại là false
      catchError((error) => {
        console.error('Đăng nhập thất bại', error);
        return of(false); // Trả về false nếu có lỗi xảy ra
      })
    );
  }

  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  isAuthenticated(): Observable<boolean> {
    return this.isLoggedIn();
  }

  refreshAccessToken(): Observable<any> {
    if (this.refreshTokenInProgress) {
      return throwError(() => new Error('Refresh in progress'));
    }

    this.refreshTokenInProgress = true;
    return this.loginService.refreshAccessToken({token: this.getRefreshToken()}).pipe(
      tap((result) => {
        if (result) {
          this.setTokens(result.accessToken, this.getRefreshToken()!);
          this.refreshTokenInProgress = false;  
          return result.accessToken;
        }
      }),
      map((loginResult) => !!loginResult), // Trả về true nếu loginResult tồn tại, ngược lại là false
      catchError((error) => {
        this.logout();
        return throwError(() => new Error('Session expired, please log in again.'));
      })
    );
  }


  logout() {
    localStorage.removeItem('accessToken'); // Xóa khỏi local storage
    this.router.navigate(['/login']); // Điều hướng đến trang login khi đăng xuất
  }
 
  isLoggedIn():any {
    const token = localStorage.getItem('accessToken') ?? null;
    if (!token) {
        return of (false)
    }
   return this.loginService.checkVerifyToken(token).pipe(
    tap((checkToken) => {
      if (checkToken.status === 1) {
      }
    }),
    map((checkToken) => !!checkToken),
    catchError((error) => {
      console.error('Check token thất bại', error);
      return of(false);
    })
   )
  }

  isLoggedInLoginCheck():any {
    const token = localStorage.getItem('accessToken') ?? null;
    if (!token) {
        return of (true)
    }
   return this.loginService.checkVerifyToken(token).pipe(
    tap((checkToken) => {
      if (checkToken.status === 1) {
      }
    }),
    map((checkToken) => !!checkToken.status),
    catchError((error) => {
      console.error('Check token thất bại', error);
      return of(false);
    })
   )
  }
}
