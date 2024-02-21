import { Component, OnInit } from '@angular/core';
import { Voucher } from 'src/app/models/voucher.model';
import { VoucherService } from 'src/app/services/voucher.service';

@Component({
  selector: 'app-profitloss',
  templateUrl: './profitloss.component.html',
  styleUrls: ['./profitloss.component.css'],
  styles: [`
        :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
            position: -webkit-sticky;
            position: sticky;
            top: 5rem;
        }

        .layout-news-active :host ::ng-deep .p-datatable tr > th {
            top: 7rem;
        }
    `]
})
export class ProfitlossComponent implements OnInit {

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
  public totaldebitamountt=0;
  public totalcreditamountt=0;
  public total = 0;
  private value!: string | any[];
  isProfit : boolean = false;
  isLoss : boolean = false;

  dateTime = new Date();

  constructor(private voucherservice : VoucherService) { }

  ngOnInit(): void {
    this.plForDialog = 
    {  
       month:null!
    }
    this.dateTime.setDate(this.dateTime.getDate());

  }

  generatePLReport(){

    this.voucherservice.profitLossBind(this.plForDialog.voucherfromdate,this.plForDialog.vouchertodate)
    .subscribe({
      next: (data) => {
        this.profitLoss = data;
        this.findsum(this.profitLoss);
        this.calculatePLAmount();
        console.log(data);
      },
      error: (e) => console.error(e)
    });
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
  calculatePLAmount(){

     this.total = 0;
     if(this.profitLoss)
     {
        this.total = this.totalcreditamountt - this.totaldebitamountt;
        if(this.total >= 0)
        {
          this.isProfit = true;
        }
        else
        {
          this.isLoss = true; 
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
