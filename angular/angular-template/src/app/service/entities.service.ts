import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";
import {Entities} from "../model/entities";

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
    return this.http.get<Entities>(this.apiURL+"/"+id);
  }

  deleteEntitiesById(id: number) {
    
  }
}
