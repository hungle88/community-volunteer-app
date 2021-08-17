import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-user-detail',
  template: `
    <br />
    <mat-card-title style="border-style: dashed; border-width: 1px">
      Contact Information
    </mat-card-title>
    <br />
    Fullname: {{ userInfo[0]?.fullname }} <br />
    Email:{{ userInfo[0]?.email }} <br />
    Address: {{ userInfo[0]?.address }} <br />
    City: {{ userInfo[0]?.city }} <br />
    Zipcode: {{ userInfo[0]?.zipcode }} <br />
    Phone: {{ userInfo[0]?.phone }} <br />
  `,
  styles: [],
})
export class UserDetailComponent implements OnInit {
  subscription: Subscription;
  id: any;
  // temp: any;
  userInfo: any = [];
  constructor(
    private main: MainServiceService,
    private activatedRoute: ActivatedRoute
  ) {
    this.subscription = activatedRoute.paramMap.subscribe(
      ({ params }: any) => (this.id = params['id'])
    );
  }

  ngOnInit(): void {
    this.main.getUserDetail(this.id).subscribe((res) => {
      this.userInfo = res;

      // console.log(res);

      // console.log('userinfo', this.temp);
    });
  }
}
