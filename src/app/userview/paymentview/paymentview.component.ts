import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Invoicedetails } from 'src/app/models/invoicedetails';
import { Payment } from 'src/app/models/payment';
import { InvoiceserviceService } from 'src/app/services/invoiceservice.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-paymentview',
  templateUrl: './paymentview.component.html',
  styleUrls: ['./paymentview.component.css']
})
export class PaymentviewComponent implements OnInit {
  first = 0;
  invoiceDetails:Invoicedetails=new Invoicedetails();
  rows = 10;
  title="PayMent Reconcilation"
  paymentdetails:Payment[]=[];
  tempaucinvdetails:Payment[]=[];
  selectedprint:Payment;
  print:boolean=false;
  uurlString: string;
  reportUrl: SafeResourceUrl ;
  reportU = GlobalConstants.reportUrl;
  paymentReconcile:Payment=new Payment();
  auctiontype:any[];
  approval=[{
    aid:1,aname:"Not Approved"
  },{
    aid:2,aname:"Approved"
  }
]
selectedauctionType:number;
  dialougeOpen:boolean=false;
  constructor(private _paymentService:PaymentService,private _domsan  : DomSanitizer,private _invoiceService:InvoiceserviceService,private _router:Router) {
    this.auctiontype=[{id:1,label:'Admin'},{id:8,label:'Auction'}];
   }


  ngOnInit(): void {
    this.renderpaymentview()
  
  }
  renderpaymentview(){
     this._paymentService.getAllPayment().subscribe((response)=>{
       console.log(response);
       this.paymentdetails=response
       this.tempaucinvdetails=this.paymentdetails;
    });
}

filterbyAuctionType(){
  console.log("selected value"+this.selectedauctionType)
  
  this.paymentdetails=this.tempaucinvdetails;
  if(this.selectedauctionType!=null)
  console.log(this.paymentdetails=this.paymentdetails.filter(x=>x.adminorauction===this.selectedauctionType
  ))
}

fileleUpload(){
  this.dialougeOpen=true;
}


save(pay){
  console.log(pay);
  this.paymentReconcile=pay;
  
  //this._paymentService.updateBankReconcilation(this.paymentReconcile).subscribe();
}

next() {
  this.first = this.first + this.rows;
}

prev() {
  this.first = this.first - this.rows;
}

reset() {
  this.first = 0;
}

isLastPage(): boolean {
  return this.paymentdetails ? this.first === (this.paymentdetails.length - this.rows): true;
}

isFirstPage(): boolean {
  return this.paymentdetails ? this.first === 0 : true;
}
printPage(pay){
  this.print=true;
    this.selectedprint=pay;
   console.log(this.selectedprint)
    /* window.print(); */
    this.uurlString  = this.reportU+"paymentreciept?paymentid="+pay.paymentid;
this.reportUrl = this._domsan.bypassSecurityTrustResourceUrl(this.uurlString);
console.log(this.reportUrl)
  
}


renderInvoiceById(invoiceid:number){
  this._invoiceService.getInvoiceDetailsById(invoiceid).subscribe((response)=>{
    console.log(response);  
    
    this.invoiceDetails=response;})
}

view(pay){
  this._router.navigate(['/paydisplay', {queryParams:JSON.stringify(pay)}]);
}


edit(pay){
  this._router.navigate(['updatepayment/',pay.paymentid]);
}







}


