import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static login() {
    throw new Error('Method not implemented.');
  }

  constructor(private router: Router, private loginService: LoginService) {}
  

  login(data: {username: string, password: string}) {
    this.loginService.login(data).subscribe(
      (loginResult) => {
        if (!loginResult) {
        } else {
          // xử lý logic
          localStorage.setItem('accessToken', loginResult?.accessToken);
          console.log("________");
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        console.error('Login failed', error);
      }
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
