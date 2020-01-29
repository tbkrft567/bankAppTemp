import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

x: {}

  constructor(
    private _httpService: HttpService,
    private _router: ActivatedRoute,
    private _route: Router,
  ) { }

  ngOnInit() {
    this.testUpdate()
  }

  testUpdate(){
    this.x = {}
    let observable = this._httpService.testUpdateSRV(this.x)
    observable.subscribe(data => {
      console.log(data)
    })
  }
  logout(){
    window.localStorage.clear()
    this._route.navigate(['/login'])
  }
}
