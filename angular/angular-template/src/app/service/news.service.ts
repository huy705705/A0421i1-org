import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {News} from '../model/news';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  public apiURL = 'http://localhost:8080/api/public/news';
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
    console.log(this.apiURL +'?search='+ name);
    console.log(this.http.get<News[]>(this.apiURL +'?search='+ name));
    return this.http.get<News[]>(this.apiURL +'?search='+ name);
  }
  findAllHightLight(page:number): Observable<News[]> {
    console.log((this.apiURL+ '/hl?page='+page));
    return this.http.get<News[]>(`${this.apiURL+ '/hl?page='+page}`);
  }
}
