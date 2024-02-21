import { Component, OnInit } from '@angular/core';
import { Voucher } from 'src/app/models/voucher.model';
import { VoucherService } from 'src/app/services/voucher.service';


@Component({
  selector: 'app-trialbalancereport',
  templateUrl: './trialbalancereport.component.html',
  styleUrls: ['./trialbalancereport.component.css'],
  styles: [`
        :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
            position: -webkit-sticky;
            position: sticky;
            top: 1rem;
        }

        .layout-news-active :host ::ng-deep .p-datatable tr > th {
            top: 1rem;
        }
    `]
})
export class TrialbalancereportComponent implements OnInit {
  radioSelect: string;
  ledgerWise : boolean = false;
  detailedWise : boolean = false;
  groupWise : boolean  = false;
  groupDetailedWise : boolean  = false;

  months = [
    { label: "Select" , value :0},
    { label: "January" , value :1},
    { label: "February" ,  value :2 },
    { label: "March" , value :3},
    { label: "April" ,  value :4 },
    { label: "May" , value :5},
    { label: "June" ,  value :6 },
    { label: "July" , value :7},
    { label: "August" ,  value :8 },
    { label: "September" , value :9},
    { label: "October" ,  value :10 },
    { label: "November" , value :11},
    { label: "December" ,  value :12 },
  ];
  
head = [['Particulars','Debit','Credit']]

  trailForDialog!: Voucher;
  ledgerTrailBalance : Voucher[] = [];
  detailedTrailBalance : Voucher[] = [];
  groupTrailBalance : Voucher[] = [];
  groupDetailedTrailBalance : Voucher[] = [];
  public totaldebitamountt=0;
  public totalcreditamountt=0;
  private value!: string | any[];
  dateTime = new Date();

  constructor(private voucherservice : VoucherService) { }

  ngOnInit(): void {

    this.trailForDialog = 
    {  
       month:null!
    }
        this.dateTime.setDate(this.dateTime.getDate());

  }

  generateTrailReport(){

    console.log(this.radioSelect);
   if(this.radioSelect=="1") {
     
      this.detailedWise = true ; this.ledgerWise =false ;  this.groupWise=false ;this.groupDetailedWise=false;
      this.voucherservice.trailBalanceDetailed(this.trailForDialog.voucherfromdate,this.trailForDialog.vouchertodate)
      .subscribe({
        next: (data) => {
          this.detailedTrailBalance = data;
          this.findsum(this.detailedTrailBalance);
          console.log(data);
        },
        error: (e) => console.error(e)
      });

    }
   if(this.radioSelect=="2") {
   
      this.detailedWise = false ; this.ledgerWise=false ; this.groupWise=true ;this.groupDetailedWise=false;
      this.voucherservice.trailBalanceGroup(this.trailForDialog.voucherfromdate,this.trailForDialog.vouchertodate)
      .subscribe({
        next: (data) => {
          this.groupTrailBalance = data; 
          this.findsum(this.groupTrailBalance);         
          console.log(data);
        },
        error: (e) => console.error(e)
      });

     }
   if(this.radioSelect=="3") {    

      this.detailedWise = false;  this.ledgerWise=true ; this.groupWise=false;this.groupDetailedWise=false;
      this.voucherservice.trailBalanceLedger(this.trailForDialog.voucherfromdate,this.trailForDialog.vouchertodate)
      .subscribe({
        next: (data) => {
          this.ledgerTrailBalance = data; 
          this.findsum(this.ledgerTrailBalance);         
          console.log(data);
        },
        error: (e) => console.error(e)
      });

     }
     if(this.radioSelect=="4") {    

      this.detailedWise = false;  this.ledgerWise=false ; this.groupWise=false;this.groupDetailedWise=true;
      this.voucherservice.trailBalanceGroupDetailed(this.trailForDialog.voucherfromdate,this.trailForDialog.vouchertodate)
      .subscribe({
        next: (data) => {
          this.groupDetailedTrailBalance = data; 
          this.findsum(this.groupDetailedTrailBalance);         
          console.log(data);
        },
        error: (e) => console.error(e)
      });

     }
  }

  findsum(data: string | any[]){
    this.totaldebitamountt = 0;
    this.totalcreditamountt = 0;
    this.value=data
    console.log(this.value);
    if(this.value!=null)
    {
    for(let j=0;j<data.length;j++){
         this.totaldebitamountt+= this.value[j].debitamount
         this.totalcreditamountt+= this.value[j].creditamount

    }
  }
  }

  calculateDebitTotal(accountGroup : string){

    let totalDebit = 0;
     if(this.groupDetailedTrailBalance)
     {
        for (let groupDetail of this.groupDetailedTrailBalance) {
        if (groupDetail.balancesheetgroup === accountGroup) {
          totalDebit = totalDebit+groupDetail.debitamount;
        }
     }

     }
     return (totalDebit===0)?'':totalDebit;

  }

  calculateCreditTotal(accountGroup : string){
    let totalCredit = 0;
     if(this.groupDetailedTrailBalance)
     {
        for (let groupDetail of this.groupDetailedTrailBalance) {
        if (groupDetail.balancesheetgroup === accountGroup) {
          totalCredit = totalCredit+groupDetail.creditamount;
        }
     }

     }
     return (totalCredit===0)?'':totalCredit;
  }
  calculateLedgerDebitTotal(ledger : string){

    let totalLedgerDebit = 0;
     if(this.detailedTrailBalance)
     {
        for (let ledgerTrail of this.detailedTrailBalance) {
        if (ledgerTrail.ledgeralias === ledger) {
          totalLedgerDebit = totalLedgerDebit+ledgerTrail.debitamount;
        }
     }

     }
     return (totalLedgerDebit===0)?'':totalLedgerDebit;

  }

  calculateLedgerCreditTotal(ledger : string){
   
    let totalLedgerCredit = 0;
     if(this.detailedTrailBalance)
     {
        for (let ledgerTrail of this.detailedTrailBalance) {
        if (ledgerTrail.ledgeralias === ledger) {
          totalLedgerCredit = totalLedgerCredit+ledgerTrail.creditamount;
        }
     }

     }
     return (totalLedgerCredit ===0)?'':totalLedgerCredit;
  }

}


