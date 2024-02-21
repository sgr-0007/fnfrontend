import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalConstants } from 'src/app/common/global-constants';
import { OfficeAccount } from 'src/app/models/officeaccount.model';
import { SubLedger } from 'src/app/models/subledger';
import { Voucher } from 'src/app/models/voucher.model';
import { NormalledgerService } from 'src/app/services/normalledger.service';
import { SubLedgerService } from 'src/app/services/subledger.service';
import { VoucherService } from 'src/app/services/voucher.service';

@Component({
  selector: 'app-cbledgerreport',
  templateUrl: './cbledgerreport.component.html',
  styleUrls: ['./cbledgerreport.component.css']
})
export class CbledgerreportComponent implements OnInit {

  voucherAccounts: OfficeAccount[];

  companies : Voucher[] = [];
  daybookForDialog!:Voucher;
  dateTime = new Date();
  uurlString: string;
  reportUrl: any;
  dateValue: Date;
  todateValue: Date; 
  loginuid: number = +sessionStorage.getItem("loginid");
  reportU = GlobalConstants.reportUrl;
  normalledger: Voucher[];
  subledgs:SubLedger[];
  branches: Voucher[];

  constructor(private subledgservice : SubLedgerService,private normalledgerservice : NormalledgerService,private datePipe: DatePipe,private voucherservice : VoucherService,
    private _domsan  : DomSanitizer) { }

  ngOnInit(): void {
  
    this.retrieveCompanies();
    this.retrieveVoucherAccounts();
    this.retrieveBranches();
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

          this.voucherservice.getOfficeAccounts(this.loginuid)
          .subscribe({
            next: (adata) => {
              this.voucherAccounts = adata;
              this.AccountOnChange(adata[0].accounttypeid)
              this.voucherservice.getLastVdtest(data[0].companyid,adata[0].accounttypeid)
              .subscribe({
                next: (data) => {
                  console.log(data);
                },
                error: (e) => console.error(e)
              });
              console.log(adata);
            },
            error: (e) => console.error(e)
          });
        },
        error: (e) => console.error(e)
      });
  }

  AccountOnChange(accTypeId: number){
    this.loadLedgers(accTypeId);
   
   }
   loadLedgers(actype : number) {

    this.voucherservice.getDrLedgers()
    .subscribe({
      next: (data) => {
      data = data.filter(x=>x.companyid==null ||x.companyid==this.daybookForDialog.companyid);
        let ctype = this.companies.find(x=>x.companyid == this.daybookForDialog.companyid).companytypeid;
        if (ctype == 1) {
          this.normalledger = data.filter(x => x.accounttypeid == actype);

        }
        else if (ctype == 2) {
          this.normalledger = data.filter(x => (x.companytype == ctype || x.companytype == 1015) && x.accounttypeid == actype);

        }
        else if (ctype == 3) {
          this.normalledger = data.filter(x => (x.companytype == ctype || x.companytype == 1016) && x.accounttypeid == actype);

        }
        else {
          this.normalledger = data.filter(x => (x.companytype == ctype) && x.accounttypeid == actype);

        }        console.log(this.normalledger);
      },
      error: (e) => console.error(e)
    });

    
  }
  retrieveBranches(): void {
    this.voucherservice.getAllBranches()
      .subscribe({
        next: (data) => {
          this.branches = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  retrieveNormalledger(cid : number): void {
    this.voucherservice.getDrLedgers()
    .subscribe({
      next: (data) => {
        let ctype = this.companies.find(x => x.companyid == this.daybookForDialog.companyid).companytypeid;

        this.normalledger = data.filter(x => x.companytype == ctype);
        console.log(this.normalledger);
      },
      error: (e) => console.error(e)
    });
}
branchOnChange(cId: number){
  this.getAccountTypes(cId);

  this.voucherservice.getDrLedgers()
      .subscribe({
        next: (data) => {
          data = data.filter((x=>x.companyid==null ||x.companyid==this.daybookForDialog.companyid));
          let ctype = this.companies.find(x=>x.companyid == this.daybookForDialog.companyid).companytypeid;
          if (ctype == 1) {
            this.normalledger = data.filter(x => x.accounttypeid == this.daybookForDialog.accounttypeid);

          }
          else if (ctype == 2) {
            this.normalledger = data.filter(x => (x.companytype == ctype || x.companytype == 1015) && x.accounttypeid == this.daybookForDialog.accounttypeid);

          }
          else if (ctype == 3) {
            this.normalledger = data.filter(x => (x.companytype == ctype || x.companytype == 1016) && x.accounttypeid == this.daybookForDialog.accounttypeid);

          }
          else {
            this.normalledger = data.filter(x => (x.companytype == ctype) && x.accounttypeid == this.daybookForDialog.accounttypeid);

          }  
                    console.log(data);
        },
        error: (e) => console.error(e)
      });
 
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
  LedgerOnChange(_ledgerid:number){

    this.retrieveSubLedgs(_ledgerid);

  }
  retrieveSubLedgs(ledgid : number): void {
    this.subledgservice.getAll()
      .subscribe({
        next: (data) => {
          this.subledgs = data.filter(x=>x.ledgerid==ledgid);
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  onSearch(){
    var frdate = this.datePipe.transform(this.dateValue, 'yyyy-MM-dd');
    var todate = this.datePipe.transform(this.todateValue, 'yyyy-MM-dd');
    var branchid = (this.daybookForDialog.branchid!=null)?this.daybookForDialog.branchid:0;
    var subledgerid  = (this.daybookForDialog.subledgerid!=null)?this.daybookForDialog.subledgerid:0;
if(this.daybookForDialog.debitledger > 0)
{
    this.uurlString  = this.reportU+"CbLedger?companyid="+this.daybookForDialog.companyid+"&fromdate="+frdate+"&todate="+todate+"&ledgeralias="+ this.normalledger.find(x=>x.debitledger==this.daybookForDialog.debitledger).drledgeralias+"&branchid="+branchid+"&subledgerid="+subledgerid+"&aid="+this.daybookForDialog.accounttypeid;
}
else{
  this.uurlString  = this.reportU+"CbLedger?companyid="+this.daybookForDialog.companyid+"&fromdate="+frdate+"&todate="+todate+"&ledgeralias=all&branchid="+branchid+"&subledgerid="+subledgerid+"&aid="+this.daybookForDialog.accounttypeid;

}
    console.log( this.uurlString);
    this.reportUrl = this._domsan.bypassSecurityTrustResourceUrl(this.uurlString);

  }


}
