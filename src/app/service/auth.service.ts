import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginService } from './login/login.service';
import { loginFailure, loginSuccess } from '../../store/actions/auth.actions';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

interface Result {
  status: number,
  message: string,
  data: any
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private refreshTokenInProgress = false;

  static login() {
    throw new Error('Method not implemented.');
  }

  constructor(private router: Router, private loginService: LoginService, private store: Store<{auth: { showLoginPopup: boolean }}>) {}


  login(dataLogin: { username: string; password: string }): Observable<Result | null> {
    return this.loginService.login(dataLogin).pipe(
      tap((result) => {
        console.log("_)_____________________", result);
        if (result.status === 1) {
        // Xử lý logic khi đăng nhập thành công
        result.data?.accessToken ? localStorage.setItem('accessToken', result.data.accessToken) : '';
        result.data?.refreshToken ? localStorage.setItem('refreshToken', result.data.refreshToken) : '';
        }
      }),
      map((result) => result), // Trả về true nếu loginResult tồn tại, ngược lại là false
      catchError((error) => {
        console.error('Đăng nhập thất bại', error);
        return of(null);
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

  refreshAccessToken(): Observable<any> {
    if (this.refreshTokenInProgress) {
      return throwError(() => new Error('Refresh in progress'));
    }

    this.refreshTokenInProgress = true;
    return this.loginService.refreshAccessToken({refreshToken: this.getRefreshToken()}).pipe(
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
    this.loginService.logout(this.getRefreshToken()).subscribe((result) => {
        console.log("result", result);
        if (result?.status === 1) {
          localStorage.removeItem('accessToken'); // Xóa khỏi local storage
          this.router.navigate(['/login']); // Điều hướng đến trang login khi đăng xuất
        }
    })
  }

  isLoggedIn():any {
    const token = localStorage.getItem('accessToken') ?? null;
    if (!token) {
        return of (false)
    }
   return this.loginService.checkVerifyToken(token).pipe(
    tap((checkToken) => {
      if (checkToken.code === 403 || checkToken.status === 1) {console.log("vào đây");
         return of (checkToken)
      }
      return of (false)
    }),
    // map((checkToken) => !!checkToken),
    catchError((error) => {
      console.error('Check token thất bại', error);
      return of(false);
    })
   )
  }

  isLoggedInLoginCheck():any  {
    const token = localStorage.getItem('accessToken') ?? null;
    if (!token) {
        return of (true)
    }
   return this.loginService.checkVerifyToken(token).pipe(
    map((result: any) => {
      return result.status !== 1;
    }),
    catchError((error) => {
      console.error("Error verifying token", error);
      return of(false); // Return false in case of error
    })
  );
  }
}
