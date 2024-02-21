import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Payment } from 'src/app/models/payment';

@Component({
  selector: 'app-paymentreciept',
  templateUrl: './paymentreciept.component.html',
  styleUrls: ['./paymentreciept.component.css']
})
export class PaymentrecieptComponent implements OnInit,OnChanges {
  @Input() printingDetails:Payment;
  @Input() print;
  @Output() printv;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.print){
      console.log("made")
      window.print()
      
    }
  }

  ngOnInit(): void {
    console.log("HI")
    
  }

}
