import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-notification',
  template: `
    <br />
    <div style="margin-left: 10px">
      <mat-card-title style="border-style: dashed;border-width: 1px">
        Notfications </mat-card-title
      ><br />
      <br />
      <ul>
        <div *ngFor="let post of filterNofList">
          <li>
            <div *ngIf="post.notification == true">
              Created Date: {{ post.createdAt | date: 'medium' }} <br />
              Type: {{ post.type }} <br />
              Fullname: {{ post.fullname }}
              <br />
              Content: {{ post.content }}
              <br />
              Location: {{ post.city }}, {{ post.state }}
              <br />

              <button
                style="margin-top:10px"
                matBadge="!"
                matBadgePosition="before"
                matBadgeColor="accent"
                (click)="onDetail(post)"
              >
                Detail
              </button>
            </div>
          </li>
          <br />
        </div>
      </ul>
      <div *ngIf="filterNofList == undefined || filterNofList.length == 0">
        There is no new comments in the posts you are following
      </div>
    </div>
  `,
  styles: [],
})
export class NotificationComponent implements OnInit {
  followList: any;
  subsciption: Subscription;
  userId = localStorage.id;
  nof = false;
  filterNofList: any;
  page = 1;
  constructor(private main: MainServiceService, private router: Router) {
    this.subsciption = this.main.getFollowPost(this.page).subscribe((res) => {
      if (Array.isArray(res)) {
        this.followList = res;
      }
    });
  }

  ngOnInit(): void {
    //display notification
    setTimeout(() => {
      this.followList = this.main.getNof(this.followList);
      this.filterNofList = this.followList.filter(
        (post: any) => post.notification == true
      );

      if (!this.filterNofList || this.filterNofList.length == 0) {
        localStorage.setItem('isNof', 'no');
      } else {
        localStorage.setItem('isNof', 'yes');
      }
    }, 200);
  }

  onDetail(post: any) {
    this.router.navigate(['post', post._id]);
  }
  ngOnDestroy() {
    this.subsciption.unsubscribe();
  }
}
