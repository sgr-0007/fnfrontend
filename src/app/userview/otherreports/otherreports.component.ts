import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Voucher } from 'src/app/models/voucher.model';
import { VoucherService } from 'src/app/services/voucher.service';

@Component({
  selector: 'app-otherreports',
  templateUrl: './otherreports.component.html',
  styleUrls: ['./otherreports.component.css']
})
export class OtherreportsComponent implements OnInit {

  companies: Voucher[] = [];
  daybookForDialog!: Voucher;
  dateTime = new Date();
  uurlString: string;
  reportUrl: any;
  dateValue: Date;
  todateValue: Date;
  loginuid: number = +sessionStorage.getItem("loginid");
  reportU = GlobalConstants.reportUrl;

  othereporttypes = [
    { otherreporttype: "Budget", otherreporttypeid: 2 },
    { otherreporttype: "Current Liabilities", otherreporttypeid: 3 },
    { otherreporttype: "Fixed Liabilities", otherreporttypeid: 4 },
    { otherreporttype: "CGST", otherreporttypeid: 5 },
    { otherreporttype: "IGST", otherreporttypeid: 6 },
    { otherreporttype: "SGST", otherreporttypeid: 7 },
    { otherreporttype: "GSTTDS", otherreporttypeid: 8 },
    { otherreporttype: "TCS", otherreporttypeid: 9 },
    { otherreporttype: "TDS", otherreporttypeid: 10 },
    { otherreporttype: "Ledger", otherreporttypeid: 11 },

  ];
  constructor(private datePipe: DatePipe, private voucherservice: VoucherService,
    private _domsan: DomSanitizer) { }

  ngOnInit(): void {

    this.retrieveCompanies();

    this.dateValue = new Date();
    this.dateValue.setMonth(this.dateValue.getMonth()); 
    this.todateValue = new Date();
    this.todateValue.setMonth(this.todateValue.getMonth()); 
       this.daybookForDialog = {
      voucherfromdate: null!, vouchertodate: null!, companyid: null! ,otherreporttypeid:null!
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

  onSearch() {
    var frdate = this.datePipe.transform(this.dateValue, 'yyyy-MM-dd');
    var todate = this.datePipe.transform(this.todateValue, 'yyyy-MM-dd');
    if (this.daybookForDialog.otherreporttypeid == 11) {
      this.uurlString = this.reportU+"OfficebasedLedgerReport?companyid=" + this.daybookForDialog.companyid;
      this.reportUrl = this._domsan.bypassSecurityTrustResourceUrl(this.uurlString);
    }
    if (this.daybookForDialog.otherreporttypeid == 2) {
      this.uurlString = this.reportU+"BudgetOfficewise?companyid=" + this.daybookForDialog.companyid+"&fromdate="+frdate+"&todate="+todate;
      this.reportUrl = this._domsan.bypassSecurityTrustResourceUrl(this.uurlString);
    }
    if (this.daybookForDialog.otherreporttypeid == 3) {
      this.uurlString = this.reportU+"CurrentLiabilitiesReport?companyid=" + this.daybookForDialog.companyid+"&fromdate="+frdate+"&todate="+todate;
      this.reportUrl = this._domsan.bypassSecurityTrustResourceUrl(this.uurlString);
    }
    if (this.daybookForDialog.otherreporttypeid == 4) {
      this.uurlString = this.reportU+"FixedLiabilitiesReport?companyid=" + this.daybookForDialog.companyid+"&fromdate="+frdate+"&todate="+todate;
      this.reportUrl = this._domsan.bypassSecurityTrustResourceUrl(this.uurlString);
    }
    if (this.daybookForDialog.otherreporttypeid == 5) {
      this.uurlString = this.reportU+"CGSTOfficewiseReport?companyid=" + this.daybookForDialog.companyid+"&fromdate="+frdate+"&todate="+todate;
      this.reportUrl = this._domsan.bypassSecurityTrustResourceUrl(this.uurlString);
    }
    if (this.daybookForDialog.otherreporttypeid == 6) {
      this.uurlString = this.reportU+"IGSTOfficewiseReport?companyid=" + this.daybookForDialog.companyid+"&fromdate="+frdate+"&todate="+todate;
      this.reportUrl = this._domsan.bypassSecurityTrustResourceUrl(this.uurlString);
    }
    if (this.daybookForDialog.otherreporttypeid == 7) {
      this.uurlString = this.reportU+"SGSTOfficewiseReport?companyid=" + this.daybookForDialog.companyid+"&fromdate="+frdate+"&todate="+todate;
      this.reportUrl = this._domsan.bypassSecurityTrustResourceUrl(this.uurlString);
    }
    if (this.daybookForDialog.otherreporttypeid == 8) {
      this.uurlString = this.reportU+"GSTTDSReport?companyid=" + this.daybookForDialog.companyid+"&fromdate="+frdate+"&todate="+todate;
      this.reportUrl = this._domsan.bypassSecurityTrustResourceUrl(this.uurlString);
    }
    if (this.daybookForDialog.otherreporttypeid == 9) {
      this.uurlString = this.reportU+"TcsOfficeReport?companyid=" + this.daybookForDialog.companyid+"&fromdate="+frdate+"&todate="+todate;
      this.reportUrl = this._domsan.bypassSecurityTrustResourceUrl(this.uurlString);
    }
    if (this.daybookForDialog.otherreporttypeid == 10) {
      this.uurlString = this.reportU+"TDSOfficeReport?companyid=" + this.daybookForDialog.companyid+"&fromdate="+frdate+"&todate="+todate;
      this.reportUrl = this._domsan.bypassSecurityTrustResourceUrl(this.uurlString);
    }
  }
}
