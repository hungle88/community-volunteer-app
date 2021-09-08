import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainServiceService } from './main-service.service';

@Component({
  selector: 'app-root',
  template: `
    <div [ngStyle]="{ background: '#d0dfff', height: '40px' }">
      <h1>
        Community Volunteer Activities
        <img
          src="assets/images/logo.png"
          [ngStyle]="{ height: '80px', float: 'right' }"
        />
      </h1>
      <p [ngStyle]="{ float: 'right', color: 'blue', 'font-style': 'italic' }">
        “Volunteering is at the very core of being a human. No one has made it
        through life without someone else's help.”
      </p>
    </div>
    <br />
    <br />
    <br />
    <div *ngIf="currentUser != undefined">Hello, {{ currentUser }}!</div>
    <div [ngStyle]="{ background: '#86abf9', height: '80px' }">
      <br />

      <a style="margin-left: 10px;" [routerLink]="['/', 'requests']"
        ><button mat-raised-button color="primary">Request List</button></a
      >
      <a style="margin-left: 10px;" [routerLink]="['/', 'providers']"
        ><button mat-raised-button color="primary">Provider List</button></a
      >
      <a style="margin-left: 10px;" [routerLink]="['/', 'post']"
        ><button mat-raised-button color="primary">Add New Post</button></a
      >
      <a style="margin-left: 10px;" [routerLink]="['/', 'profile']"
        ><button mat-raised-button color="primary">My Profile</button></a
      >
      <a
        *ngIf="this.isNof == 'yes'; else content"
        style="margin-left: 10px;"
        [routerLink]="['/', 'notification']"
        ><button
          matBadge="!"
          matBadgePosition="before"
          matBadgeColor="accent"
          mat-raised-button
          color="primary"
        >
          Notifcation
        </button></a
      >
      <ng-template #content>
        <a style="margin-left: 10px;" [routerLink]="['/', 'notification']"
          ><button mat-raised-button color="primary">Notifcation</button></a
        >
      </ng-template>

      <div [ngStyle]="{ float: 'right' }">
        City:
        <input [value]="''" (input)="areaState.city = city.value" #city />
        State:
        <input
          [value]="''"
          (input)="areaState.state = state.value"
          #state
        /><button
          mat-raised-button
          color="primary"
          style="margin-left: 10px;"
          (click)="changeArea()"
        >
          Change Area
        </button>
        <span *ngIf="currentUser">
          <button
            mat-raised-button
            color="primary"
            style="margin-left: 10px; margin-right: 10px"
            (click)="logout()"
          >
            Logout
          </button>
        </span>
      </div>
    </div>

    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  areaState: any;
  title = 'angularProject';
  isNof = localStorage.isNof;
  currentUser = localStorage.userFullname;
  constructor(private main: MainServiceService, private router: Router) {
    this.areaState = { city: localStorage.city, state: localStorage.state };
    console.log(this.isNof);
    if (!localStorage.token) {
      this.router.navigate(['/login']);
    }
  }

  //switch to a different location
  changeArea() {
    if (localStorage.token) {
      this.areaState.city = this.main.capitalization(this.areaState.city);
      this.areaState.state = this.main.capitalization(this.areaState.state);

      localStorage.setItem('city', this.areaState.city);
      localStorage.setItem('state', this.areaState.state);
      window.location.reload();
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
