import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BalanceGroup } from '../models/balancegroup';
import { Group } from '../models/group.model';




@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Group[]> {
    return this.http.get<Group[]>(`${environment.baseUrl}/groups`);
  }

  get(id: any): Observable<Group> {
    return this.http.get(`${environment.baseUrl}/groups/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/groups`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/groups/${id}`, data);
  }

  getAllBalanceSheetGroups(): Observable<BalanceGroup[]> {
    return this.http.get<BalanceGroup[]>(`${environment.baseUrl}/balancesheetgroups`);

    
  }
  checkUnique(id:number,name:string): Observable<any> {
        let params = new HttpParams()
        .set('id', id)
        .set('name', name)
        return this.http.get<any>(`${environment.baseUrl}/checkgroupuniqueonedit`,{params:params});
      }
}


