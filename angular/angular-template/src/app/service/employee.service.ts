import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IEmployeeDTO} from "../model/IEmployeeDTO";
import {Employee} from "../model/Employee";
import {Entities} from "../model/entities";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public apiURL = 'http://localhost:8080/admin/employee';

  constructor(private http: HttpClient) { }

  // findAll(): Observable<IEmployeeDTO> {
  //   return this.http.get<IEmployeeDTO[]>(`${this.apiURL}`);
  // }

  findAllPageable(page:number){
    return this.http.get(this.apiURL+'?page='+page);
  }

  findById(id: string): Observable<any> {
    return this.http.get<IEmployeeDTO[]>(this.apiURL + '/update/' + id);
  }

  createEmployee(employee: IEmployeeDTO[]): Observable<any>{
    return this.http.post<IEmployeeDTO[]>(this.apiURL + '/create/', employee);
  }

  updateEmployee(id: string, employee: IEmployeeDTO[]): Observable<any> {
    return this.http.patch<IEmployeeDTO[]>(this.apiURL + '/update/' + id, employee);
  }

  findAllEmployeeName(searchName: string, searchId: string, page:number): Observable<any>{
    console.log(searchName+ "   " + searchId);
    return this.http.get<any>(this.apiURL + '?searchName=' + searchName + '&searchId=' + searchId + '&page=' + page);
  }

  deleteEmployeeById(id: string) {
    console.log("id: " + id)
    return this.http.patch(this.apiURL + "/delete/" + id, null);
  }
}
