import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CheckUniqueService {

  constructor(private http: HttpClient) { }


  checkUnique(id:number,name:string,ep: string): Observable<any> {
        let params = new HttpParams()
        .set('id', id)
        .set('name', name)
        return this.http.get<any>(`${environment.baseUrl}/${ep}`,{params:params});
      }
      
  checkUniqueEid(id:number,empid:string,ep: string): Observable<any> {
    let params = new HttpParams()
    .set('id', id)
    .set('empid', empid)
    return this.http.get<any>(`${environment.baseUrl}/${ep}`,{params:params});
  }
}


