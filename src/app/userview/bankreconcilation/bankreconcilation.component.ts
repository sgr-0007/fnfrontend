import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bankreconcilation',
  templateUrl: './bankreconcilation.component.html',
  styleUrls: ['./bankreconcilation.component.css']
})
export class BankreconcilationComponent implements OnInit {
  title="Bank Reconcilation"
  paymentdetails:Payment[]=[];
  currentDate:Date=new Date();
  paymentReconcile:Payment=new Payment();
  approval=[{
    aid:1,aname:"Not Approved"
  },{
    aid:2,aname:"Approved"
  }
]
first = 0;

    rows = 10;
  dialougeOpen:boolean=false;
  constructor(private _paymentService:PaymentService,
    private dateformat:DatePipe) { }

  ngOnInit(): void {
    console.log(this.currentDate.getDate())
        this.renderpaymentview();
  }

  renderpaymentview(){
      this._paymentService.getAllPayment().subscribe((response)=>{
        console.log(response);
        this.paymentdetails=response;
        this.paymentdetails.forEach((x)=>{if(x.realizedDate!=null)console.log(x.realizedDate=new Date(x.realizedDate))})
        
      });
  }


  fileleUpload(){
    this.dialougeOpen=true;
  }

  /* printPage() {
    window.print();
  } */

  save(pay){
    Swal.fire("Success!","Bank Reconcilation successful","success").then(
     (okay)=> {if(okay)this.renderpaymentview();}
    )
    console.log(pay);
    this.paymentReconcile=pay;
    this._paymentService.updateBankReconcilation(this.paymentReconcile).subscribe();
    
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

}
