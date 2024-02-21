import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Companymaster } from 'src/app/models/companymaster.model';
import { Invoicedetails } from 'src/app/models/invoicedetails';
import { CompanymasterService } from 'src/app/services/companymaster.service';
import { InvoiceserviceService } from 'src/app/services/invoiceservice.service';

@Component({
  selector: 'app-invoicereport',
  templateUrl: './invoicereport.component.html',
  styleUrls: ['./invoicereport.component.css']
})
export class InvoicereportComponent implements OnInit {

  constructor(private _domsan  : DomSanitizer,private _invoiceService:InvoiceserviceService
    ,private companyservice : CompanymasterService) { }


  invoice:Invoicedetails[];
  reportU = GlobalConstants.reportUrl;
  first = 0;
  checker;number=0;
  selectedCompanyid=0;
  maker:number=0
  urole: number = 0;
  approver:number=0;
  companies : Companymaster[] = [];
  rows = 10;
  uurlString: string;
  reportUrl: SafeResourceUrl ;
  loginuid: number = +sessionStorage.getItem("loginid");
  selectdValue:selectVlaues=new selectVlaues(0,'null',null,null);
  Vlaues:selectVlaues[]=[new selectVlaues(1,'New','fiber_new','mat-color-green'),
                          new selectVlaues(2,'Check','done','mat-color-green'),
                          new selectVlaues(3,'Approved','done_all','mat-color-green'),
                          new selectVlaues(4,'Incorrect','clear','mat-color-red'),
                          new selectVlaues(5,'Rejected','clear_all','mat-color-red'),
                        ];
Vlaues1:selectVlaues[]=[new selectVlaues(1,'New','fiber_new','mat-color-green'),
                          new selectVlaues(2,'Check','done','mat-color-green'),
                          new selectVlaues(4,'Incorrect','clear','mat-color-red'),
                        ];
  ngOnInit(): void {
    this.renderAllInvoice();
    this.retrieveCompaines();
  }

  retrieveCompaines(): void {
    this.companyservice.getAll()
      .subscribe({
        next: (data) => {
          this.companies = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
    }
  renderAllInvoice(){
    this._invoiceService.getInvoiceDetails().subscribe(
      (response)=>{
            console.log(response)
            this.invoice=response;
      }
    );
}

selectedCompany(event){
  console.log(event.value)
  this.selectedCompanyid=event.value;
}

onGenerate(){
  this.uurlString  = this.reportU+"invoicebyofficereportviewer?companyid="+this.selectedCompanyid;
this.reportUrl = this._domsan.bypassSecurityTrustResourceUrl(this.uurlString);
console.log(this.reportUrl)
}

//http://localhost:52659/invoicedetails?invoiceid=5

}




export class selectVlaues {

  valueid: number;
  valueName: string;
  valueIcon: string;
  valueClass: String;

  constructor(valueid, valueName, valueIcon, valueClass) {
    this.valueid = valueid;
    this.valueName = valueName;
    this.valueIcon = valueIcon;
    this.valueClass = valueClass;
  }


  
}