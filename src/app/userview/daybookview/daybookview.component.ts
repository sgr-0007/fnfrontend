import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Voucher } from 'src/app/models/voucher.model';
import { VoucherService } from 'src/app/services/voucher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-daybookview',
  templateUrl: './daybookview.component.html',
  styleUrls: ['./daybookview.component.css'],
  styles: [`
        :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
            position: -webkit-sticky;
            position: sticky;
            top: 1rem;
        }

        .layout-news-active :host ::ng-deep .p-datatable tr > th {
            top: 1rem;
        }
    `]
})
export class DaybookviewComponent implements OnInit {

  daybookForDialog!: Voucher;
  vouchers : Voucher[] = [];
  vouchertypes : Voucher[] = [];
  selectedVouchertype!: Voucher;
  companies : Voucher[] = [];
  selectedCompany!: Voucher;
  first = 0;
  rows = 10;
  dateTime = new Date();

  constructor(private voucherservice : VoucherService,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.daybookForDialog = {
      voucherfromdate: null!, vouchertodate: null!, vouchertypeid: null!, companyid: null! , vouchernumber : null!
  };
    // this.retrieveDayBook();
    this.retrieveAllVouchertypes();
    this.retrieveCompanies();
    this.dateTime.setDate(this.dateTime.getDate());
    this.retrieveDayBook();
    
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
    return this.vouchers ? this.first === (this.vouchers.length - this.rows): true;
  }

  isFirstPage(): boolean {
    return this.vouchers ? this.first === 0 : true;
  }
  retrieveCompanies(): void {
    this.voucherservice.getCompanies()
      .subscribe({
        next: (data) => {
          this.companies = data.filter(s => s.isactive);
          
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  
  retrieveAllVouchertypes(): void {
    this.voucherservice.getAllVoucherTypes()
      .subscribe({
        next: (data) => {
          this.vouchertypes = data;
         
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  retrieveDayBook(): void {

    var frdate = this.datePipe.transform(this.daybookForDialog.voucherfromdate, 'yyyy-MM-dd');
    console.log(frdate);
    this.voucherservice.dayBookView(this.daybookForDialog.vouchertypeid,this.daybookForDialog.companyid,this.daybookForDialog.vouchernumber,this.daybookForDialog.voucherfromdate,this.daybookForDialog.vouchertodate)
      .subscribe({
        next: (data) => {
          this.vouchers = data; 
          console.log(data);      
        },
        error: (e) => console.error(e)
      });
  }

  onSearch(){
    this.retrieveDayBook();
  }
  onReset(){
    this.daybookForDialog = {
      voucherfromdate: null!, vouchertodate: null!, vouchertypeid: null!, companyid: null! , vouchernumber : null!
  };
  }
  calculateLedgerDebitTotal(vnum : string){

    let totalLedgerDebit = 0;
     if(this.vouchers)
     {
        for (let ledgerTrail of this.vouchers) {
        if (ledgerTrail.vouchernumber === vnum) {
          totalLedgerDebit = totalLedgerDebit+ledgerTrail.debitamount;
        }
     }

     }
     return (totalLedgerDebit===0)?'':totalLedgerDebit;

  }

  calculateLedgerCreditTotal(vnum : string){
   
    let totalLedgerCredit = 0;
     if(this.vouchers)
     {
        for (let ledgerTrail of this.vouchers) {
        if (ledgerTrail.vouchernumber === vnum) {
          totalLedgerCredit = totalLedgerCredit+ledgerTrail.creditamount;
        }
     }

     }
     return (totalLedgerCredit ===0)?'':totalLedgerCredit;
  }

}
