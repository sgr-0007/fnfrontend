import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AucInvoiceDetails } from '../models/auc-invoice-details';
import { Salenoteheaderdetails } from '../models/salenoteheaderdetails';

@Injectable({
  providedIn: 'root'
})
export class SalenoteService {

  header:HttpHeaders;
  constructor(private http:HttpClient) { 
    this.header=new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*'});
  }
  
  getAUCInvoiceDetailsByDate(from:Date,to:Date,cmpid:number):Observable<any>{
    
     return this.http.get<Salenoteheaderdetails>(`${environment.baseUrl}/aucsalenote/${from}/${to}/${cmpid}`);
  }



  approveAucInvoiceDetails(a:Array<Salenoteheaderdetails>):Observable<any>{
    return this.http.put(`${environment.baseUrl}/auction/pucapprovelist`,a);
  }

}
