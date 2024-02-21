import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AucInvoiceDetails } from '../models/auc-invoice-details';
import { Financialyear } from '../models/financialyear';
import { Invoicedetails } from '../models/invoicedetails';
import { Itemsdetails } from '../models/itemsdetails';
import { Paymentterms } from '../models/paymentterms';
import { ServiceRate } from '../models/service-rate';

@Injectable({
  providedIn: 'root'
})
export class InvoiceserviceService {
  createVoucher(): any {
    throw new Error('Method not implemented.');
  }
  
  header:HttpHeaders;
  constructor(private http:HttpClient) { 
    this.header=new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*'});
  }


  getServiceRate():Observable<any>{
    return this.http.get<ServiceRate>(`${environment.baseUrl}/servicecharge`);  
  }

  getFinancialYearDetails():Observable<any>{
    return this.http.get<Financialyear>(`${environment.baseUrl}/invoice/period`);  
  }

  getItemDetails():Observable<any>{
    return this.http.get<Itemsdetails>(`${environment.baseUrl}/item`);
  }
  getPaymnetTermDetails():Observable<any>{
    return this.http.get<Paymentterms>(`${environment.baseUrl}/payment`);
  }

  saveInvoice(invoice:Invoicedetails){
    return this.http.post(`${environment.baseUrl}/invoice`, JSON.stringify(invoice),{'headers':this.header, observe: 'response' as 'response'})
    ;
  }
  saveInvoiceItem(invoice:Itemsdetails[],id:number){
    return this.http.post(`${environment.baseUrl}/invoice/items/${id}`, JSON.stringify(invoice),{'headers':this.header, observe: 'response' as 'response'})
    ;
  }

  getInvoiceDetails():Observable<any>{
    return this.http.get<Invoicedetails>(`${environment.baseUrl}/invoice`);
  }
  getInvoiceItemDetails(invoiceId:number):Observable<any>{
    return this.http.get<Itemsdetails>(`${environment.baseUrl}/invoicedetails/${invoiceId}`);
  }

  getInvoiceDetailsById(invoiceid:number):Observable<any>{
    return this.http.get<Invoicedetails>(`${environment.baseUrl}/invoice/${invoiceid}`);
  }
  
  getInvoiceNumber(officeid:number):Observable<any>{
    return this.http.get<Invoicedetails>(`${environment.baseUrl}/invoicenumber/${officeid}`);
  }

  approvestatus(invoiceid: number, approververifiedstatus: number,roleid:number) {
    return this.http.patch(`${environment.baseUrl}/invoice/approve/${invoiceid}/${approververifiedstatus}/${roleid}`,{'headers':this.header, observe: 'response' as 'response'})
    ;
  }

  getAUCInvoiceDetails():Observable<any>{
    return this.http.get<AucInvoiceDetails>(`${environment.baseUrl}/aucinvoiceheader`);
  }
  getAUCInvoiceDetailsByDate(from:Date,to:Date,cmpid:number):Observable<any>{
    return this.http.get<AucInvoiceDetails>(`${environment.baseUrl}/aucinvoiceheader/${from}/${to}/${cmpid}`);
  }

  approveAucInvoiceDetails(a:Array<AucInvoiceDetails>):Observable<any>{
    return this.http.put(`${environment.baseUrl}/auction/approvelist`,a);
  }
  createInvVoucher():Observable<any>{
    return this.http.post(`${environment.baseUrl}/aucvouchers`,null);
  }



  
}
