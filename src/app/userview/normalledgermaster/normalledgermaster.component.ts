import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Normalledger } from 'src/app/models/normalledger.model';
import { CheckUniqueService } from 'src/app/services/checkunique.service';
import { NormalledgerService } from 'src/app/services/normalledger.service';
import Swal from 'sweetalert2';
import FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Companymaster } from 'src/app/models/companymaster.model';
import { Companytype } from 'src/app/models/companytype.model';
import { VoucherService } from 'src/app/services/voucher.service';
import { OfficeAccount } from 'src/app/models/officeaccount.model';

@Component({
  selector: 'app-normalledgermaster',
  templateUrl: './normalledgermaster.component.html',
  styleUrls: ['./normalledgermaster.component.css'],
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
export class NormalledgermasterComponent implements OnInit {
  exportColumns: any[];

  isactive = [
    { label: "Active" , value :true},
    { label: "InActive" ,  value :false },
  ];
  disable:boolean=false;
  normalledger : Normalledger[] = []
 groups : Normalledger[] = [];
 subgroups : Normalledger[] = [];
 companies : Companymaster[] = [];
 cols:any[];

 selectedGroup!: Normalledger;
 selectedSubgroup!: Normalledger;
 selectedCompanymaster!: Normalledger;


 displayDialog!: boolean;
  groupForDialog!: Normalledger;
  subgroupForDialog!: Normalledger;
  companymasterForDialog!: Normalledger;

 first = 0;

 rows = 7;
 loading: boolean = true;
 ledgernameunique : boolean = true;
 submitted : boolean;
  ledgernameonedit: string;
  companytypes: Companytype[];
  loginuid: number = +sessionStorage.getItem("loginid");
  voucherAccounts: OfficeAccount[];


 constructor(private normalledgerservice : NormalledgerService ,private voucherservice: VoucherService, private checkuniqueservice : CheckUniqueService) { }


 ngOnInit(): void {
   this.retrieveNormalledger();
  this.retrieveGroupddl();
  this.retrieveCompanymasterddl();
  this.retrieveSubgroupddl();
  this.retrieveCompanyTypesddl();
  //this.getAccTypes();
  this.cols = [
    { field: "ledgername", header: "Ledger Name" },
    { field: "groupname", header: "Group Name" },
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
  return this.subgroups ? this.first === (this.subgroups.length - this.rows): true;
}

isFirstPage(): boolean {
  return this.subgroups ? this.first === 0 : true;
}

alertUpdate(){
  Swal.fire( {
  text: 'Normalledger updated successfully!',
  icon: 'success'})
}
alertSave(){
  Swal.fire({
    text: 'Normalledger saved successfully!',
    icon: 'success'})
}
retrieveNormalledger(): void {
  this.normalledgerservice.getAll()
    .subscribe({
      next: (data) => {
        this.normalledger = data;
         this.loading = false;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}
retrieveGroupddl(): void {
  this.normalledgerservice.getGroups()
    .subscribe({
      next: (data) => {
        this.groups = data;
         this.loading = false;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}
retrieveSubgroupddl(): void {
  this.normalledgerservice.getSubgroups()
    .subscribe({
      next: (data) => {
        this.subgroups = data;
         this.loading = false;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}
retrieveCompanymasterddl(): void {
  this.normalledgerservice.getCompanies()
    .subscribe({
      next: (data) => {
        this.companies = data;

         this.loading = false;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}
retrieveCompanyTypesddl(): void {
  this.normalledgerservice.getAllCtypes()
    .subscribe({
      next: (data) => {
        this.companytypes = data;

         this.loading = false;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}
clonedGroups: { [s: string]: Normalledger; } = {};
  onRowEditInit(group: Normalledger) {
    this.disable=true; 
    console.log('Row edit initialized');
    this.clonedGroups[group.ledgername!] = { ...group };

  }
  onRowEditSave(id : number ,group: Normalledger) {
    console.log('Row edit saved');
    this.checkuniqueservice.checkUnique(id,group.ledgername.trim(),'checknormalledgeruniqueonedit').subscribe({
    next:(uniquedata)=> { 
      console.log(uniquedata)
      if(uniquedata == false) { 
        this.ngOnInit();
        this.alertUniqueError(); 
        this.disable=false;
      }  
      else{
        console.log(group)
      this.normalledgerservice.update(id,group)
      .subscribe( data => {
        this.ngOnInit();
        this.alertUpdate();
        this.disable=false;
      });
    }
    },

    error :(e) =>console.error(e)

    });
  }
  onRowEditCancel(group: Normalledger, index: number) {
    console.log('Row edit cancelled');
    // this.companies[index] = this.clonedGroups[group.ledgername!];
    this.subgroups[index] = this.clonedGroups[group.ledgername!];
    delete this.clonedGroups[group.ledgername!];
    this.ledgernameonedit = group.ledgername;
    this.disable=false;
  }

  clonedSubgroups: { [s: string]: Normalledger; } = {};
  onRowEditIniting(subgroup: Normalledger) {
    console.log('Row edit initialized');
    this.clonedGroups[subgroup.ledgername!] = { ...subgroup };
  }
  clonedCompanies: { [s: string]: Normalledger; } = {};
  onRowEditInitings(companymaster: Normalledger) {
    console.log('Row edit initialized');
    this.clonedGroups[companymaster.ledgername!] = { ...companymaster };
  }
  
  alertUniqueError(){
    Swal.fire({
      text: 'Ledger name should be unique!',
      icon: 'warning'})
  }
  onRowEditCanceling(subgroup: Normalledger, companymaster: Normalledger, index: number) {
    console.log('Row edit cancelled');
    // this.companies[index] = this.clonedCompanies[companymaster.ledgername!];
    delete this.clonedGroups[companymaster.ledgername!];
    this.subgroups[index] = this.clonedSubgroups[subgroup.ledgername!];
    delete this.clonedGroups[subgroup.ledgername!];
  }  

  onGroupAdd(){
    this.groupForDialog = {
      ledgername: null!, ledgeralias: null!, isactive: null!
  };
    this.displayDialog = true;
  }
  saveGroup(){
    this.submitted = true;
    this.ledgernameunique = true;
    console.log('Normalledger Saved');
    if(this.normalledger!=null){
    for (let index = 0; index < this.normalledger.length; index++) {
      if (this.normalledger[index].ledgername == this.groupForDialog.ledgername.trim())
      {

        this.ledgernameunique = false;
        break;
      }
      else{
        this.ledgernameunique = true;
      }      
    }
    }
     if(this.ledgernameunique)
    {
    

    //this.groupForDialog.subgroupid=0;
    console.log(this.groupForDialog);
    this.normalledgerservice.create(this.groupForDialog)
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
  this.normalledger.forEach(elm => {
    const temp = [ elm.ledgername, elm.groupname, elm.isactive];
    rows.push(temp);
    console.log('Rows', rows); // showing all data
  });
  let doc = new jsPDF();
  autoTable(doc,{
    columns:this.exportColumns,
    body:rows
  });
  doc.save('Normalledger.pdf');
  
  
}
exportExcel() {
  let normalledgersort:Normalledger[];
  console.log(this.normalledger.map((x)=>{Normalledgername:x.ledgername}));
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.normalledger); // Sale Data
      const workbook = { Sheets: { 'normalledger': worksheet }, SheetNames: ['normalledger'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "normalledger");
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
// getAccTypes() {
// this.voucherservice.getOfficeAccounts(this.loginuid)
// .subscribe({
//   next: (data) => {
//     this.voucherAccounts = data;
//     console.log(data);
//   },
//   error: (e) => console.error(e)
// });
// }
getAccountTypes(oid : number) {
  this.voucherservice.getAccounts(oid)
  .subscribe({
    next: (data) => {
      this.voucherAccounts = data;
      console.log(data);
    },
    error: (e) => console.error(e)
  });
  }
  
  officeOnChange(cid : number){
    this.getAccountTypes(cid);

  }

}
