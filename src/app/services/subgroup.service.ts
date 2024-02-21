import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from '../models/group.model';
import { Subgroup } from '../models/subgroup.model';

@Injectable({
  providedIn: 'root'
})
export class SubgroupService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Subgroup[]> {
    return this.http.get<Subgroup[]>(`${environment.baseUrl}/subgrouptable`);
  }
  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${environment.baseUrl}/groups`);
  }

  get(id: any): Observable<Subgroup> {
    return this.http.get(`${environment.baseUrl}/subgroup/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/subgroup`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/subgroup/${id}`, data);
  }


}
