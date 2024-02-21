import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { FileUploadsInfo } from 'src/app/models/file.model';
import { Fileuploadlist } from 'src/app/models/fileuploadlist';
import { Voucher } from 'src/app/models/voucher.model';
import { UsermasterService } from 'src/app/services/usermaster.service';
import { VoucherService } from 'src/app/services/voucher.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pettyreport2',
  templateUrl: './pettyreport2.component.html',
  styleUrls: ['./pettyreport2.component.css']
})
export class Pettyreport2Component implements OnInit {

  pcashdialog!: Voucher;
  dateTime = new Date();
 
  myDate = new Date();
 
  cid: number;
 
  companies: Voucher[];
 
  vid: any;
  reportU = GlobalConstants.reportUrl;
  uurlString: string;
  reportUrl: any;
  //roles
  maker = GlobalConstants.maker;
  checker = GlobalConstants.checker;
  approver = GlobalConstants.approver;
  sadmin = GlobalConstants.sadmin;

  //module
  module = GlobalConstants.salesvoucher;

  loginuid: number = +sessionStorage.getItem("loginid");
  cidlogin: number = +sessionStorage.getItem("companyidlogin");

  urole: number = 0;
  hoUser: boolean;
  


  constructor(private uservice: UsermasterService, private voucherservice: VoucherService, private datePipe: DatePipe,
    private _domsan  : DomSanitizer) { }

  ngOnInit(): void {
  
    this.pcashdialog = new Voucher();
    this.dateTime.setDate(this.dateTime.getDate());

    this.uservice.userRoleCheck(this.loginuid, this.module).subscribe(
      (response) => {
        console.log(response);
        if (response != null) {
          this.urole = response.roleid;
          localStorage.setItem("role", "" + this.urole)

        } else {
          this.urole = 0
        }
      }
    );

    this.voucherservice.getCompaniesByUser(this.loginuid)
      .subscribe({
        next: (data) => {

          console.log(data);
          if (data[0].companyid == 1) {
            this.hoUser = true;
            this.companies = data.filter(s => s.isactive);
          }
          else {
            this.hoUser = false;

            this.companies = data.filter(x => x.companyid == this.cidlogin && x.isactive == true);
          }
        }
      })


  }



 

  

  onSearch() {
    var frdate = this.datePipe.transform(this.pcashdialog.daybookfromdate, 'yyyy-MM-dd');
    var todate = this.datePipe.transform(this.pcashdialog.daybooktodate, 'yyyy-MM-dd');

  this.uurlString  = this.reportU+"Pettycash?companyid="+this.pcashdialog.companyid+"&fromdate="+frdate+"&todate="+todate+"&rep=3";
    console.log( this.uurlString);
    this.reportUrl = this._domsan.bypassSecurityTrustResourceUrl(this.uurlString);
  }
  onReset() {
    this.pcashdialog = new Voucher();

  }

}
