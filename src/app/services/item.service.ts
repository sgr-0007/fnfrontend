import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item';
import { Uom } from '../models/uom';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(`${environment.baseUrl}/item`);
  }
  getUom(): Observable<Uom[]> {
    return this.http.get<Uom[]>(`${environment.baseUrl}/uom`);
  }

  get(id: any): Observable<Item> {
    return this.http.get(`${environment.baseUrl}/item/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/item`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/item/${id}`, data);
  }
}
