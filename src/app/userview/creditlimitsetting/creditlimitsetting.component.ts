import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Creditlimitsetting } from 'src/app/models/creditlimitsetting';
import { Normalledger } from 'src/app/models/normalledger.model';
import { CreditlimitsettingService } from 'src/app/services/creditlimitsetting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-creditlimitsetting',
  templateUrl: './creditlimitsetting.component.html',
  styleUrls: ['./creditlimitsetting.component.css']
})
export class CreditlimitsettingComponent implements OnInit {

  creditlimitsetting : Creditlimitsetting[] = []
 normalledger : Normalledger[] = [];


 selectedNormalledger!: number;
 selectedNormalledgername!: string;


 displayDialog!: boolean;
  creditlimitsettingForDialog!: Creditlimitsetting;
  normalledgerForDialog!: Normalledger;

 first = 0;

 rows = 6;
 loading: boolean = true;
  submitted: boolean;


 constructor(private creditlimitsettingservice : CreditlimitsettingService) { }


 ngOnInit(): void {
   this.retrieveCreditlimitsetting();
  //this.retrieveGroupddl();
  this.retrieveNormalledgerddl();
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
  return this.normalledger ? this.first === (this.normalledger.length - this.rows): true;
}

isFirstPage(): boolean {
  return this.normalledger ? this.first === 0 : true;
}

alertUpdate(){
  Swal.fire( {
  text: 'Creditlimitsetting updated successfully!',
  icon: 'success'})
}
alertSave(){
  Swal.fire({
    text: 'Creditlimitsetting saved successfully!',
    icon: 'success'})
}
retrieveCreditlimitsetting(): void {
  this.creditlimitsettingservice.getAll()
    .subscribe({
      next: (data) => {
        this.creditlimitsetting = data;
        //this.creditlimitsetting.ledger
         this.loading = false;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}

retrieveNormalledgerddl(): void {
  this.creditlimitsettingservice.getNormalledger()
    .subscribe({
      next: (creditlimitsettingForDialog) => {
        this.normalledger = creditlimitsettingForDialog;
        //this.selectedNormalledgername = data;
         this.loading = false;
        console.log(this.creditlimitsettingForDialog);
      },
      error: (e) => console.error(e)
    });
}

clonedCreditlimitsetting: { [s: string]: Creditlimitsetting; } = {};
  onRowEditInit(creditlimitsetting: Creditlimitsetting) {
    console.log('Row edit initialized');
    this.clonedCreditlimitsetting[creditlimitsetting.buyerid!] = { ...creditlimitsetting };
  }
  onRowEditSave(id : number ,creditlimitsetting: Creditlimitsetting) {
    console.log('Row edit saved');
    console.log(creditlimitsetting);
    this.creditlimitsettingservice.update(id,creditlimitsetting)
    .subscribe( data => {
      this.ngOnInit();
      this.alertUpdate();
    });

  }
  onRowEditCancel(creditlimitsetting: Creditlimitsetting, index: number) {
    console.log('Row edit cancelled');
    //this.creditlimitsetting[index] = this.clonedCreditlimitsetting[creditlimitsetting.buyerid!];
    delete this.clonedCreditlimitsetting[creditlimitsetting.buyerid!];
  }

  onCreditlimitsettingAdd(){
    this.creditlimitsettingForDialog = {
      creditlimitamount: null!
  };
    this.displayDialog = true;
  }

  saveCreditlimitsetting(){
    console.log('Creditlimitsetting Saved');
    
    console.log(this.selectedNormalledger)
    this.creditlimitsettingForDialog.buyerid = this.selectedNormalledger
  //  this.creditlimitsettingForDialog.buyerid=0;
  //  console.log(this.creditlimitsettingForDialog);
  //  this.creditlimitsettingservice.create(this.creditlimitsettingForDialog)
    //this.creditlimitsettingForDialog.normalledgername = this.selectedNormalledger
    //this.creditlimitsettingForDialog.creditlimitid = this.selectedGroup.groupid;
    //console.log(this.normalledger)
    //this.normalledgerForDialog.ledgername = this.selectedNormalledger
    this.creditlimitsettingForDialog.creditlimitid=0;
    console.log(this.creditlimitsettingForDialog);
    this.creditlimitsettingservice.create(this.creditlimitsettingForDialog)
    .subscribe( data => {
      this.ngOnInit();
      this.alertSave();
    });

    this.displayDialog = false;
    
  
  }

clear(table: Table) {
  table.clear();
}

}
