import { Injectable } from '@angular/core';
import { SalesLedger } from '../models/sales-ledger';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { City } from '../models/city';
import { State } from '../models/state';
import { Subgroupdetails } from '../models/subgroupdetails';
import { Groupdetails } from '../models/groupdetails';

@Injectable({
  providedIn: 'root'
})
export class SalesledgerService {
header:HttpHeaders;
salesLedgerTemp:SalesLedger=new SalesLedger

  constructor(private http:HttpClient) { 
    this.header=new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*'});
  }
  

  createSalesLedger(createSalesLedger:SalesLedger){
    this.salesLedgerTemp=createSalesLedger;
    console.log(JSON.stringify(this.salesLedgerTemp))
    return this.http.post(`${environment.baseUrl}/create/salesledger`, JSON.stringify(this.salesLedgerTemp),{'headers':this.header, observe: 'response' as 'response'});
  }

  getAllLedgerDetails():Observable<any>{
    return this.http.get<SalesLedger[]>(`${environment.baseUrl}/sales/ledger`);  
  }

  getLedgerDetailsByCat(cat:number):Observable<any>{
    return this.http.get<SalesLedger[]>(`${environment.baseUrl}/ledger/category/${cat}`);  
  }

  getSalesLedgerDetailsById(id:number):Observable<any>{
    return this.http.get<SalesLedger>(`${environment.baseUrl}/sales/ledger/${id}`);  
  }
  updateSalesLedger(ledgerUpdate: SalesLedger) {
    console.log("lEDGER UPDTAE "+JSON.stringify(ledgerUpdate));
      return this.http.put<SalesLedger>(`${environment.baseUrl}/sale/ledger/${ledgerUpdate.ledgerId}`,JSON.stringify(ledgerUpdate),{'headers':this.header});
  }
  updateApprovalStatus(ledgerUpdate:SalesLedger){
    console.log(ledgerUpdate)
    return this.http.put<SalesLedger>(`${environment.baseUrl}/ledger/status/${ledgerUpdate.ledgerId}/${ledgerUpdate.recordApprovalStatus}/${ledgerUpdate.modifiedBy}`,{'headers':this.header});
  }

 deleteSalesLedger(ledgerUpdate:SalesLedger){
   console.log("Ledger Delete")
   return this.http.delete<SalesLedger>(`${environment.baseUrl}/sales/ledger/${ledgerUpdate.ledgerId}`);
 }
 
  getCities():Observable<any>{
    return this.http.get<City[]>(`${environment.baseUrl}/city`).pipe(
      map(res=>res.map(data=>{
        return data;
      }))
    );  
  }

  getStates():Observable<any>{
    return this.http.get<State[]>(`${environment.baseUrl}/state`);  
  }

  getLedgerName():Observable<any>{
    return this.http.get<String[]>(`${environment.baseUrl}/sales/ledgername`);
  }

  getLedgerAlias():Observable<any>{
    return this.http.get<String[]>(`${environment.baseUrl}/sales/ledgeralias`);
  }
  getBuyerDetails(companyid):Observable<any>{
    return this.http.get<SalesLedger[]>(`${environment.baseUrl}/ledger/sales/${companyid}`);  
  }

  getSellerDetails(companyid):Observable<any>{
    return this.http.get<SalesLedger[]>(`${environment.baseUrl}/ledger/purchase/${companyid}`);  
  }
  getcompanybyid(ct1:number,ct2:number):Observable<any>{
    return this.http.get<SalesLedger[]>(`${environment.baseUrl}/company/type/${ct1}/${ct2}`);  
  }
  getGroupId(name:string){
    return this.http.get<Groupdetails[]>(`${environment.baseUrl}/ledger/${name}`);   
  }
  getSubGroupId(groupid:number){
    return this.http.get<Subgroupdetails[]>(`${environment.baseUrl}/ledger/salespurchasesubgroup/${groupid}`);   
  }


}
