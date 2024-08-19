import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static login() {
    throw new Error('Method not implemented.');
  }

  private loggedIn = false;

  constructor(private router: Router) {}
  

  login() {
    this.loggedIn = true;
    this.router.navigate(['/dashboard']); // Điều hướng đến trang dashboard sau khi đăng nhập thành công
  }


  logout() {
    this.loggedIn = false;
    this.router.navigate(['/login']); // Điều hướng đến trang login khi đăng xuất
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
