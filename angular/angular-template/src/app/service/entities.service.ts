import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";
import {Entities} from "../model/entities";
import {any} from "codelyzer/util/function";

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {
  public apiURL = 'http://localhost:8080/entities';
  entitiesList = [];

  constructor(private http: HttpClient) {
  }
  findAll(): Observable<Entities[]> {
    return this.http.get<Entities[]>(this.apiURL);
  }
  findAllPageable(page:number){
    return this.http.get(this.apiURL+'?page='+page);
  }
  findById(id: string): Observable<Entities>  {
    return this.http.get<Entities>(this.apiURL+"/delete/"+id);
  }

  deleteEntitiesById(id: string){
    console.log("2: "+id)
    // let entities:Observable<Entities>;
    // entities =this.findById(id);
    return this.http.patch(this.apiURL+"/delete/"+id,null);


  }
}
