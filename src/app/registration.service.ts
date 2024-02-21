import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { environment } from 'src/environments/environment';
import { Officebyrole } from './models/officebyrole';
import { Dofficebyrole } from './models/dofficebyrole';
import { Userrolemodule } from './models/userrolemodule';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private _http : HttpClient) { }

  public loginUserFromRemote(user :User):Observable<any>{

    return this._http.post<any>(`${environment.baseUrl}/login`,user)   
  }
  public updtaePassword(user:User):Observable<any>{
    return this._http.put(`${environment.baseUrl}/update`,user)
  }

  public getUserDetails():Observable<any>{
    return this._http.get<User[]>(`${environment.baseUrl}/user`)
  }

  public getOfficeByRole(roleid:number):Observable<any>{
    return this._http.get<[Dofficebyrole]>(`${environment.baseUrl}/modulebyrole/${roleid}`)
  }

  public getModuleRoleByUser(roleid:number):Observable<any>{
    return this._http.get<[Userrolemodule]>(`${environment.baseUrl}/getuserrolemodulebyuiserid/${roleid}`)
  }
  public getOfficeByUser(userid:number):Observable<any>{
    return this._http.get<[Officebyrole]>(`${environment.baseUrl}/officebyrole/${userid}`)
  }

  
}
