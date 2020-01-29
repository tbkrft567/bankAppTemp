import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: {}

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.user = {email: "", password:""}
  }
  loginUser(){
    let observable = this._httpService.loginUserSRV(this.user)
    observable.subscribe(data => {
      if("errors" in data){
        console.log(data)
        this.ngOnInit()
      }
      else{
        window.localStorage.setItem("token", data["token"])
        this.goToDashboard()
      }
    })
  }
  goToDashboard(){
    this._router.navigate(['/dashboard', 'home'])
  }

}
