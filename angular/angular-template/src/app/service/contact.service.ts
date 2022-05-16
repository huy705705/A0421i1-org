import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public apiURL = 'http://localhost:8080/api/public/contact';
  constructor(private http: HttpClient) {}

  getProvinceList() : Observable<any>{
    return this.http.get(this.apiURL);
}
  getDistrictList(provinceId : number): Observable<any>{
    return this.http.get(this.apiURL+"/district/"+provinceId)
  }
  getWardList(districtId :number): Observable<any>{
    return this.http.get(this.apiURL+"/ward/"+districtId)
  }
  createCustomer(customer : Customer) : Observable<any>{
    return  this.http.post(this.apiURL+"/create",customer);
  }
}
