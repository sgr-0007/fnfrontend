import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Aucbuyer } from '../models/aucbuyer';
import { Aucgrower } from '../models/aucgrower';

@Injectable({
  providedIn: 'root'
})
export class AucledgerService {

  constructor(private http: HttpClient) { }

  getAuctionBuyerledger(cmpid:number): Observable<any> {
    /*  return this.http.get(`${environment.baseUrl}/creditlimit/${buyerid}`); */
     return this.http.get<Aucbuyer>(`${environment.baseUrl}/aucbuyerledger/${cmpid}`);
   }

   approveBuyerledger(a:Array<Aucbuyer>):Observable<any>{
    console.log("buyer for approval"+a);
    return this.http.put(`${environment.baseUrl}/auction/approvebuyerlist`,a);
   }

   
  getAuctionGrowerledger(cmpid:number): Observable<any> {
    /*  return this.http.get(`${environment.baseUrl}/creditlimit/${buyerid}`); */
     return this.http.get<Aucgrower>(`${environment.baseUrl}/aucgrowerledger/${cmpid}`);
  }

  approveGrowerledger(a:Array<Aucgrower>):Observable<any>{
    console.log("buyer for approval"+a);
    return this.http.post(`${environment.baseUrl}/aucgowerledger`,a);
   }

   createBuyerledger():Observable<any>{
    return this.http.get(`${environment.baseUrl}/auctbuyerledger`);
   }
}
