import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../model/employee';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public apiURL = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiURL);
  }

  findById(id: number): Observable<any> {
    return this.http.get<Employee[]>(this.apiURL + '/' + id);
  }

  updateCustomer(id: number, employee: Employee): Observable<any> {
    return this.http.patch<Employee[]>(this.apiURL + '/' + id, employee);
  }
}
