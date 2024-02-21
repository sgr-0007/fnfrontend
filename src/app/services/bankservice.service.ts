import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ledgerbankdetails } from '../models/ledgerbankdetails';

@Injectable({
  providedIn: 'root'
})
export class BankserviceService {

  constructor(private http: HttpClient) { }

  getBankDetailsByledgerid(ledgerid: any): Observable<any> {
    /*  return this.http.get(`${environment.baseUrl}/creditlimit/${buyerid}`); */
     return this.http.get<Ledgerbankdetails>(`${environment.baseUrl}/bank/ledger/${ledgerid}`);
   }
   deleteBankList(bankList:Array<Ledgerbankdetails>){
    let options = {
      headers: new HttpHeaders(),
      body: bankList
    };
    console.log(options)
    return this.http.delete(`${environment.baseUrl}/bank/delete`,options);
   }
}
