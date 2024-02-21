import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from 'src/app/models/department.model';
import { Usermaster } from 'src/app/models/usermaster.model';
import { Desgination } from 'src/app/models/desgination.model';
import { Post } from 'src/app/models/post.model'
import { Userdetails } from '../models/userdetails';
import { Userpath } from '../models/userpath';

@Injectable({
  providedIn: 'root'
})
export class UsermasterService {

  constructor(private http: HttpClient) {}
  getAll(): Observable<Usermaster[]> {
    return this.http.get<Usermaster[]>(`${environment.baseUrl}/users`);
  }
  getAllUsers(): Observable<Usermaster[]> {
    return this.http.get<Usermaster[]>(`${environment.baseUrl}/userslist`);
  }
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${environment.baseUrl}/departmentsoffices`);
  }
  getDepartmentsSections(): Observable<Department[]> {
    return this.http.get<Department[]>(`${environment.baseUrl}/departmentssections`);
  }
  getDesignations(): Observable<Desgination[]> {
    return this.http.get<Desgination[]>(`${environment.baseUrl}/designations`);
  }
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.baseUrl}/Posts`);
  }
  get(id: any): Observable<Usermaster> {
    return this.http.get(`${environment.baseUrl}/users/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/users`, data);
  }

  update(id: any, data: any): Observable<any> {
    console.log(data)
    return this.http.put(`${environment.baseUrl}/user/${id}`, data);
  }

  checkemployeeid(employeeid):Observable<boolean>{
    return this.http.get<boolean>(`${environment.baseUrl}/user/employee/${employeeid}`);
  }

  userModuleCheck(id: any): Observable<Usermaster> {
    return this.http.get(`${environment.baseUrl}/usermodulecheck/${id}`);
  }
  userRoleCheck(id: any,moduleid:any): Observable<Usermaster> {
    return this.http.get(`${environment.baseUrl}/userrolecheck/${id}/${moduleid}`);
  }

  getUserRoleOffice(userid):Observable<Userdetails>{
    return this.http.get<Userdetails>(`${environment.baseUrl}/user/role/office/${userid}`);
  }

  checkUniqueMobileNumber(mobilenumber:string):Observable<Boolean>{
    return this.http.get<Boolean> (`${environment.baseUrl}/checkuniquemobilenumber/${mobilenumber}`)
  }

  checkModuleByUser(userpath:Userpath):Observable<boolean>{
    return this.http.post<boolean> (`${environment.baseUrl}/checkavailablemodule`,userpath);
  }

  
}
