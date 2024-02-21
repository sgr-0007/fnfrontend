import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Payment } from 'src/app/models/payment';
import { Paymentdetails } from 'src/app/models/paymentdetails';
import { Paymenttype } from 'src/app/models/paymenttype';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-paymentedit',
  templateUrl: './paymentedit.component.html',
  styleUrls: ['./paymentedit.component.css']
})
export class PaymenteditComponent implements OnInit {
  paymenttype=[
    {pid:1,name:'Invoice Payment'},
    {pid:2,name:'Penality Payment'},
    {pid:3,name:'Interes Payment'},
  ]
   paymentmode=[
    {pid:1,name:'Cash'},
    {pid:2,name:'online'},
    {pid:3,name:'cheque'},
    {pid:4,name:'dd'},
  ]
  bankmode=[
    {pid:1,name:'NEFT'},
    {pid:2,name:'RTGS'},
    {pid:3,name:'IMPS'},
    {pid:4,name:'other'},
  ]

  constructor(private _payment:PaymentService,private _route:ActivatedRoute) { }
  payment:Payment=new Payment();
  currentDate:Date=new Date();
  paymnetstatus:Paymenttype[];
  paymentDetails:Paymentdetails=new Paymentdetails();
  selectedPaymentdetails:Paymentdetails[]=[];

  ngOnInit(): void {
    let paymentId = this._route.snapshot.paramMap.get('id');
    
    if(paymentId!=null|| paymentId!='0'){
        this.retrievePaymentDetailsById(paymentId);
       this.renderPaymentType();
       
    }
  }
  retrievePaymentDetailsById(paymentId){
    this._payment.getpaymentById(paymentId).subscribe((response)=>{
      console.log(response);
      this.payment=response;
      this.payment.paymentDate=new Date(this.payment.paymentDate)
      this.selectedPaymentdetails=this.payment.paymentDetails;
      console.log(this.payment.paymentDetails[0])
       this.paymentDetails=this.payment.paymentDetails[0];
       console.log(this.paymentDetails)
    });
  }


  save(payment1){
    console.log(payment1)
    this.payment.paymentDate=payment1.value.paymentDate;
    
    this.payment.paymentMode=payment1.value.paymentMode;
    console.log(this.payment);
  }
  
  renderPaymentType(){
    this._payment.getPaymentType().subscribe((response)=>{
      console.log(response)
      this.paymnetstatus=response;
      
    });
  }

}
