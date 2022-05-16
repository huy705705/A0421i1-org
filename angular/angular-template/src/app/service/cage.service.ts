import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Entities} from "../model/entities";
import {BehaviorSubject, Observable} from "rxjs";
import {Cage} from "../model/cage";
import {Employee} from "../model/employee";
import {EmployeeDto} from "../model/employeeDto";


@Injectable({
  providedIn: 'root'
})
export class CageService {
  private subject = new BehaviorSubject("");
  public apiURL = 'http://localhost:8080/employee/cage';
  constructor(private http: HttpClient) { }

  createCage(value: Cage): Observable<any> {
    return this.http.post<any>(this.apiURL + "/create", value);
  }


  findById(id: String): Observable<any> {
    return this.http.get<any>(this.apiURL + "/edit/" + id);
  }


  updateCage(id: number, cage: Cage): Observable<any> {
    return this.http.patch<Cage>(this.apiURL + "/edit/" + id, cage);
  }

  getListEmployee(): Observable<any>{
    return this.http.get<Employee[]>(this.apiURL + "/listEmployee")
  }

  getCageIdForCreate(): Observable<number> {
    return this.http.get<number>(this.apiURL + "/createId");
  }

  getCurrentEmployeeCreateCage(user: string): Observable<any> {
    return this.http.get<any>(this.apiURL + "/username/" + user );
  }

  sendUsernameForCreateCage(username: string){
    this.subject.next(username)
  }

  getUsernameForCageComponent(): Observable<string>{
    return this.subject.asObservable();
  }
}
