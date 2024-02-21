import { Component, OnInit } from '@angular/core';
import {SafeResourceUrl , DomSanitizer} from '@angular/platform-browser';
import { OfficeAccount } from 'src/app/models/officeaccount.model';
import { Voucher } from 'src/app/models/voucher.model';
import { VoucherService } from 'src/app/services/voucher.service';

@Component({
  selector: 'app-voucherreport',
  templateUrl: './voucherreport.component.html',
  styleUrls: ['./voucherreport.component.css'],
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
export class VoucherreportComponent implements OnInit {

  daybookForDialog!: Voucher;
  vouchers : Voucher[] = [];
  vouchertypes : Voucher[] = [];
  selectedVouchertype!: Voucher;
  companies : Voucher[] = [];
  selectedCompany!: Voucher;
  first = 0;
  rows = 10;
  dateTime = new Date();
  loginuid: number = +sessionStorage.getItem("loginid");
  voucherAccounts: OfficeAccount[];

  constructor(private voucherservice : VoucherService) { }

  ngOnInit(): void {
    this.daybookForDialog = {
      voucherfromdate: null!, vouchertodate: null!, vouchertypeid: null!, companyid: null! , vouchernumber : null!
  };
    // this.retrieveDayBook();
    this.retrieveAllVouchertypes();
    this.retrieveCompanies();
    this.dateTime.setDate(this.dateTime.getDate());
    // this.retrieveReportView();
    this.retrieveVoucherAccounts();

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
  retrieveVoucherAccounts(): void {
    this.voucherservice.getOfficeAccounts(this.loginuid)
      .subscribe({
        next: (data) => {
          this.voucherAccounts = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  retrieveCompanies(): void {
    this.voucherservice.getCompaniesByUser(this.loginuid)
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

  retrieveReportView(): void {
 
    this.voucherservice.vouchersReportView(this.daybookForDialog.vouchertypeid,this.daybookForDialog.companyid,this.daybookForDialog.vouchernumber,this.daybookForDialog.voucherfromdate,this.daybookForDialog.vouchertodate,this.daybookForDialog.accounttypeid)
      .subscribe({
        next: (data) => {
          this.vouchers = data; 
          console.log(data);      
        },
        error: (e) => console.error(e)
      });
  }

  onSearch(){
    this.retrieveReportView();
  }
  onReset(){
    this.daybookForDialog = {
      voucherfromdate: null!, vouchertodate: null!, vouchertypeid: null!, companyid: null! , vouchernumber : null!
  };
  } 

  getAccountTypes(oid : number) {
    this.voucherservice.getAccountsVoucher(oid)
    .subscribe({
      next: (data) => {
        this.voucherAccounts = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
    }
  BranchOnChange(company: number) {

    this.getAccountTypes(company);

  }
}
