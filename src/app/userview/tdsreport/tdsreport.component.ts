import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Itdetails } from 'src/app/models/itdetails.model';
import { OfficeAccount } from 'src/app/models/officeaccount.model';
import { Voucher } from 'src/app/models/voucher.model';
import { VoucherService } from 'src/app/services/voucher.service';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-tdsreport',
  templateUrl: './tdsreport.component.html',
  styleUrls: ['./tdsreport.component.css']
})
export class TdsreportComponent implements OnInit {

  companies : Voucher[] = [];
  daybookForDialog!:Itdetails;
  dateTime = new Date();
  uurlString: string;
  reportUrl: any;
  dateValue: Date;
  todateValue: Date; 
  loginuid: number = +sessionStorage.getItem("loginid");
  reportU = GlobalConstants.reportUrl;
  voucherAccounts: OfficeAccount[];
  returns = [
    { returnname: "24 q", returnid: 1 },
    { returnname: "26 q", returnid: 2 },
   

  ];
  rtypes = [
    { rtype: "Day-wise", rtypeid: 1 },
    { rtype: "Monthly", rtypeid: 2 },
    { rtype: "Yearly", rtypeid: 3 },
   

  ];
  month: Date;
  year : Date;
  constructor(private datePipe: DatePipe,private voucherservice : VoucherService,
    private _domsan  : DomSanitizer) { }

  ngOnInit(): void {
  
    // this.retrieveCompanies();
    // this.retrieveVoucherAccounts();

    this.dateValue = new Date();
    this.dateValue.setMonth(this.dateValue.getMonth()); 
    this.todateValue = new Date();
    this.todateValue.setMonth(this.todateValue.getMonth()); 

    this.month = new Date();
    this.month.setMonth(this.month.getMonth());

    this.year = new Date();
    this.year.setMonth(this.year.getMonth());

       this.daybookForDialog = {
      returnid: null!, returnname: null!
  };
  
  }
  // retrieveCompanies(): void {
  //   this.voucherservice.getCompaniesByUser(this.loginuid)
  //     .subscribe({
  //       next: (data) => {
  //         this.companies = data.filter(s => s.isactive);
          
  //         console.log(data);
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }
  // retrieveVoucherAccounts(): void {
  //   this.voucherservice.getOfficeAccounts(this.loginuid)
  //     .subscribe({
  //       next: (data) => {
  //         this.voucherAccounts = data;
  //         console.log(data);
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }
  onSearch(){

    this.daybookForDialog.returnname = this.returns.find(x=>x.returnid==this.daybookForDialog.returnid).returnname;
    if(this.daybookForDialog.rtypeid==1)
    {

    var frdate = this.datePipe.transform(this.dateValue, 'yyyy-MM-dd');
this.uurlString  =this.reportU+"tdsdaywise?return="+this.daybookForDialog.returnname+"&fromdate="+frdate;
  this.reportUrl = this._domsan.bypassSecurityTrustResourceUrl(this.uurlString);

    }
    if(this.daybookForDialog.rtypeid==2)
    {
      let monthvalue = this.month.getMonth()+1;
      this.uurlString  =this.reportU+"tdsmonthly?return="+this.daybookForDialog.returnname+"&month="+monthvalue;
      this.reportUrl = this._domsan.bypassSecurityTrustResourceUrl(this.uurlString);

    }
    if(this.daybookForDialog.rtypeid==2)
    {
      let yearvalue = this.year.getFullYear();
      this.uurlString  =this.reportU+"tdsyearly?return="+this.daybookForDialog.returnname+"&year="+yearvalue;
      this.reportUrl = this._domsan.bypassSecurityTrustResourceUrl(this.uurlString);

    }

  }

}
