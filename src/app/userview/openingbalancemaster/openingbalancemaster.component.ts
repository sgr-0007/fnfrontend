import { Component, OnInit } from '@angular/core';
import { Table } from 'jspdf-autotable';
import { Creditlimitsetting } from 'src/app/models/creditlimitsetting';
import { Normalledger } from 'src/app/models/normalledger.model';
import { SubLedger } from 'src/app/models/subledger';
import { Voucher } from 'src/app/models/voucher.model';
import { CreditlimitsService } from 'src/app/services/creditlimits.service';
import { VoucherService } from 'src/app/services/voucher.service';
import Swal from 'sweetalert2';
import { SubLedgerService } from 'src/app/services/subledger.service';
import { CompanymasterService } from 'src/app/services/companymaster.service';
import { Companymaster } from 'src/app/models/companymaster.model';
import { Financialyear } from 'src/app/models/financialyear';
import { YearlybudgetserviceService } from 'src/app/services/yearlybudgetservice.service';

@Component({
  selector: 'app-openingbalancemaster',
  templateUrl: './openingbalancemaster.component.html',
  styleUrls: ['./openingbalancemaster.component.css']
})
export class OpeningbalancemasterComponent implements OnInit {

  creditlimit:Creditlimitsetting[];
  exportColumns: any[];
  disable:boolean=false;
  item : Voucher[] = []
 uom : Creditlimitsetting[] = [];
 ledgername : Normalledger[] = [];
 cols:any[];
 itemnameonedit: string;


 displayDialog: boolean;
  // itemForDialog!: Item;

 first = 0;

 rows = 7;
 loading: boolean = true;
 ledgernameunique : boolean = true;
 submitted : boolean;
 creditlimitamountonedit: string;
  itemnameunique: boolean;

  uomForDialog!: Voucher;

  itemmaster : Creditlimitsetting[] = []
  normalledgernameonedit: string;
  subledgs: SubLedger[];
  companies: Companymaster[];

  allFy: Financialyear[];
  activeYear : Date;

  constructor(private yearlybudgetservice: YearlybudgetserviceService,private companyservice : CompanymasterService,private creditlimitservice:CreditlimitsService,private subledgservice : SubLedgerService,private vservice:VoucherService) { }

  
  ngOnInit(): void {
    this.retrieveCompaines();

    this.retrieveItem();
    this.renderAllFinancialYear();
  }
  next() {
    this.first = this.first + this.rows;
  }
  
  prev() {
    this.first = this.first - this.rows;
  }
  
  reset() {
    this.first = 0;
  }
  
  isLastPage(): boolean {
    return this.item ? this.first === (this.item.length - this.rows): true;
  }
  
  isFirstPage(): boolean {
    return this.item ? this.first === 0 : true;
  }
  alertDelete(){
    Swal.fire( {
    text: 'Op Deleted successfully!',
    icon: 'success'})
  }
  alertUpdate(){
    Swal.fire( {
    text: 'Op updated successfully!',
    icon: 'success'})
  }
  alertSave(){
    Swal.fire({
      text: 'Op balance saved successfully!',
      icon: 'success'})
  }
  retrieveItem(): void {
    this.vservice.getOpBalance()
      .subscribe({
        next: (data) => {
          this.item = data;
           this.loading = false;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  retrieveUomddl(): void {
    this.creditlimitservice.getUom()
      .subscribe({
        next: (data) => {
          this.ledgername = data;
           this.loading = false;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  retrieveCompaines(): void {
    this.companyservice.getNative()
      .subscribe({
        next: (data) => {
          console.log(data)
          this.companies = data;
           this.loading = false;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
    }
  
    onUomAdd(){
      this.uomForDialog = {
       ledgerid: null!, openingbalance:null!,subledgername:null!, createddate:null!
    };
      this.displayDialog = true;
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
    LedgerOnChange(_ledgerid: number) {
      this.retrieveSubLedgs(_ledgerid);
    }
    onDelete(id : number){
      this.vservice.deleteSubLedg(id)
      .subscribe({
        next: (data) => {
          this.ngOnInit();  
          this.alertDelete();
        },
        error: (e) => console.error(e)
      });
  
    }
    saveUom(){
      this.submitted = true;
      this.uomForDialog.openingbalance = +this.uomForDialog.openingbalance;
      this.uomForDialog.ledgerid = +this.uomForDialog.ledgerid;
      this.uomForDialog.createddate = this.activeYear;
      this.uomForDialog.subledgername = (this.uomForDialog.subledgerid>0)?this.subledgs.find(x => x.subledgerid == this.uomForDialog.subledgerid).subledgername:null;
      console.log(this.uomForDialog);
      console.log('op balance Saved');
      this.vservice.opBalance(this.uomForDialog)
      .subscribe( data => {
        this.ngOnInit();
        this.alertSave();
      });
  
      this.displayDialog = false;
    // }
  }
  
  CompanyOnChange(id : number){
    this.creditlimitservice.getUom()
    .subscribe({
      next: (data) => {
        console.log(data);
        let ctype = this.companies.find(x => x.companyid ==id).companytypeid;
        if (ctype == 1) {
          this.ledgername = data;

        }
        else if (ctype == 2) {
          this.ledgername = data.filter(x => (x.companytype == ctype || x.companytype == 1015));

        }
        else if (ctype == 3) {
          this.ledgername = data.filter(x => (x.companytype == ctype || x.companytype == 1016));

        }
        else {
          this.ledgername = data.filter(x => (x.companytype == ctype));

        }  
        console.log(this.ledgername);
      },
      error: (e) => console.error(e)
    });
  }
  
  renderAllFinancialYear() {
    this.yearlybudgetservice.getAllFy().subscribe(
      (response) => {
        console.log(response);
        this.allFy = response;
        this.activeYear = response.find(x=>x.defaultactive== true).financialyearstartdate;

      }
    );
  }
}
