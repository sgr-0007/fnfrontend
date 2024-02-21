import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Companymaster } from '../models/companymaster.model';
import { Companytype } from '../models/companytype.model';
import { Group } from '../models/group.model';
import { Normalledger } from '../models/normalledger.model';
import { Subgroup } from '../models/subgroup.model';

@Injectable({
  providedIn: 'root'
})
export class NormalledgerService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Normalledger[]> {
    return this.http.get<Normalledger[]>(`${environment.baseUrl}/normalledgertable`);
  }
  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${environment.baseUrl}/groups`);
  }
  getSubgroups(): Observable<Subgroup[]> {
    return this.http.get<Subgroup[]>(`${environment.baseUrl}/subgrouptable`);
  }
  getCompanies(): Observable<Companymaster[]> {
    return this.http.get<Companymaster[]>(`${environment.baseUrl}/companiesnative`);
  }
  // getCompanies(): Observable<Companymaster[]> {
  //   return this.http.get<Companymaster[]>(`${environment.baseUrl}/companies`);
  // }

  get(id: any): Observable<Normalledger> {
    return this.http.get(`${environment.baseUrl}/normalledger/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/normalledger`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/normalledger/${id}`, data);
  }
  getAllCtypes(): Observable<Companytype[]> {
    return this.http.get<Companytype[]>(`${environment.baseUrl}/companytypes`);
  }

}