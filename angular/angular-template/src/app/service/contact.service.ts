import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public apiURL = 'http://localhost:8080/contact';
  constructor(private http: HttpClient) {}

  getProvinceList() : Observable<any>{
    return this.http.get(this.apiURL);
}
  getDistrictList(provinceId : number): Observable<any>{
    return this.http.get(this.apiURL+"?provinceId="+provinceId)
  }
  getWardList(provinceId : number,districtId :number): Observable<any>{
    return this.http.get(this.apiURL+"?provinceId="+provinceId+"&districtId="+districtId)
  }
}
