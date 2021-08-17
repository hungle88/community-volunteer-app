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
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styles: [],
})
export class EditCommentComponent {
  commentContent: any;
  postId: any;
  editCommentForm: FormGroup;
  constructor(
    private router: Router,
    private main: MainServiceService,
    private fb: FormBuilder,
    private location: Location
  ) {
    if (this.router.getCurrentNavigation()!.extras.state) {
      this.commentContent =
        this.router.getCurrentNavigation()!.extras.state!.commentContent;
      // console.log(this.commentContent.postId);
      this.postId = this.commentContent.postId;

      this.editCommentForm = fb.group({
        commentContent: [
          this.commentContent.commentContent,
          Validators.required,
        ],
      });
    } else {
      this.editCommentForm = fb.group({
        commentContent: ['', Validators.required],
      });
    }
  }

  onSubmit(): void {
    // console.log(this.commentContent.postId);
    // console.log(this.editCommentForm.value);
    this.main
      .editComment(
        this.editCommentForm.value,
        this.postId,
        this.commentContent._id
      )
      .subscribe((response: any) => {
        alert(response.status);
        // this.router.navigate(['/requests']);
        this.location.back()
      });
  }
}
