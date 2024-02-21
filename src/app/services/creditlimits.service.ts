import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Creditlimitsetting } from '../models/creditlimitsetting';
import { Normalledger } from '../models/normalledger.model';

@Injectable({
  providedIn: 'root'
})
export class CreditlimitsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Creditlimitsetting[]> {
    return this.http.get<Creditlimitsetting[]>(`${environment.baseUrl}/creditlimitsettingtable`);
  }
  getUom(): Observable<Normalledger[]> {
    return this.http.get<Normalledger[]>(`${environment.baseUrl}/normalledgertable`);
  }

  get(id: any): Observable<Creditlimitsetting> {
    return this.http.get(`${environment.baseUrl}/creditlimitsetting/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/creditlimitsetting`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/creditlimitsetting/${id}`, data);
  }


}
