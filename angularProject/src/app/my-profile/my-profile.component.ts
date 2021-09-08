import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-my-profile',
  template: ` <br />
    <mat-card-title
      style="border-style: dashed;border-width: 1px; margin-left: 10px"
    >
      My Profile
    </mat-card-title>
    <a
      *ngIf="this.isNof == 'yes'"
      style="float: right;"
      [routerLink]="['/', 'notification']"
      ><div class="example-button-container">
        <button
          mat-fab
          color="accent"
          aria-label="Example icon button with a bookmark icon"
        >
          <mat-icon>notifications_active</mat-icon>
        </button>
      </div></a
    >
    <br />
    <br />
    <div style="margin-left: 10px">
      Fullname: {{ userInfo[0]?.fullname }} <br />
      Email:{{ userInfo[0]?.email }} <br />
      Password: ********** <br />
      Address: {{ userInfo[0]?.address }} <br />
      City: {{ userInfo[0]?.city }} <br />
      Zipcode: {{ userInfo[0]?.zipcode }} <br />
      Phone: {{ userInfo[0]?.phone }} <br />
    </div>
    <button
      style="margin-left: 5px; margin-top: 10px; margin-bottom: 5px"
      (click)="onEdit()"
    >
      Edit
    </button>`,
  styles: [],
})
export class MyProfileComponent implements OnInit {
  id: any = localStorage.userId;
  isNof = localStorage.isNof;

  userInfo: any = [];
  constructor(private main: MainServiceService, private router: Router) {}

  ngOnInit(): void {
    this.main.getUserDetail(this.id).subscribe((res) => {
      this.userInfo = res;
    });
  }

  onEdit() {
    this.router.navigate(['profile/edit'], {
      state: { userInfo: this.userInfo },
    });
  }
}
