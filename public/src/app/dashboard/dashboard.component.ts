import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: {}

  constructor(
    private _httpService: HttpService,
    private _router: ActivatedRoute,
    private _route: Router,
  ) { }

  ngOnInit() {
    this.user = window.localStorage.getItem("token")
    console.log(this.user)
  }

  getUser() {
    let tempObservable = this._httpService.loginUserSRV(this.user)
    tempObservable.subscribe(data => {
      console.log("Got logged user, ts file", data);
      this.user = data;
      console.log(this.user)
    });
  }

  logout(){
    window.localStorage.clear()
    this._route.navigate(['/login'])
  }

}
