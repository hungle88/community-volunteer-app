import { Component } from '@angular/core';
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
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
})
export class AddPostComponent {
  addPostForm: FormGroup;

  constructor(
    private router: Router,
    private main: MainServiceService,
    private fb: FormBuilder,
    private location: Location
  ) {
    this.addPostForm = fb.group({
      fullname: [
        localStorage.getItem('userFullname'),
        [Validators.required, this.fullNameValidator],
      ],
      type: ['Help Requests'],
      content: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      ownerId: [localStorage.getItem('userId')],
    });
  }

  fullNameValidator(control: FormControl): { [s: string]: boolean } | null {
    if (control.value.indexOf(' ') === -1) {
      return { invalid: true };
    }
    return null;
  }

  onSubmit(): void {
    //capitalize fullname, city and state
    this.addPostForm.value.fullname = this.main.capitalization(
      this.addPostForm.value.fullname
    );

    this.addPostForm.value.city = this.main.capitalization(
      this.addPostForm.value.city
    );
    this.addPostForm.value.state = this.main.capitalization(
      this.addPostForm.value.state
    );

    this.main.addPost(this.addPostForm.value).subscribe((response: any) => {
      alert(response.status);
      // this.router.navigate(['/requests']);
      if(this.addPostForm.value.type =='Help Requests'){
        this.router.navigate(['/requests']);

      } else if(this.addPostForm.value.type =='Service Providers'){
        this.router.navigate(['/providers']);

      }
        // this.router.navigate(['/requests']);
    });
  }
}
