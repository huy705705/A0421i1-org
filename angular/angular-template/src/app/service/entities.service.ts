import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Entities} from "../model/entities";
import {Observable} from "rxjs";
import {retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  public apiURL = "http://localhost:8080/entities";
  constructor(private http: HttpClient) { }
  createEntities(value:Entities):Observable<any> {
    console.log(value);
    return this.http.post<any>(this.apiURL+"/create",value);
  }


  findById(id: String):Observable<any> {
    return this.http.get<Entities>(this.apiURL+"/update/"+id);
  }


  updateEntities(id: number,entities: Entities):Observable<any>{
    return this.http.patch<Entities>(this.apiURL+"/update/"+id, entities);
  }
  getListCage():Observable<any>{
    return this.http.get<String[]>(this.apiURL+"/create");
  }
}
