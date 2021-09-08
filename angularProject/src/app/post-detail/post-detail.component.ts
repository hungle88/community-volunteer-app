import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainServiceService } from '../main-service.service';
import { store } from '../store/store';
import { Location } from '@angular/common';


@Component({
  selector: 'app-post-detail',
  template: `
    <br />
    <div style="margin-left: 10px">
      <mat-card-title style="border-style: dashed;border-width: 1px">
        Post Content </mat-card-title
      ><br />
      <br />
      Created Date: {{ postContent[0]?.createdAt | date: 'medium' }}
      <br />
      Fullname: {{ postContent[0]?.fullname }}
      <br />
      Content: {{ postContent[0]?.content }}
      <br />
      Location: {{ postContent[0]?.city }}, {{ postContent[0]?.state }}
      <br />

      <div *ngIf="userId != postContent[0].ownerId; else content ">
        <button (click)="onContact(postContent.ownerId)">
          Contact this person
        </button>
      </div>

      <ng-template #content>
        <button
          style="margin-left: 5px; margin-top: 10px; margin-bottom: 5px"
          (click)="onEditPost()"
        >
          Edit
        </button>
        <button
          style="margin-left: 5px; margin-top: 10px; margin-bottom: 5px"
          (click)="onDeletePost()"
        >
          Delete
        </button>
      </ng-template>

      <br />
      Comments:
      <div *ngIf="postContent[0]?.comments.length == 0">
        This post doesn't have any comment
      </div>
      <p>Your comment:</p>
      <textarea
        [value]="commentState.commentContent"
        (input)="commentState.commentContent = commentContent.value"
        rows="8"
        cols="60"
        #commentContent
      ></textarea
      ><br />
      <button
        style="margin-left: 5px; margin-top: 10px; margin-bottom: 5px"
        (click)="onSubmit(commentContent, id)"
      >
        Submit
      </button>

      <ul>
          <div *ngFor="let comment of postContent[0]?.comments " >
            <li>
              {{ comment?.createdAt | date: 'medium' }} <br />
              Fullname: {{ comment?.fullname }}
              <p>{{ comment?.commentContent }}</p>

              <div *ngIf="comment.commentOwnerId == userId">
                <button
                  style="margin-left: 5px;  margin-bottom: 5px"
                  (click)="onEditComment(comment)"
                >
                  Edit
                </button>
                <button
                  style="margin-left: 5px;  margin-bottom: 5px"
                  (click)="onDeleteComment(this.id, comment._id)"
                >
                  Delete
                </button>
              </div>

              <br />
            </li>
          </div>
      </ul>
      <div></div>
    </div>
  `,
  styles: [],
})
export class PostDetailComponent implements OnInit {
  subscription: Subscription;
  id: any;
  postContent: any = [];
  commentState: any = { commentContent: '' };
  userId = localStorage.userId;
  formState = {
    username: '',
    password: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private main: MainServiceService,
    private location: Location
  ) {
    this.subscription = activatedRoute.paramMap.subscribe(
      ({ params }: any) => (this.id = params['id'])
    );
  }

  ngOnInit(): void {
    this.main.getPostDetail(this.id).subscribe((res) => {
      this.postContent = res;

    });

    // update checkin clear notification function
    // update post and comment's check-in time to the current time

    setTimeout(() => {

if(this.postContent[0].comments[this.postContent[0].comments.length - 1].commentOwnerId == localStorage.userID){
      if (this.postContent[0].ownerId == localStorage.userId) {
        this.main
          .updatePostCheckIn(this.id)
          .subscribe((res) => console.log(res));
      }
      for (let i = 0; i < this.postContent[0].comments.length; i++) {
        if (
          this.postContent[0].comments[i].commentOwnerId == localStorage.userId
        ) {
          this.main
            .updateCommentCheckIn(this.id, this.postContent[0].comments[i]._id)
            .subscribe(console.log);
        }
      }


    }
    }, 200);
  }

  onContact(provider: any) {
    this.router.navigate(['user', this.postContent[0].ownerId]);
  }

  onEditPost() {
    this.router.navigate(['post', this.postContent[0].ownerId, 'edit'], {
      state: { postContent: this.postContent },
    });
  }

  onEditComment(comment: any) {
    this.router.navigate(
      ['post', this.postContent[0].ownerId, 'comment', comment._id, 'edit'],
      {
        state: { commentContent: { ...comment, postId: this.id } },
      }
    );
  }

  onSubmit(commentState: any, id: any) {
    this.main.addComment(this.commentState, this.id).subscribe(console.log);
    setTimeout(() => {
          this.main.getPostDetail(this.id).subscribe((res) => {
      this.postContent = res;

      console.log(res);
    });
    }, 0);

    this.commentState.commentContent = '';
  }

  onDeleteComment(id: any, comId: any) {
    this.main.deleteComment(id, comId).subscribe(console.log);
    this.postContent[0].comments = this.postContent[0].comments.filter(
      (comment: any) => comment._id != comId
    );
  }

  onDeletePost() {
    this.main.deletePost(this.id).subscribe(console.log);
    // this.router.navigate(['/requests']);
    this.location.back()

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
