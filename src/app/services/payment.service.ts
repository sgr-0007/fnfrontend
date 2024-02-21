import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment';
import { Paymenttype } from '../models/paymenttype';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  header:HttpHeaders;
  constructor(private http:HttpClient) {
    this.header=new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*'});
   }

   insertInvoiceDetails(paymentinvoice:number){
    return this.http.post(`${environment.baseUrl}/payment/${paymentinvoice}`,{'headers':this.header, observe: 'response' as 'response'});
   }

   registerPayment(payment:Payment,invoiceId:number){
     console.log(payment.paymentStatus)

    return this.http.patch(`${environment.baseUrl}/payment/${invoiceId}`,payment);
   }
   getPaymentType():Observable<Paymenttype[]>{
     return this.http.get<Paymenttype[]>(`${environment.baseUrl}/payment/type`);
   }

   getAllPayment():Observable<Payment[]>{
     return this.http.get<Payment[]>(`${environment.baseUrl}/payment/view`)
   }

   getpaymentById( paymentid:number):Observable<Payment>{
    return this.http.get<Payment>(`${environment.baseUrl}/payment/${paymentid}`);
   }

   updateBankReconcilation(payment:Payment){
    return this.http.patch(`${environment.baseUrl}/payment/`,payment);
   }




}
