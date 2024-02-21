import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalConstants } from 'src/app/common/global-constants';
import { OfficeAccount } from 'src/app/models/officeaccount.model';
import { Voucher } from 'src/app/models/voucher.model';
import { VoucherService } from 'src/app/services/voucher.service';

@Component({
  selector: 'app-cashbookreportview',
  templateUrl: './cashbookreportview.component.html',
  styleUrls: ['./cashbookreportview.component.css']
})
export class CashbookreportviewComponent implements OnInit {
  companies : Voucher[] = [];
  daybookForDialog!:Voucher;
  dateTime = new Date();
  uurlString: string;
  reportUrl: any;
  dateValue: Date;
  loginuid: number = +sessionStorage.getItem("loginid");
  reportU = GlobalConstants.reportUrl;
  voucherAccounts: OfficeAccount[];

  constructor(private datePipe: DatePipe,private voucherservice : VoucherService,
    private _domsan  : DomSanitizer) { }

  ngOnInit(): void {
    this.retrieveVoucherAccounts();

    this.retrieveCompanies();
    this.dateValue = new Date();
    this.dateValue.setMonth(this.dateValue.getMonth()); 
       this.daybookForDialog = {
      voucherfromdate: null!, vouchertodate: null!, companyid: null! 
  };
  
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
  onSearch(){
    var frdate = this.datePipe.transform(this.dateValue, 'yyyy-MM-dd');
    var todate = this.datePipe.transform(this.dateValue, 'yyyy-MM-dd');

    this.uurlString  = this.reportU+"CashBookReportViewer?companyid="+this.daybookForDialog.companyid+"&fromdate="+frdate+"&todate="+frdate+"&accounttypeid="+this.daybookForDialog.accounttypeid;
    this.reportUrl = this._domsan.bypassSecurityTrustResourceUrl(this.uurlString);

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
