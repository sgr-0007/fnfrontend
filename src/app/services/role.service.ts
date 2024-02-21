import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.baseUrl}/roles`);
  }

  get(id: any): Observable<Role> {
    return this.http.get(`${environment.baseUrl}/roles/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/roles`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/roles/${id}`, data);
  }

}
