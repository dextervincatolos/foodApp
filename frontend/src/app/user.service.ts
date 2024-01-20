import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from './user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( public httpClient:HttpClient) { }

  
  registerUser(user:any):Observable<any>{
    return this.httpClient.post('http://localhost:3000/snack-point/newUser', user)
  }

  loginUser(userCred:any):Observable<any>{
    return this.httpClient.post('http://localhost:3000/snack-point/loginUser', userCred)
  }

}