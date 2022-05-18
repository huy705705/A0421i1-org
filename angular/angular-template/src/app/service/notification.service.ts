import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Notification} from "../model/notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public apiURL = 'http://localhost:8080/api/public/notification';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }
  findAllPageable(page: number) {
    return this.http.get(this.apiURL + '?page=' + page);
  }
  findById(id: String): Observable<any> {
    return this.http.get<any>(this.apiURL + "/update/" + id);
  }
  deleteNotificationById(id: string) {
    console.log("2: " + id)
    // let entities:Observable<Entities>;
    // entities =this.findById(id);
    return this.http.patch(this.apiURL + "/delete/" + id, null);


  }


  createNotification(notification: Notification): Observable<any> {
    return this.http.post<any>(this.apiURL + '/create/', JSON.stringify(notification), this.httpOptions)
  }
}
