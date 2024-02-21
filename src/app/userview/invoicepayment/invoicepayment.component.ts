import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Invoicedetails } from 'src/app/models/invoicedetails';
import { Payment } from 'src/app/models/payment';
import { Paymentdetails } from 'src/app/models/paymentdetails';
import { Paymenttype } from 'src/app/models/paymenttype';
import { PaymentService } from 'src/app/services/payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoicepayment',
  templateUrl: './invoicepayment.component.html',
  styleUrls: ['./invoicepayment.component.css']
})
export class InvoicepaymentComponent implements OnInit {

  //static declared values

/*   paymentstatus=[
    {pid:1,name:'Partial Payment'},
    {pid:2,name:'Full Payment'}
  ]
 */   paymenttype=[
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
  @Input() payinvoicedetails:Invoicedetails=new Invoicedetails();
  @Output() paystatus = new EventEmitter<boolean>();
  paymentdone:boolean;
  constructor(private _payment:PaymentService,private _route:ActivatedRoute) { }
  payment:Payment=new Payment();
  currentDate:Date=new Date();
  paymnetstatus:Paymenttype[];
  paymentDetails:Paymentdetails=new Paymentdetails();
  selectedPaymentdetails:Paymentdetails[]=[];
  
  ngOnInit(): void {
    this.renderPaymentType();
    console.log(this.payinvoicedetails)
    
  }


  change(){
    this.paymentDetails= new Paymentdetails();
  }

  save(event:NgForm){
    console.log(event.value);
    this.payment.paymentDate=event.value.paymentDate;
    
    this.payment.paymentMode=event.value.paymentMode;
    console.log(this.paymentDetails)
    this.paymentDetails.paymentMode=this.payment.paymentMode
    this.selectedPaymentdetails.push(this.paymentDetails)
    console.log(this.selectedPaymentdetails)
    this.payment.paymentDetails=this.selectedPaymentdetails;
    console.log(this.payment)

    this._payment.registerPayment(this.payment,this.payinvoicedetails.invoiceid).subscribe(
      (response)=>{
          console.log(response)
        Swal.fire("Success","Payment Success")  
        this.paymentdone=true; 
        
        this.paystatus.emit(!this.paymentdone);
        event.reset();
      },
      (error)=>{
        console.log(error)
        Swal.fire("Failed","Payment failed please try after sometime");   
        this.paymentdone=false;
        this.paystatus.emit(!this.paymentdone);
      }
    );
  }

  renderPaymentType(){
    this._payment.getPaymentType().subscribe((response)=>{
      console.log(response)
      this.paymnetstatus=response;
      
    });
  }


}
