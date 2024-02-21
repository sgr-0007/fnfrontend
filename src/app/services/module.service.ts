import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Moduletype } from '../models/moduletype';
import { Officebyrole } from '../models/officebyrole';
import { Userrolemodule } from '../models/userrolemodule';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http:HttpClient) { }

  getModules(): Observable<any> {
    return this.http.get<Moduletype[]>(`${environment.baseUrl}/module/type`);
  }

  getModulesByRole(roleid:number){
    return this.http.get<Moduletype[]>(`${environment.baseUrl}modulebyrole/${roleid}`);
  }

  assignUserRoleModule(userrolemodule:Userrolemodule):Observable<any>{
    return this.http.post<Userrolemodule>(`${environment.baseUrl}/role/assign`,userrolemodule);
  }

  assignOfficeByRole(officebyrole:Officebyrole){
    return this.http.post<Officebyrole>(`${environment.baseUrl}/role/assign/office`,officebyrole);
  }
}
