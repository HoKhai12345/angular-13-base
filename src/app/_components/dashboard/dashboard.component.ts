import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormControlName, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  title = 'Login';
  formLogin: FormGroup;
  constructor(private formBuilder: FormBuilder,) {
    this.formLogin = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]]
    })
  }

  ngOnInit(): void {
  }

  login() {
    const dataPost = this.formLogin.value;
  }
}
