import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private _http: HttpClient
  ) { }

  createUserSRV(newUser){
    console.log("**http service_Create User**", newUser)
    return this._http.post('/app/users/create', newUser);
  }
  loginUserSRV(loggedUser){
    console.log('here', loggedUser)
    return this._http.post('/app/sessions/create', loggedUser)
  }
  testUpdateSRV(x){
    console.log('updateTester')
    return this._http.put('/app/accounts/update', x)
  }
}
