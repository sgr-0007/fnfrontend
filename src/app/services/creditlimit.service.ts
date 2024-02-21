import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Creditlimit } from '../models/creditlimit';

@Injectable({
  providedIn: 'root'
})
export class CreditlimitService {

  constructor(private http: HttpClient) { }
/* 
  getAll(): Observable<[Creditlimit[]]> {
    return this.http.get<Creditlimit[]>(`${environment.baseUrl}/creditlimit`);
  } */

  getcreditlimitbybuyerid(buyerid: any): Observable<any> {
   /*  return this.http.get(`${environment.baseUrl}/creditlimit/${buyerid}`); */
    return this.http.get<Creditlimit>(`${environment.baseUrl}/creditlimit/${buyerid}`);
  }

  updatelimit(creditlimit:Creditlimit):Observable<any>{
    return this.http.put<Creditlimit>(`${environment.baseUrl}/creditlimit/update`,creditlimit);
  }
/* 
  create(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/groups`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/groups/${id}`, data);
  } */
}
