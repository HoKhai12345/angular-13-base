import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormControlName, FormGroup, Validators} from "@angular/forms";
import { AuthService } from 'src/app/service/auth.service';
import { LoaderService } from 'src/app/service/loader/loader.service';
import { Store } from '@ngrx/store';
import { loginSuccess, closeLoginPopup, loginFailure } from "../../../store/actions/auth.actions";
import { demoFailure, demoSuccess } from "../../../store/actions/demo.actions"
import { AlertService } from 'src/app/_services/alert/alert.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  title = 'Login';
  formLogin: FormGroup;
  isLoading = this.loaderService.loaderState;
  checkValidate = false;
  showPopup$ = this.store.select((state) => {
      state.auth.showLoginPopup
  });
  constructor(private formBuilder: FormBuilder,
     private authService: AuthService,
     private loaderService: LoaderService,
     private alertService: AlertService,
     private router: Router,
     private store: Store<{auth: { showLoginPopup: boolean }}>
    ) {
    this.formLogin = this.formBuilder.group({
      username: ['hoquangkhai', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      password: ['123456', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]]
    })
  }

  ngOnInit(): void {
  }

  login() {
    const dataPost = this.formLogin.value;
    this.authService.login(dataPost).subscribe((result) => {
      if (result?.status !== 1) {
        this.checkValidate = true;
        this.alertService.error("Đăng nhập thất bại!");
        return
      }
      this.alertService.success("Đăng nhập thành công!");
      this.checkValidate = false
      this.router.navigate(['/dashboard']);
    });
  }


  closePopup() {
    this.store.dispatch(closeLoginPopup());
  }
}
