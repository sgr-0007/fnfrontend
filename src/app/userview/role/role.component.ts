import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Role } from 'src/app/models/role.model';
import { CheckUniqueService } from 'src/app/services/checkunique.service';
import { RoleService } from 'src/app/services/role.service';
import Swal from 'sweetalert2';
import FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
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
export class RoleComponent implements OnInit {

  isactive = [
    { label: "Active" , value :true},
    { label: "InActive" ,  value :false },
  ];
  disable:boolean=false;
 roles : Role[] = []
 exportColumns: any[];

 cols:any[];

 displayDialog!: boolean;
  roleForDialog!: Role;

 first = 0;

 rows = 5;
 loading: boolean = true;
  roleunique: boolean;
  submitted: boolean;



 constructor(private roleservice : RoleService , private checkuniqueservice : CheckUniqueService) { }

 ngOnInit(): void {
  this.retrieveRoles();
  this.cols = [
    { field: "rolename", header: "Role" },
    { field: "roledescription", header: "Description" },
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
  return this.roles ? this.first === (this.roles.length - this.rows): true;
}

isFirstPage(): boolean {
  return this.roles ? this.first === 0 : true;
}

alertUpdate(){
  Swal.fire( {
  text: 'Role updated successfully!',
  icon: 'success'})
}
alertSave(){
  Swal.fire({
    text: 'Role saved successfully!',
    icon: 'success'})
}
retrieveRoles(): void {
  this.roleservice.getAll()
    .subscribe({
      next: (data) => {
        this.roles = data;
         this.loading = false;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}


clonedRoles: { [s: string]: Role; } = {};
  onRowEditInit(role: Role) {
    this.disable=true; 
    console.log('Row edit initialized');
    this.clonedRoles[role.rolename!] = { ...role };
  }
  onRowEditSave(id : number ,role: Role) {
    console.log('Row edit saved');
    this.checkuniqueservice.checkUnique(id,role.rolename.trim(),'checkroleuniqueonedit').subscribe({
    next:(uniquedata)=> { 
      if(uniquedata == false) { 
        this.ngOnInit();
        this.alertUniqueError(); 
        this.disable=false;
      }  
      else{
      this.roleservice.update(id,role)
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
  alertUniqueError(){
    Swal.fire({
      text: 'Role name should be unique!',
      icon: 'warning'})
  }

  onRowEditCancel(role: Role, index: number) {
    console.log('Row edit cancelled');
    this.roles[index] = this.clonedRoles[role.rolename!];
    delete this.clonedRoles[role.rolename!];
    this.disable=false;
  }

  onRoleAdd(){
    this.roleForDialog = {
      rolename: null!, roledescription: null!, isactive: null!
  };
    this.displayDialog = true;
  }
  onRoleReset(){
    this.roleForDialog = {
      rolename: null!, roledescription: null!, isactive: null!
  };
    this.displayDialog = true;
  }
  saveRole(){
    this.submitted =true;
    console.log('Role Saved');
    console.log(this.roleForDialog);
    for (let index = 0; index < this.roles.length; index++) {
      if (this.roles[index].rolename == this.roleForDialog.rolename.trim())
      {
        console.log(this.roles[index].rolename)
        console.log(this.roleForDialog.rolename)
        this.roleunique = false;
        break;
      }
      else{
        this.roleunique = true;
      }      
    }
  
     if(this.roleunique)
    {

    this.roleservice.create(this.roleForDialog)
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
  this.roles.forEach(elm => {
    const temp = [ elm.rolename, elm.roledescription, elm.isactive];
    rows.push(temp);
    console.log('Rows', rows); // showing all data
  });
  let doc = new jsPDF();
  autoTable(doc,{
    columns:this.exportColumns,
    body:rows
  });
  doc.save('Role.pdf');
  
  
}
exportExcel() {
  let rolesort:Role[];
  console.log(this.roles.map((x)=>{Rolename:x.rolename}));
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.roles); // Sale Data
      const workbook = { Sheets: { 'role': worksheet }, SheetNames: ['role'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "role");
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
