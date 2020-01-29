import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-one-credit',
  templateUrl: './one-credit.component.html',
  styleUrls: ['./one-credit.component.css']
})
export class OneCreditComponent implements OnInit {

  constructor(
    private _httpService: HttpService,
    private _router: ActivatedRoute,
    private _route: Router,
  ) { }

  ngOnInit() {
  }

  logout(){
    window.localStorage.clear()
    this._route.navigate(['/login'])
  }

}
