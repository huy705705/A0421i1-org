import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IAccount} from "../model/IAccount";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public apiURL = 'http://localhost:8080/admin/employee/account';
  constructor(private http: HttpClient) { }
  findAll(): Observable<IAccount[]>{
    return this.http.get<IAccount[]>(this.apiURL);
  }
}
