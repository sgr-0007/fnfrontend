import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from '../models/group.model';
import { SubLedger } from '../models/subledger';

@Injectable({
  providedIn: 'root'
})
export class SubLedgerService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<SubLedger[]> {
    return this.http.get<SubLedger[]>(`${environment.baseUrl}/getsubledg`);
  }
  

  
  create(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/postsubledg`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/subledg/${id}`, data);
  }


}
