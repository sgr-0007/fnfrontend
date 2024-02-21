import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Roleofficemapping } from '../models/roleofficemapping';
import { Userrolemodule } from '../models/userrolemodule';

@Injectable({
  providedIn: 'root'
})
export class RolemappingService {

  constructor(private http:HttpClient) { }

  public saveRoleMapping(userrole:Userrolemodule):Observable<any>{
    return this.http.post<Userrolemodule>(`${environment.baseUrl}/role/assign`,userrole);
  }
  public saveOfficeMapping(userrole:Roleofficemapping):Observable<any>{
    return this.http.post<Userrolemodule>(`${environment.baseUrl}/role/assign/office`,userrole);
  }
}
