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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private main: MainServiceService,
    private router: Router
  ) {
    this.signupForm = fb.group({
      fullname: ['', [Validators.required, this.fullNameValidator]],
      email: ['', Validators.email],
      password: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  fullNameValidator(control: FormControl): { [s: string]: boolean } | null {
    if (control.value.indexOf(' ') === -1) {
      return { invalid: true };
    }
    return null;
  }
  onGoBack() {
    this.router.navigate(['/login']);
  }
  onSubmit(): void {
    this.signupForm.value.fullname = this.main.capitalization(
      this.signupForm.value.fullname
    );
    this.signupForm.value.city = this.main.capitalization(
      this.signupForm.value.city
    );
    this.signupForm.value.state = this.main.capitalization(
      this.signupForm.value.state
    );

    this.main.signup(this.signupForm.value).subscribe((response) => {
      // show confirmation of successful signup
      // redirect to login
      // console.log(response);
      this.router.navigate(['/login']);
    });
  }
}
