import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Companytype } from 'src/app/models/companytype.model';
import { Companymaster } from 'src/app/models/companymaster.model';
import { City } from '../models/city';
import { State } from '../models/state';


@Injectable({
  providedIn: 'root'
})

export class CompanymasterService {
    constructor(private http: HttpClient) {}

  getAll(): Observable<Companymaster[]> {
    return this.http.get<Companymaster[]>(`${environment.baseUrl}/companies`);
  }
  getCities(stateid): Observable<City[]> {
    return this.http.get<City[]>(`${environment.baseUrl}/cities/${stateid}`);
  }
  getState(): Observable<State[]> {
    return this.http.get<State[]>(`${environment.baseUrl}/state`);
  }
  getCompanyType(): Observable<Companytype[]> {
    return this.http.get<Companytype[]>(`${environment.baseUrl}/companytypes`);
  }

  get(id: any): Observable<Companymaster> {
    return this.http.get(`${environment.baseUrl}/companies/${id}`);
  }
  getNative(): Observable<Companymaster[]> {
    return this.http.get<Companymaster[]>(`${environment.baseUrl}/companiesnative`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/companies`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/Company/${id}`, data);
  }
  getBranchByCompanyTypeid(id: any): Observable<Companymaster[]> {
    return this.http.get<Companymaster[]>(`${environment.baseUrl}/company/companytype/${id}`);
  }

   }
