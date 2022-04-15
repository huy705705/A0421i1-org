import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {News} from '../app/model/news';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  public apiURL = 'http://localhost:8080/news';
  newList: News[] =[{
    newsId: 'string',
      newsName: 'string',
      description: 'string',
      content: 'string',
      hightlight: 'string',
      image: 'string',
      createDate: null,
      isDelete:true,
      employeeId: 'string'
  },
  {
    newsId: 'string',
      newsName: 'string',
      description: 'string',
      content: 'string',
      hightlight: 'string',
      image: 'string',
      createDate: null,
      isDelete:true,
      employeeId: 'string'
  },
  {
    newsId: 'string',
      newsName: 'string',
      description: 'string',
      content: 'string',
      hightlight: 'string',
      image: 'string',
      createDate: null,
      isDelete:true,
      employeeId: 'string'
  }]
  constructor() { }
  findAlls() {
    return this.newList;
  }
  
  // findAll(): Observable<News[]> {
  //   console.log(this.http.get<News[]>(this.apiURL));
    
  //   return this.http.get<News[]>(this.apiURL);
  // }
}
