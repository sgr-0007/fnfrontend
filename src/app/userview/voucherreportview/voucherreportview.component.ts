import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Voucher } from 'src/app/models/voucher.model';
import { VoucherService } from 'src/app/services/voucher.service';

@Component({
  selector: 'app-voucherreportview',
  templateUrl: './voucherreportview.component.html',
  styleUrls: ['./voucherreportview.component.css']
})
export class VoucherreportviewComponent implements OnInit {
  reportUrl : SafeResourceUrl ;
  isLoading  : boolean = false;

  vouchers: Voucher[];
  voucherForDialog!: Voucher;
  vnum: string;
  uurlString: string;
  reportU = GlobalConstants.reportUrl;

  constructor(private _router: Router,private _domsan  : DomSanitizer, private voucherserv : VoucherService,private route: ActivatedRoute) {


   }

  ngOnInit(): void {

this.vnum = this.route.snapshot.paramMap.get('id');
this.uurlString  = this.reportU+"VoucherReportViewer?vouchernumber="+this.vnum;
this.reportUrl = this._domsan.bypassSecurityTrustResourceUrl(this.uurlString);
  }
  back() {
    this._router.navigate(["voucherreport"])
  }
}
