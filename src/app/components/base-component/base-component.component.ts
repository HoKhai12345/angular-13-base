import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {keyframes} from "@angular/animations";

@Component({
  selector: 'app-base-component',
  templateUrl: './base-component.component.html',
  styleUrls: ['./base-component.component.css']
})

export class BaseComponent implements OnInit {

  public infoUser: any;

  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getInfoUser()
  }

  getInfoUser() {
    const decodedToken = this.authService.getDecodedToken();
    if (decodedToken) {
      this.infoUser = decodedToken;
      console.log('User Info:', this.infoUser);
    } else {
      console.warn('Không tìm thấy token hoặc token không hợp lệ.');
    }
  }

}
