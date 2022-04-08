import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const AUTH_API = 'http://localhost:8080/api/public/';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  httpOptions: any;
  isLoggedIn: boolean;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'ContentType': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  login(object): Observable<any>{
    return this.http.post(AUTH_API + 'login', {
      accountName:object.accountName,
      password: object.password
    }, this.httpOptions);
  }

  verifyPassword(token: string): Observable<any>{
    return this.http.post(AUTH_API + 'verify-password', {
      token: token
    }, this.httpOptions);
  }

  resetPassword(email: string): Observable<any>{
    return this.http.post(AUTH_API + 'forgot-password', {
      email: email
    }, this.httpOptions);
  }

  // resetPassword(accountName: string): Observable<any>{
  //   return this.http.post(AUTH_API + 'forgot-password', {
  //     accountName: accountName
  //   }, this.httpOptions);
  // }

  doResetPassword(password: string, token: string): Observable<any>{
    return this.http.post(AUTH_API + 'do-reset-password', {
      password: password,
      token: token
    }, this.httpOptions);
  }

}
