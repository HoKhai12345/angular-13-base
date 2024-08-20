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
  

  async login(data: {username: string, password: string}) {
    const loginResult = await this.loginService.login(data) as any;
    console.log("loginResult", loginResult);
    if (!loginResult) {
      this.loggedIn = false;
    } else {
      // xử lý logic
      localStorage.setItem('accessToken', loginResult?.accessToken);
      this.loggedIn = true;
      this.router.navigate(['/dashboard']); // Điều hướng đến trang dashboard sau khi đăng nhập thành công  
    }
  }


  logout() {
    localStorage.removeItem('accessToken'); // Xóa khỏi local storage
    this.loggedIn = false;
    this.router.navigate(['/login']); // Điều hướng đến trang login khi đăng xuất
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
