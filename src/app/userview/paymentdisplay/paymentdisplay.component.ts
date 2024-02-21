import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paymenttype } from 'src/app/models/paymenttype';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-paymentdisplay',
  templateUrl: './paymentdisplay.component.html',
  styleUrls: ['./paymentdisplay.component.css']
})
export class PaymentdisplayComponent implements OnInit {

  paymentview;
  
  constructor(private _aroute:ActivatedRoute,private _route:Router) { }

  ngOnInit(): void {
    let pay;
    pay=this._aroute.snapshot.paramMap.get('queryParams');
    this.paymentview=JSON.parse(pay);
    console.log(this.paymentview)
  }
  
  back(){
    this._route.navigate(['/payment']);
  }

}
