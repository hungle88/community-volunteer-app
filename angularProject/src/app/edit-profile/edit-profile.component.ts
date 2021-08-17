import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MainServiceService } from '../main-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styles: [],
})
export class EditProfileComponent {
  userInfo: any;
  editProfileForm: FormGroup;
  constructor(
    private router: Router,
    private main: MainServiceService,
    private fb: FormBuilder,
    private location: Location
  ) {
    if (this.router.getCurrentNavigation()!.extras.state) {
      this.userInfo =
        this.router.getCurrentNavigation()!.extras.state!.userInfo;

      this.editProfileForm = fb.group({
        fullname: [
          this.main.capitalization(this.userInfo[0].fullname),
          [Validators.required, this.fullNameValidator],
        ],
        email: [this.userInfo[0].email, Validators.email],
        password: [this.userInfo[0].password, Validators.required],
        address: [this.userInfo[0].address, Validators.required],
        city: [this.userInfo[0].city, Validators.required],
        state: [this.userInfo[0].state, Validators.required],
        zipcode: [this.userInfo[0].zipcode, Validators.required],
        phone: [this.userInfo[0].phone, Validators.required],
      });
    } else {
      this.editProfileForm = fb.group({
        fullname: [this.main.capitalization(''), Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipcode: ['', Validators.required],
        phone: ['', Validators.required],
      });
    }
  }
  fullNameValidator(control: FormControl): { [s: string]: boolean } | null {
    if (control.value.indexOf(' ') === -1) {
      return { invalid: true };
    }
    return null;
  }
  onSubmit(): void {
    this.editProfileForm.value.city = this.main.capitalization(
      this.editProfileForm.value.city
    );
    this.editProfileForm.value.state = this.main.capitalization(
      this.editProfileForm.value.state
    );
    this.editProfileForm.value.fullname = this.main.capitalization(
      this.editProfileForm.value.fullname
    );

    this.main
      .editUser(this.editProfileForm.value, this.userInfo[0]._id)
      .subscribe((response: any) => {
        alert(response.status);
        // this.router.navigate(['/profile'])
        this.location.back();
      });
  }
}
