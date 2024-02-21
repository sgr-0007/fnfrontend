import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Subgroup } from 'src/app/models/subgroup.model';
import { CheckUniqueService } from 'src/app/services/checkunique.service';
import { SubgroupService } from 'src/app/services/subgroup.service';
import Swal from 'sweetalert2';
import FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SubLedger } from 'src/app/models/subledger';
import { SubLedgerService } from 'src/app/services/subledger.service';
import { NormalledgerService } from 'src/app/services/normalledger.service';
@Component({
  selector: 'app-subledgermaster',
  templateUrl: './subledgermaster.component.html',
  styleUrls: ['./subledgermaster.component.css'], 
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
export class SubledgermasterComponent implements OnInit {

  exportColumns: any[];
  disable:boolean=false;
  isactive = [
    { label: "Active" , value :true},
    { label: "InActive" ,  value :false },
  ];

 subgroups : SubLedger[] = []
 groups : SubLedger[] = [];

 cols:any[];

 selectedGroup!: SubLedger;


 displayDialog!: boolean;
  groupForDialog!: SubLedger;

 first = 0;

 rows = 10;
 loading: boolean = true;
  submitted: boolean;
  subgroupnameunique: boolean = true;
  subgroupcodeunique: boolean = true;
  subgroupnameonedit: string;



 constructor(private subgroupservice : SubLedgerService , private checkuniqueservice : CheckUniqueService,private nlservice : NormalledgerService) { }


 ngOnInit(): void {
  this.retrieveSubGroups();
  this.retrieveGroupddl();
  this.cols = [
    { field: "subledgername", header: "subledgername" },
        { field: "ledgername", header: "ledgername" },

    { field: "groupname", header: "Group Name" },
    { field: "subgroupname", header: "Sub Group Name" },
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
  return this.subgroups ? this.first === (this.subgroups.length - this.rows): true;
}

isFirstPage(): boolean {
  return this.subgroups ? this.first === 0 : true;
}

alertUpdate(){
  Swal.fire( {
  text: 'SubLedger updated successfully!',
  icon: 'success'})
}
alertSave(){
  Swal.fire({
    text: 'SubLedger saved successfully!',
    icon: 'success'})
}
alertUniqueError(){
  Swal.fire({
    text: 'SubLedger should be unique!',
    icon: 'warning'})
}
retrieveSubGroups(): void {
  this.subgroupservice.getAll()
    .subscribe({
      next: (data) => {
        this.subgroups = data;
         this.loading = false;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}
retrieveGroupddl(): void {
  this.nlservice.getAll()
    .subscribe({
      next: (data) => {
        this.groups = data.filter(s => s.isactive);
         this.loading = false;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}

clonedGroups: { [s: number]: SubLedger; } = {};
  onRowEditInit(group: SubLedger) {   
    this.disable=true; 
    console.log(group);
    this.clonedGroups[group.subledgerid!] = { ...group };
  }
  onRowEditSave(id : number ,group: SubLedger) {
    console.log('Row edit saved');
    console.log("Number"+id);
   
      this.subgroupservice.update(id,group)
      .subscribe( data => {
        this.ngOnInit();
        this.alertUpdate();
        this.disable=false;
      });
  }
  onRowEditCancel(group: SubLedger, index: number) {
    console.log('Row edit cancelled');
    this.subgroups[index] = this.clonedGroups[group.subledgerid!];
    delete this.clonedGroups[group.subledgerid!];
    this.disable=false;
  }

  onGroupAdd(){
    this.groupForDialog = {
      subgroupname: null!,
  };
    this.displayDialog = true;
  }
  onGroupReset(){

    this.groupForDialog = {
      subgroupname: null!,
  };
    this.displayDialog = true;
  }
  saveGroup(){
 
    this.subgroupservice.create(this.groupForDialog)
    .subscribe( data => {
      this.ngOnInit();
      this.alertSave();
    });
    this.displayDialog = false;

  
  }

clear(table: Table) {
  table.clear();
}

exportPdf() {
  const rows=[];
  this.subgroups.forEach(elm => {
    const temp = [ elm.subledgername, elm.ledgername, elm.groupname, elm.subgroupname];
    rows.push(temp);
    console.log('Subgroup', rows); // showing all data
  });
  let doc = new jsPDF();
  autoTable(doc,{
    columns:this.exportColumns,
    body:rows
  });
  doc.save('SubLedger.pdf');
  
  
}
exportExcel() {
  let subgroupsort:Subgroup[];
  console.log(this.subgroups.map((x)=>{Subgroupname:x.subgroupname}));
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.subgroups); // Sale Data
      const workbook = { Sheets: { 'subledger': worksheet }, SheetNames: ['subledger'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "subledger");
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
