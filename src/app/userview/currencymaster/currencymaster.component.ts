import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Currency } from 'src/app/models/currency.model';
import { CurrencyService } from 'src/app/services/currency.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-currencymaster',
  templateUrl: './currencymaster.component.html',
  styleUrls: ['./currencymaster.component.css']
})

export class CurrencymasterComponent implements OnInit {

  isactive = [
    { label: "Active" , value :true},
    { label: "InActive" ,  value :false },
  ];

 currency : Currency[] = []

 displayDialog!: boolean;
 currencyForDialog!: Currency;

 first = 0;

 rows = 5;
 loading: boolean = true
 submitted:boolean = false;
 currencynameunique:boolean = true;
 currencynameonedit : string;

 constructor(private currencyservice : CurrencyService) { }

 ngOnInit(): void {
  this.retrieveCurrency();
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
  return this.currency ? this.first === (this.currency.length - this.rows): true;
}

isFirstPage(): boolean {
  return this.currency ? this.first === 0 : true;
}

alertUpdate(){
  Swal.fire( {
  text: 'Currency updated successfully!',
  icon: 'success'})
}
alertSave(){
  Swal.fire({
    text: 'Currency saved successfully!',
    icon: 'success'})
}

alertUniqueError(){
  Swal.fire({
    text: 'Currency name should be unique!',
    icon: 'warning'})
}

retrieveCurrency(): void {
  this.currencyservice.getAll()
    .subscribe({
      next: (data) => {
        this.currency = data;
         this.loading = false;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}


clonedCurrency: { [s: string]: Currency; } = {};
  onRowEditInit(currency: Currency) {
    console.log('Row edit initialized');
    this.clonedCurrency[currency.currencyname!] = { ...currency };
     this.currencynameonedit =currency.currencyname;
  }
  onRowEditSave(id : number ,currency: Currency) {
    console.log('Row edit saved');
    console.log(currency);    
 
    this.currencyservice.update(id,currency)
    .subscribe( data => {
      this.ngOnInit();
      this.alertUpdate();
    });
  
  }
  onRowEditCancel(currency: Currency, index: number) {
    console.log('Row edit cancelled');
    this.currency[index] = this.clonedCurrency[currency.currencyname!];
    delete this.clonedCurrency[currency.currencyname!];
  }

  onCurrencyAdd(){
    this.currencyForDialog = {
      currencyname: null!, currencydisplay: null!, isactive: null!
  };
    this.displayDialog = true;
  }
  onCurrencyReset(){
    this.currencyForDialog = {
      currencyname: null!, currencydisplay: null!, isactive: null!
  };
    this.displayDialog = true;
  }
  saveCurrency(){
    console.log('Currency Saved');
    this.submitted =true;  
    console.log(this.currencyForDialog);
    for (let index = 0; index < this.currency.length; index++) {
      if (this.currency[index].currencyname == this.currencyForDialog.currencyname.trim())
      {

        this.currencynameunique = false;
        break;
      }
      else{
        this.currencynameunique = true;
      }      
    }
    if(this.currencynameunique)
{
    this.currencyservice.create(this.currencyForDialog)
    .subscribe( data => {
      this.ngOnInit();
      this.alertSave();
    });
    this.displayDialog = false;
  }
  }

clear(table: Table) {
  table.clear();
}

}