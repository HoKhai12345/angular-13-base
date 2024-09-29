import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormControlName, FormGroup, Validators} from "@angular/forms";
import { AuthService } from 'src/app/service/auth.service';
import { LoaderService } from 'src/app/service/loader/loader.service';
import { Store } from '@ngrx/store';
import { loginSuccess, closeLoginPopup, loginFailure } from "../../../store/actions\/auth.actions";
import { demoSuccess } from "../../../store/actions/demo.actions"
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
      console.log(":::::::::[Auth] Login Success", state);
      state.auth.showLoginPopup
  });
  constructor(private formBuilder: FormBuilder,
     private authService: AuthService,
     private loaderService: LoaderService,
     private store: Store<{auth: { showLoginPopup: boolean }, user: { showDemoPopup: boolean }}>
    ) {
    this.formLogin = this.formBuilder.group({
      username: ['hoquangkhai', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      password: ['123456', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]]
    })
  }

  ngOnInit(): void {
  }

  login() {
    console.log("this.store", this.store);
    const dataPost = this.formLogin.value;
    this.authService.login(dataPost).subscribe((isLogin) => {
      // !isLogin ? this.checkValidate = true : this.checkValidate = false
      if (isLogin) {
        this.checkValidate = true;
        this.store.dispatch(loginSuccess());
      } else {
        this.checkValidate = false;
        console.log("isLoginào");
        this.store.dispatch(loginFailure());
        this.store.dispatch(demoSuccess());
      }

    });
  }


  closePopup() {
    this.store.dispatch(closeLoginPopup());
  }
}
