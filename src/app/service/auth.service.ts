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

  private loggedIn = false;

  constructor(private router: Router, private loginService: LoginService) {}
  

  login(data: {username: string, password: string}) {
    this.loginService.login(data).subscribe(
      (loginResult) => {
        console.log("loginResult", loginResult);
        if (!loginResult) {
          this.loggedIn = false;
        } else {
          // xử lý logic
          localStorage.setItem('accessToken', loginResult?.accessToken);
          this.loggedIn = true;
          console.log("VOOOOOO");
          this.router.navigate(['/dashboard']); // Điều hướng đến trang dashboard sau khi đăng nhập thành công
        }
      },
      (error) => {
        console.error('Login failed', error);
        this.loggedIn = false;
      }
    );
  }


  logout() {
    localStorage.removeItem('accessToken'); // Xóa khỏi local storage
    this.loggedIn = false;
    this.router.navigate(['/login']); // Điều hướng đến trang login khi đăng xuất
  }

  isLoggedIn() {
    // const token = localStorage.getItem('accessToken');
    // if (token) {
    //   this.router.navigate(['/dashboard']);
    //   return false; // Prevent access to the login route
    // }
    // return true; // Allow access to the login route
    return this.loggedIn;
  }
}
