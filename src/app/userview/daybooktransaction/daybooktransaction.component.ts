import { Component, OnInit } from '@angular/core';
import { Voucher } from 'src/app/models/voucher.model';
import { VoucherService } from 'src/app/services/voucher.service';

@Component({
  selector: 'app-daybooktransaction',
  templateUrl: './daybooktransaction.component.html',
  styleUrls: ['./daybooktransaction.component.css']
})
export class DaybooktransactionComponent implements OnInit {
  companies : Voucher[] = [];
  daybook : Voucher;
  isLoading  : boolean = true;
  daybookForDialog!:Voucher;
  dateTime = new Date();
  dateValue: Date;
  loginuid: number = +sessionStorage.getItem("loginid");
  constructor(private voucherservice : VoucherService) { }

  ngOnInit(): void {
    this.daybook = 
    {
    companyid : null!, ledgerid:null! , openingbalance:null! , closingbalance:null! ,isopened:null!, isclosed:null!

    }
    this.dateValue = new Date();
    this.dateValue.setMonth(this.dateValue.getMonth()); 
  
       this.daybookForDialog = {
      voucherfromdate: null! 
  };
    this.retrieveCompaniesDayBook();
    
    
  }
  retrieveCompaniesDayBook(): void {
    console.log(this.loginuid)
    this.isLoading = true;
    this.voucherservice.dayBookBind(this.dateValue,this.loginuid)
      .subscribe({
        next: (data) => {
       this.companies = data;
       this.isLoading = false;
          console.log(data);
        },
        error: (e) => { console.error(e);
          this.isLoading = false; } 
      });
  }
btnopenclick(company : Voucher){
  if(confirm("Do you want to open the daybook?")) {
this.daybook.companyid =company.companyid;
this.daybook.daybookdate = this.dateValue;
this.isLoading = true;
console.log(this.daybook)
this.voucherservice.openDayBook(this.daybook)
.subscribe({
  next: (data) => {
   
    console.log(data);
   // this.ngOnInit();
   this.datechange();
  },
  error: (e) => {console.error(e); this.isLoading = false;}
});

  
}

}

btncloseclick(company : Voucher){ 
  if(confirm("Do you want to close the daybook?")) {
  this.daybook.companyid =company.companyid;
  this.daybook.daybookdate = this.dateValue;
this.voucherservice.closeDayBook(this.daybook.companyid,this.daybook.daybookdate)
.subscribe({
  next: (data) => {
   
    // this.ngOnInit();
    this.datechange();
  },
  error: (e) => console.error(e)
});

  }
}

datechange()
{
  this.retrieveCompaniesDayBook();
}
}
