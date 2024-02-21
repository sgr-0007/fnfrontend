import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalConstants } from 'src/app/common/global-constants';
import { OfficeAccount } from 'src/app/models/officeaccount.model';
import { Voucher } from 'src/app/models/voucher.model';
import { NormalledgerService } from 'src/app/services/normalledger.service';
import { VoucherService } from 'src/app/services/voucher.service';

@Component({
  selector: 'app-recbcover',
  templateUrl: './recbcover.component.html',
  styleUrls: ['./recbcover.component.css']
})
export class RecbcoverComponent implements OnInit {

 
  companies : Voucher[] = [];
  daybookForDialog!:Voucher;
  dateTime = new Date();
  uurlString: string;
  reportUrl: any;
  dateValue: Date;
  todateValue: Date; 
  loginuid: number = +sessionStorage.getItem("loginid");
  reportU = GlobalConstants.reportUrl;
  voucherAccounts: OfficeAccount[];
  normalledger: Voucher[];

  constructor(private normalledgerservice : NormalledgerService,private datePipe: DatePipe,private voucherservice : VoucherService,
    private _domsan  : DomSanitizer) { }

  ngOnInit(): void {
  
    this.retrieveCompanies();
    this.retrieveVoucherAccounts();

    this.dateValue = new Date();
    this.dateValue.setMonth(this.dateValue.getMonth()); 
    this.todateValue = new Date();
    this.todateValue.setMonth(this.todateValue.getMonth()); 
       this.daybookForDialog = {
      voucherfromdate: null!, vouchertodate: null!, companyid: null! 
  };
  
  }
  retrieveCompanies(): void {
    this.voucherservice.getCompaniesByUser(this.loginuid)
      .subscribe({
        next: (data) => {
          this.companies = data.filter(s => s.isactive);
          this.retrieveNormalledger(data[0].companyid);
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  retrieveNormalledger(cid : number): void {
    this.voucherservice.getDrLedgers()
    .subscribe({
      next: (data) => {
        this.normalledger = data.filter(x => x.companyid == cid);
        console.log(this.normalledger);
      },
      error: (e) => console.error(e)
    });
}
branchOnChange(cId: number){
  this.retrieveNormalledger(cId);
 
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
    var todate = this.datePipe.transform(this.todateValue, 'yyyy-MM-dd');

  this.uurlString  = this.reportU+"RecBankCover?companyid="+this.daybookForDialog.companyid+"&fromdate="+frdate+"&todate="+todate+"&vid=0";
    console.log( this.uurlString);
    this.reportUrl = this._domsan.bypassSecurityTrustResourceUrl(this.uurlString);

  }
}
