import { createInjectorType } from '@angular/compiler/src/render3/r3_injector_compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainServiceService } from '../main-service.service';
import { store } from '../store/store';

@Component({
  selector: 'app-request-list',
  template: `
    <br />
    <div style="margin-left: 10px">
      <mat-card-title style="border-style: dashed;border-width: 1px">
        {{ city }} - {{ state }}
      </mat-card-title>
      <br />
      <mat-card-subtitle>Request List</mat-card-subtitle>
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
      <ul>
        <div *ngFor="let request of requestList">
          <li>
            <div *ngIf="request.notification == true; else content">
              <!-- <p [ngStyle]="{ color: 'red' }">This post has new comment</p> -->
              Created Date: {{ request.createdAt | date: 'medium' }}
              <br />
              Fullname: {{ request.fullname }}
              <br />
              Content: {{ request.content }}
              <br />
              Location: {{ request.city }}, {{ request.state }}
              <br />

              <button
                style="margin-top:10px"
                matBadge="!"
                matBadgePosition="before"
                matBadgeColor="accent"
                (click)="onDetail(request)"
              >
                Detail
              </button>
            </div>
            <ng-template #content>
              Created Date: {{ request.createdAt | date: 'medium' }}
              <br />
              Fullname: {{ request.fullname }}
              <br />
              Content: {{ request.content }}
              <br />
              Location: {{ request.city }}, {{ request.state }}
              <br />

              <button style="margin-top:10px" (click)="onDetail(request)">
                Detail
              </button>
            </ng-template>
          </li>
          <br />
        </div>
      </ul>
      <div *ngIf="requestList == undefined">
        This area doesn't have any posts
      </div>

      <div *ngIf="requestList != undefined" style="text-align: center; ">
        <button (click)="previousPage()">Previous</button> ...
        <button (click)="nextPage()">Next</button>
      </div>
    </div>
  `,
  styles: [],
})
export class RequestListComponent implements OnInit {
  requestList: any;
  globalRequestList: any;
  subsciption: Subscription;
  userId = localStorage.id;
  nof = false;
  isNof = localStorage.isNof;
  state = localStorage.state;
  city = localStorage.city;
  page = 1;
  constructor(private main: MainServiceService, private router: Router) {
    if (localStorage.state && localStorage.city) {
      this.state = localStorage.state;
      this.city = localStorage.city;
    }

    this.subsciption = this.main
      .getRequestList(this.state, this.city, this.page)
      .subscribe((res) => {
        store.dispatch({ type: 'GET_REQUEST_LIST', payload: res });
        // console.log(res);
        if (Array.isArray(res)) {
          this.requestList = res;
          this.globalRequestList = store.getState().requestList;
        }
        // console.log('provideList', this.requestList);
        // console.log('global', this.globalRequestList);
      });
  }

  ngOnInit(): void {
    //notification

    setTimeout(() => {
      this.requestList = this.main.getNof(this.requestList);
      // console.log(this.requestList);
    }, 200);
  }

  nextPage() {
    this.page++;
    this.main
      .getRequestList(this.state, this.city, this.page)
      .subscribe((res: any) => {
        store.dispatch({ type: 'GET_REQUEST_LIST', payload: res });
        // console.log(res);

        // this.provideList = res;
        // this.globalProvideList = store.getState().providerList;
        if (res.status == 'max') {
          this.page--;
        } else if (Array.isArray(res)) {
          this.requestList = res;
          this.globalRequestList = store.getState().providerList;
        }
      });
    setTimeout(() => {
      this.requestList = this.main.getNof(this.requestList);
    }, 200);
  }

  previousPage() {
    this.page--;
    this.main
      .getRequestList(this.state, this.city, this.page)
      .subscribe((res: any) => {
        store.dispatch({ type: 'GET_PROVIDER_LIST', payload: res });
        // console.log(res);
        if (Array.isArray(res)) {
          this.requestList = res;
          this.globalRequestList = store.getState().providerList;
        }
        if (this.page < 1) {
          this.page++;
        }
      });
    setTimeout(() => {
      this.requestList = this.main.getNof(this.requestList);
    }, 200);
  }

  onDetail(provider: any) {
    this.router.navigate(['post', provider._id]);
    store.dispatch({ type: 'GET_POST_DETAIL', payload: provider });
  }
  ngOnDestroy() {
    this.subsciption.unsubscribe();
  }
}
