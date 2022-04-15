import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {News} from '../model/news';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  public apiURL = 'http://localhost:8080/news';

  constructor(private http: HttpClient) { }

  findAll(): Observable<News[]> {
    console.log(this.http.get<News[]>(this.apiURL));
    
    return this.http.get<News[]>(`${this.apiURL}`);
  }
  findAllPageable(page:number){
    console.log( this.http.get(this.apiURL+'?page='+page).subscribe);
    
    return this.http.get(this.apiURL+'?page='+page);
  }
  findByName(name: String): Observable<any> {
    return this.http.get<News[]>(this.apiURL +'?seacrch='+ name);
  }


}
