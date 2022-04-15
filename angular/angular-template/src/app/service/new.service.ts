import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {News} from '../model/news';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NewService {

  public apiURL = 'http://localhost:8080/news';

  constructor(private http: HttpClient) { }

  findAll(): Observable<News[]> {
    console.log(this.http.get<News[]>(this.apiURL));
    
    return this.http.get<News[]>(this.apiURL);
  }

}
