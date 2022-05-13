import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CageService {
  private subject = new BehaviorSubject("");
  public apiURL = 'http://localhost:8080/api/public/cage';
  constructor(private http : HttpClient) { }

  findAllPageAble(page : number){
    return this.http.get(this.apiURL+'/?page='+page)
  }
  findCage(page : number,dateType:string, dateFrom : string, dateTo : string, searchCageId : string): Observable<any>{
    return this.http.get(this.apiURL+'/search/?dateType='+dateType+'&dateFrom='+dateFrom +'&dateTo='+dateTo +'&searchCageId='+searchCageId +'&page='+page)
  }
  findAllEntitiesInCage(cageId : string){
    this.subject.next(cageId);
  }
  getCageIdFromCageComponent(): Observable<string>{
    return this.subject.asObservable();
  }
}
