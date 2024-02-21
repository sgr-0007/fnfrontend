import { Component, OnInit } from '@angular/core';
import { Creditlimit } from 'src/app/models/creditlimit';
import { Creditlimitsetting } from 'src/app/models/creditlimitsetting';
import { CreditlimitsService } from 'src/app/services/creditlimits.service';
import { AbstractControl } from '@angular/forms';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';
import FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CheckUniqueService } from 'src/app/services/checkunique.service';
import { Normalledger } from 'src/app/models/normalledger.model';

@Component({
  selector: 'app-creditlimits',
  templateUrl: './creditlimits.component.html',
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
export class CreditlimitsComponent implements OnInit {
  creditlimit:Creditlimitsetting[];
  exportColumns: any[];
  disable:boolean=false;
  item : Creditlimitsetting[] = []
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
  selectedUom: Normalledger=new Normalledger();

  uomForDialog!: Creditlimitsetting;

  itemmaster : Creditlimitsetting[] = []
  normalledgernameonedit: string;


  constructor(private creditlimitservice:CreditlimitsService) { }

  
  ngOnInit(): void {
    this.retrieveItem();
    this.retrieveUomddl();
    
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
  retrieveItem(): void {
    this.creditlimitservice.getAll()
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
  
  clonedUom: { [s: string]: Creditlimitsetting; } = {};
    onRowEditInit(uom: Creditlimitsetting) {    
      this.disable=true; 
      console.log('Row edit initialized');
      // console.log(uom);
      // uom.buyerid=this.selectedUom.ledgerid;
      this.clonedUom[uom.ledgername!] = { ...uom };
      this.normalledgernameonedit = uom.ledgername;
    }
    // onRowEditSave(id : number ,group: Subgroup) {
    //   console.log('Row edit saved');
    //   console.log("Number"+id);
    //   for (let index = 0; index < this.subgroups.length; index++) {
    //    if(this.subgroups[index].subgroupcode!=null){
    //     console.log(group.subgroupcode.trim().toLowerCase())
    //     if(this.subgroups[index].subgroupcode.trim().toLowerCase() == group.subgroupcode.trim().toLowerCase())
    //     {
  
    //       this.subgroupcodeunique = false;
         
    //     }
    //     else{
    //       this.subgroupcodeunique = true;
    //     }            
    //   }
    //   console.log(this.subgroupcodeunique);
    // }
      
    //   if( this.subgroupcodeunique){
    //     this.subgroupservice.update(id,group)
    //     .subscribe( data => {
    //       this.ngOnInit();
    //       this.alertUpdate();
    //       this.disable=false;
    //     });
        
    //   }else{
    //     Swal.fire("Error!","Subgroup cannot be added")
    //     this.disable=false;
    //     this.ngOnInit();
    //   }
  
    
    // }
    
    onRowEditSave(id : number ,uom: Creditlimitsetting) {
      console.log('Row edit saved');
      // console.log(uom);
      
      
      
      // this.creditlimitservice.update(id,uom)
      
          console.log(uom)
        this.creditlimitservice.update(id,uom)
        .subscribe( data => {
          this.ngOnInit();
          this.alertUpdate();
          this.disable=false;
        });
      }

  clonedSubgroups: { [s: string]: Normalledger; } = {};
  // onRowEditIniting(normalledger: Normalledger) {
  //   console.log('Row edit initialized');
  //   this.clonedUom[normalledger.ledgername!] = { ...normalledger };
  // }
  
    onRowEditCancel(uom: Creditlimitsetting, index: number) {
      console.log('Row edit cancelled');
      this.item[index] = this.clonedUom[uom.creditlimitamount!];
      delete this.clonedUom[uom.creditlimitamount!];
      // this.itemnameonedit = uom.creditlimitamount;
      this.disable=false;
    }
    
    onUomAdd(){
      this.uomForDialog = {
        creditlimitid: null!, buyerid: null!, creditlimitamount: null!, creditlimitutilize: null!, creditlimitbalance: null!, creditlimitcreateddate: null!, creditlimitcreatedby: null!, creditlimitcheckedby: null!, creditlimitcheckeddate: null!, creditlimitapprovedby: null!, creditlimitapproveddate: null!, ledgername: null!
    };
      this.displayDialog = true;
    }
    saveUom(){
      this.submitted = true;
      // console.log(this.selectedUom)
      this.uomForDialog.buyerid=this.selectedUom.ledgerid;
      this.uomForDialog.ledgername=this.selectedUom.ledgername;
      
      // for (let index = 0; index < this.item.length; index++) {
      //   if (this.item[index].itemname == this.uomForDialog.itemname.trim())
      //   {
  
      //     this.itemnameunique = false;
      //     break;
      //   }
      //   else{
      //     this.itemnameunique = true;
      //   }      
      // }
    
      //  if(this.itemnameunique)
      // {
      
      //this.uomForDialog.creditlimitid = this.selectedUom.creditlimitid;
      console.log(this.uomForDialog);
      console.log('Creditlimitsetting Saved');
      this.creditlimitservice.create(this.uomForDialog)
      .subscribe( data => {
        this.ngOnInit();
        this.alertSave();
      });
  
      this.displayDialog = false;
    // }
  }
  
  clear(table: Table) {
    table.clear();
  }
  

  }
