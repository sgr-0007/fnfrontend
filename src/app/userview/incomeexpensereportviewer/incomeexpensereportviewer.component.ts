import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Voucher } from 'src/app/models/voucher.model';
import { VoucherService } from 'src/app/services/voucher.service';

@Component({
  selector: 'app-incomeexpensereportviewer',
  templateUrl: './incomeexpensereportviewer.component.html',
  styleUrls: ['./incomeexpensereportviewer.component.css']
})
export class IncomeexpensereportviewerComponent implements OnInit {

  
 
  companies : Voucher[] = [];
  daybookForDialog!:Voucher;
  dateTime = new Date();
  uurlString: string;
  reportUrl: any;
  dateValue: Date;
  todateValue: Date; 
  loginuid: number = +sessionStorage.getItem("loginid");
  reportU = GlobalConstants.reportUrl;

  constructor(private datePipe: DatePipe,private voucherservice : VoucherService,
    private _domsan  : DomSanitizer) { }

  ngOnInit(): void {
  
    this.retrieveCompanies();
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
          
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  onSearch(){
    var frdate = this.datePipe.transform(this.dateValue, 'yyyy-MM-dd');
    var todate = this.datePipe.transform(this.todateValue, 'yyyy-MM-dd');

    this.uurlString  = this.reportU+"IEReportViewer?companyid="+this.daybookForDialog.companyid+"&fromdate="+frdate+"&todate="+todate;
    this.reportUrl = this._domsan.bypassSecurityTrustResourceUrl(this.uurlString);

  }


}
