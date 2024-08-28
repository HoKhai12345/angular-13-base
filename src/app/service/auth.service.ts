import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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


  logout() {
    localStorage.removeItem('accessToken'); // Xóa khỏi local storage
    this.router.navigate(['/login']); // Điều hướng đến trang login khi đăng xuất
  }

  isLoggedIn() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // this.router.navigate(['/dashboard']);
      return true; // Prevent access to the login route
    }
    return false; // Allow access to the login route
    // return this.loggedIn;
  }
}
