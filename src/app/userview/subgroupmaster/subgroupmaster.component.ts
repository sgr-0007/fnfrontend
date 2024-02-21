import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Subgroup } from 'src/app/models/subgroup.model';
import { CheckUniqueService } from 'src/app/services/checkunique.service';
import { SubgroupService } from 'src/app/services/subgroup.service';
import Swal from 'sweetalert2';
import FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-subgroupmaster',
  templateUrl: './subgroupmaster.component.html',
  styleUrls: ['./subgroupmaster.component.css'],
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
export class SubgroupmasterComponent implements OnInit {
  exportColumns: any[];
  disable:boolean=false;
  isactive = [
    { label: "Active" , value :true},
    { label: "InActive" ,  value :false },
  ];

 subgroups : Subgroup[] = []
 groups : Subgroup[] = [];

 cols:any[];

 selectedGroup!: Subgroup;


 displayDialog!: boolean;
  groupForDialog!: Subgroup;

 first = 0;

 rows = 10;
 loading: boolean = true;
  submitted: boolean;
  subgroupnameunique: boolean = true;
  subgroupcodeunique: boolean = true;
  subgroupnameonedit: string;



 constructor(private subgroupservice : SubgroupService , private checkuniqueservice : CheckUniqueService) { }


 ngOnInit(): void {
  this.retrieveSubGroups();
  this.retrieveGroupddl();
  this.cols = [
    { field: "subgroupname", header: "Subgroup" },
    { field: "subgroupcode", header: "Subhead Code"},
    { field: "subgroupdescription", header: "Description" },
    { field: "groupname", header: "Group Name" },
    { field: "balancesheetgroup", header: "Balancesheet Group" },
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
  text: 'SubGroup updated successfully!',
  icon: 'success'})
}
alertSave(){
  Swal.fire({
    text: 'SubGroup saved successfully!',
    icon: 'success'})
}
alertUniqueError(){
  Swal.fire({
    text: 'Sub Head name should be unique!',
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
  this.subgroupservice.getGroups()
    .subscribe({
      next: (data) => {
        this.groups = data.filter(s => s.isactive);
         this.loading = false;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}

clonedGroups: { [s: string]: Subgroup; } = {};
  onRowEditInit(group: Subgroup) {   
    this.disable=true; 
    console.log('Row edit initialized');
    this.clonedGroups[group.subgroupname!] = { ...group };
    this.subgroupnameonedit = group.subgroupname;
  }
  onRowEditSave(id : number ,group: Subgroup) {
    console.log('Row edit saved');
    console.log("Number"+id);
     this.checkuniqueservice.checkUnique(id,group.subgroupname.trim(),'checksubgroupuniqueonedit').subscribe({
    next:(uniquedata)=> { 
      if(uniquedata == false) { 
        this.ngOnInit();
        this.alertUniqueError(); 
        this.disable=false;
      }  
      else{
      this.subgroupservice.update(id,group)
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
  onRowEditCancel(group: Subgroup, index: number) {
    console.log('Row edit cancelled');
    this.subgroups[index] = this.clonedGroups[group.subgroupname!];
    delete this.clonedGroups[group.subgroupname!];
    this.disable=false;
  }

  onGroupAdd(){
    this.groupForDialog = {
      subgroupname: null!,subgroupcode: null!, subgroupdescription: null!, isactive: null!
  };
    this.displayDialog = true;
  }
  onGroupReset(){

    this.groupForDialog = {
      subgroupname: null!,subgroupcode: null!, subgroupdescription: null!, isactive: null! , groupname:null!
  };
    this.displayDialog = true;
  }
  saveGroup(){
    console.log('SubGroup Saved');
    this.submitted =true;  
    this.subgroupnameunique = true;
    this.subgroupcodeunique = true;
    console.log(this.groupForDialog);
    if(this.subgroups!=null)
    {
    for (let index = 0; index < this.subgroups.length; index++) {
      if (this.subgroups[index].subgroupname.toLocaleLowerCase() == this.groupForDialog.subgroupname.trim().toLocaleLowerCase())
      {

        this.subgroupnameunique = false;
        break;
      }
      else{
        this.subgroupnameunique = true;
      }
      console.log(this.groupForDialog.subgroupcode)
      if (this.subgroups[index].subgroupcode == this.groupForDialog.subgroupcode.trim())
      {

        this.subgroupcodeunique = false;
        break;
      }
      else{
        this.subgroupcodeunique = true;
      }            
    }
    }
     if(this.subgroupnameunique&& this.subgroupcodeunique)
    {
    this.subgroupservice.create(this.groupForDialog)
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
  this.subgroups.forEach(elm => {
    const temp = [ elm.subgroupname, elm.subgroupdescription, elm.groupname, elm.balancesheetgroup, elm.isactive];
    rows.push(temp);
    console.log('Subgroup', rows); // showing all data
  });
  let doc = new jsPDF();
  autoTable(doc,{
    columns:this.exportColumns,
    body:rows
  });
  doc.save('Subgroup.pdf');
  
  
}
exportExcel() {
  let subgroupsort:Subgroup[];
  console.log(this.subgroups.map((x)=>{Subgroupname:x.subgroupname}));
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.subgroups); // Sale Data
      const workbook = { Sheets: { 'subgroup': worksheet }, SheetNames: ['subgroup'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "subgroup");
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
