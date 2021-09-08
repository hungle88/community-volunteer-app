import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private main: MainServiceService,
    private router: Router
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    if (localStorage.token) {
      this.router.navigate(['/notification']);
    }
  }

  onSubmit(): void {
    this.main.login(this.loginForm.value).subscribe((response: any) => {
      // check if valid token; if yes, save to localStorage, redirect to '/notifcation'
      if (response.status === 'success') {
        localStorage.setItem('token', response.result);
        localStorage.setItem('city', response.city);
        localStorage.setItem('state', response.state);
        localStorage.setItem('userFullname', response.userFullname);
        localStorage.setItem('userId', response.userId);
      }
      // if toke is invalid, show invalid login status
      else {
        alert(response.status);
      }
    });
  }

  onSignUp() {
    this.router.navigate(['signup']);
  }
}
