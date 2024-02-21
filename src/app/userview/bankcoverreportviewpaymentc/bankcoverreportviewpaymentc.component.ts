import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-constants';
import { OfficeAccount } from 'src/app/models/officeaccount.model';
import { Voucher } from 'src/app/models/voucher.model';
import { NormalledgerService } from 'src/app/services/normalledger.service';
import { VoucherService } from 'src/app/services/voucher.service';
@Component({
  selector: 'app-bankcoverreportviewpaymentc',
  templateUrl: './bankcoverreportviewpaymentc.component.html',
  styleUrls: ['./bankcoverreportviewpaymentc.component.css']
})
export class BankcoverreportviewpaymentcComponent implements OnInit {

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
  vid: string;

  constructor(private _router: Router,private route: ActivatedRoute,private normalledgerservice : NormalledgerService,private datePipe: DatePipe,private voucherservice : VoucherService,
    private _domsan  : DomSanitizer) { }

  ngOnInit(): void {
  
    this.vid = this.route.snapshot.paramMap.get('id');
    this.uurlString  = this.reportU+"PayBankCover?companyid=1&fromdate=2022-01-01&todate=2022-02-01&vid="+this.vid+"&type=C";
    this.reportUrl = this._domsan.bypassSecurityTrustResourceUrl(this.uurlString);
  }
  
  back() {
    this._router.navigate(["paymentvouchers"])
  }


}
