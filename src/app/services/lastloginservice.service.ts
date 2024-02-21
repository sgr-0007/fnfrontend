import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Lastlogin } from '../models/lastlogin';

@Injectable({
  providedIn: 'root'
})
export class LastloginserviceService {

  constructor(private http: HttpClient) { }


  getLastLogin(userid): Observable<Lastlogin> {
    return this.http.get<Lastlogin>(`${environment.baseUrl}/lastlogin/${userid}`);
  }

  saveLastLogin(userid):Observable<any>{
    return this.http.put(`${environment.baseUrl}/lastlogindetails/${userid}`,null);
  }

}
