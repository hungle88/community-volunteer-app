import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainServiceService } from '../main-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-post',
  templateUrl: 'edit-post.component.html',
  styles: []
})
export class EditPostComponent {
  postContent: any;
  editPostForm: FormGroup;

  constructor(private router: Router, private main: MainServiceService, private fb: FormBuilder, private location: Location) {

    if (this.router.getCurrentNavigation()!.extras.state) {
      this.postContent = this.router.getCurrentNavigation()!.extras.state!.postContent;
      // console.log(this.postContent);

      this.editPostForm = fb.group({
        'content': [this.postContent[0].content, Validators.required],
        'city': [localStorage.getItem('city'), Validators.required],
        'state': [localStorage.getItem('state'), Validators.required]
      })
    }
    else {
      this.editPostForm = fb.group({
        'content': ['', Validators.required],
        'city': [localStorage.getItem('city'), Validators.required],
        'state': [localStorage.getItem('state'), Validators.required]
      })
    }
  }

  onSubmit(): void {
    // console.log(this.postContent[0]._id)
    this.main.editPost(this.editPostForm.value, this.postContent[0]._id).subscribe((response: any) => {
      alert(response.status)
      // this.router.navigate(['/requests'])
      this.location.back()
    })
  }

}
