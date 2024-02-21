import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalConstants } from 'src/app/common/global-constants';
import { OfficeAccount } from 'src/app/models/officeaccount.model';
import { Voucher } from 'src/app/models/voucher.model';
import { NormalledgerService } from 'src/app/services/normalledger.service';
import { VoucherService } from 'src/app/services/voucher.service';
@Component({
  selector: 'app-bssch',
  templateUrl: './bssch.component.html',
  styleUrls: ['./bssch.component.css']
})
export class BsschComponent implements OnInit {

 
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
  schs = [
    { schname: "All", schid: 12 },
    { schname: "1", schid: 1 },
    { schname: "2", schid: 2 },
    { schname: "3", schid: 3 },
    { schname: "4", schid: 4 },
    { schname: "5", schid: 5 },
    { schname: "6", schid: 6 },
    { schname: "7", schid: 7 },
    { schname: "8", schid: 8 },
    { schname: "9", schid: 9 },
    { schname: "10", schid: 10 },
    { schname: "11", schid: 11 }
  ];

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
    var sch = ""+this.daybookForDialog.schid;
    sch = (sch==='12')?'All': ""+this.daybookForDialog.schid
  this.uurlString  = this.reportU+"BSSch?companyid="+this.daybookForDialog.companyid+"&fromdate="+frdate+"&todate="+todate+"&sch="+sch;
    console.log( this.uurlString);
    this.reportUrl = this._domsan.bypassSecurityTrustResourceUrl(this.uurlString);

  }

}
