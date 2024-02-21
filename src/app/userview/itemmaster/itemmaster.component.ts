import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Table } from 'primeng/table';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';
import Swal from 'sweetalert2';
import FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CheckUniqueService } from 'src/app/services/checkunique.service';


@Component({
  selector: 'app-itemmaster',
  templateUrl: './itemmaster.component.html',
  styleUrls: ['./itemmaster.component.css'],
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
export class ItemmasterComponent implements OnInit {
  exportColumns: any[];

  isactive = [
    { label: "True" , value :true},
    { label: "False" ,  value :false },
  ];
  serviceorgoods = [
    { label: "Service" , value :1},
    { label: "Goods" ,  value :2},
  ];
  percentageorvalue = [
    { label: "Percentage" , value :'Percentage'},
    { label: "Value" ,  value :'Value'},
  ];

  disable:boolean=false;
  item : Item[] = []
  uomname : Item[] = [];
 cols:any[];


 displayDialog!: boolean;
  // itemForDialog!: Item;

 first = 0;

 rows = 7;
 loading: boolean = true;
 ledgernameunique : boolean = true;
 submitted : boolean;
  itemnameonedit: string;
  itemnameunique: boolean;
  selectedUom: Item=new Item();

  uomForDialog!: Item;

  itemmaster : Item[] = []

 constructor(private itemservice : ItemService , private checkuniqueservice : CheckUniqueService) { }


 ngOnInit(): void {
  this.retrieveItem();
  this.retrieveUomddl();
  this.cols = [
    { field: "itemname", header: "Item Name" },
    { field: "itemnamedescription", header: "Description" },
    { field: "isactive", header: "Status" }
  ];
  this.exportColumns = this.cols.map(col => ({
    title: col.header,
    dataKey: col.field
  }));
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
  text: 'Item updated successfully!',
  icon: 'success'})
}
alertSave(){
  Swal.fire({
    text: 'Item saved successfully!',
    icon: 'success'})
}
retrieveItem(): void {
  this.itemservice.getAll()
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
  this.itemservice.getUom()
    .subscribe({
      next: (data) => {
        this.uomname = data;
         this.loading = false;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}

clonedUom: { [s: string]: Item; } = {};
  onRowEditInit(uom: Item) {    
    this.disable=true; 
    console.log('Row edit initialized');
    this.clonedUom[uom.itemname!] = { ...uom };
    
  }
  alertUniqueError(){
    Swal.fire({
      text: 'Ledger name should be unique!',
      icon: 'warning'})
  }
  
  onRowEditSave(id : number ,uom: Item) {
    console.log('Row edit saved');
    console.log(uom);
    this.uomForDialog.uomid=this.uomForDialog.uomid;
    this.itemservice.update(id,uom)
    // this.itemservice.update(id,uom)
    // this.checkuniqueservice.checkUnique(id,uom.itemname.trim(),'checknormalledgeruniqueonedit').subscribe({
    // next:(uniquedata)=> { 
    //   console.log(uniquedata)
    //   if(uniquedata == false) { 
    //     this.ngOnInit();
    //     this.alertUniqueError(); 
    //     this.disable=false;
    //   }  
      // else{
        console.log(uom)
      this.itemservice.update(id,uom)
      .subscribe( data => {
        this.ngOnInit();
        this.alertUpdate();
        this.disable=false;
      });
    // }
    // },

    // error :(e) =>console.error(e)

    // });
  }
  // onRowEditCancel(group: Normalledger, index: number) {
  //   console.log('Row edit cancelled');
  //   // this.companies[index] = this.clonedGroups[group.ledgername!];
  //   this.subgroups[index] = this.clonedGroups[group.ledgername!];
  //   delete this.clonedGroups[group.ledgername!];
  //   this.ledgernameonedit = group.ledgername;
  //   this.disable=false;
  // }

  onRowEditCancel(uom: Item, index: number) {
    console.log('Row edit cancelled');
    this.item[index] = this.clonedUom[uom.itemname!];
    delete this.clonedUom[uom.itemname!];
    this.itemnameonedit = uom.itemname;
    this.disable=false;
  }

  // clonedItemuom: { [s: string]: Item; } = {};
  // onRowEditIniting(uom: Item) {
  //   console.log('Row edit initialized');
  //   this.clonedUom[uom.uomname!] = { ...uom };
  // }
  
  onUomAdd(){
    this.uomForDialog = {
      itemname: null!, itemdescription: null!, isactive: null!, percentageorvalue: null!, uomid: null!
  };
    this.displayDialog = true;
  }
  saveUom(){
    this.submitted = true;
    // this.uomForDialog.uomid=this.selectedUom.uomid;
    // this.uomForDialog.uomname=this.selectedUom.uomname;
    // this.uomForDialog.uomid=this.selectedUom.uomid;
    
    for (let index = 0; index < this.item.length; index++) {
      if (this.item[index].itemname == this.uomForDialog.itemname.trim())
      {

        this.itemnameunique = false;
        break;
      }
      else{
        this.itemnameunique = true;
      }      
    }
  
     if(this.itemnameunique)
    {
    
    this.uomForDialog.uomid = this.selectedUom.uomid;
    this.uomForDialog.uomname = this.selectedUom.uomname;
    this.uomForDialog.serviceorgoods=this.selectedUom.serviceorgoods;
    this.uomForDialog.percentageorvalue=this.selectedUom.percentageorvalue;
    console.log(this.uomForDialog);
    console.log('Item Saved');
    this.itemservice.create(this.uomForDialog)
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

exportPdf() {
  const rows=[];
  this.item.forEach(elm => {
    const temp = [ elm.itemname, elm.itemdescription, elm.uomname, elm.isactive];
    rows.push(temp);
    console.log('Rows', rows); // showing all data
  });
  let doc = new jsPDF();
  autoTable(doc,{
    columns:this.exportColumns,
    body:rows
  });
  doc.save('Item.pdf');
  
  
}
exportExcel() {
  let itemsort:Item[];
  console.log(this.item.map((x)=>{Itemname:x.itemname}));
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.item); // Sale Data
      const workbook = { Sheets: { 'item': worksheet }, SheetNames: ['item'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "item");
  });
}
saveAsExcelFile(buffer: any, fileName: string): void {
  let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
 
}


}
