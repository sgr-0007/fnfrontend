import { Component, OnInit } from '@angular/core';
import { Voucher } from 'src/app/models/voucher.model';
import { VoucherService } from 'src/app/services/voucher.service';

@Component({
  selector: 'app-balancesheet',
  templateUrl: './balancesheet.component.html',
  styleUrls: ['./balancesheet.component.css'],
  styles: [`
        :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
            position: -webkit-sticky;
            position: sticky;
            top: 4rem;
        }

        .layout-news-active :host ::ng-deep .p-datatable tr > th {
            top: 4rem;
        }
    `]
})
export class BalancesheetComponent implements OnInit {


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
  plForDialog!: Voucher;
  profitLoss : Voucher[] = [];
  bSheet : Voucher[] = [];
  public totaldebitamountt=0;
  public totalcreditamountt=0;
  public total = 0;
  private value!: string | any[];
  isProfit : boolean = false;
  isLoss : boolean = false;
  incomeExpDiv = false;
  totaldebitamounttbs: number = 0;
  totalcreditamounttbs: number = 0;
  dateTime = new Date();

  constructor(private voucherservice : VoucherService) { }

  ngOnInit(): void {
    this.plForDialog = 
    {  
       month:null!
    }
        this.dateTime.setDate(this.dateTime.getDate());

  }

  generateBalanceSheetReport(){ 
    this.getBS();  
    this.getPL();
  }
  getBS(){

    this.voucherservice.balanceSheetBind(this.plForDialog.voucherfromdate,this.plForDialog.vouchertodate)
    .subscribe({
      next: (data) => {
        this.bSheet = data;
        this.findsum(this.bSheet);
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
  getPL(){

    this.voucherservice.profitLossBind(this.plForDialog.voucherfromdate,this.plForDialog.vouchertodate)
    .subscribe({
      next: (data) => {
        this.profitLoss = data;
        this.findsumPL(this.profitLoss);
        this.calculatePLAmount();
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  findsum(data: string | any[]){
    this.totaldebitamounttbs = 0;
    this.totalcreditamounttbs = 0;
    this.value=data
    console.log(this.value);
    if(this.value!=null)
    {
    for(let j=0;j<data.length;j++){
         this.totaldebitamounttbs+= this.value[j].debitamount
         this.totalcreditamounttbs+= this.value[j].creditamount

    }
  }
  }
  findsumPL(data: string | any[]){
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
  calculatePLAmount(){

     this.total = 0;
     if(this.profitLoss)
     {
        this.total = this.totalcreditamountt - this.totaldebitamountt;
        if(this.total >= 0)
        {
          this.isProfit = true;
          this.isLoss = false;
        }
        else
        {
          this.isLoss = true; 
          this.isProfit = false;

        }
     }

      if(this.total>=0)
      {
       return this.total
      }
      else
      {
        return this.total = this.total*-1;
      }
      
     }
    


}
