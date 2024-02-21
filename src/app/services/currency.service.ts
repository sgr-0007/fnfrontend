import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Currency } from '../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${environment.baseUrl}/currency`);
  }

  get(id: any): Observable<Currency> {
    return this.http.get(`${environment.baseUrl}/currency/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/currency`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/currency/${id}`, data);
  }


}