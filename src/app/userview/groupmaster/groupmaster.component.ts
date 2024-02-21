import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { BalanceGroup } from 'src/app/models/balancegroup';
import { Group } from 'src/app/models/group.model';
import { CheckUniqueService } from 'src/app/services/checkunique.service';
import { GroupService } from 'src/app/services/group.service';
import Swal from 'sweetalert2';
import FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';






@Component({
  selector: 'app-groupmaster',
  templateUrl: './groupmaster.component.html',
  styleUrls: ['./groupmaster.component.css'],
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


export class GroupmasterComponent implements OnInit {
  exportColumns: any[];

  isactive = [
    { label: "Active" , value :true},
    { label: "InActive" ,  value :false },
  ];

 groups : Group[] = []
 balancesheetgroups :BalanceGroup[] = [] 

 cols:any[];

 displayDialog!: boolean;
groupForDialog!: Group;

disable:boolean=false;
 first = 0;

 rows = 10;
 loading: boolean = true;

 submitted:boolean = false;
 groupnameunique:boolean = true;
 groupcodeunique:boolean = true;
 groupnameonedit:string;
  groupidonedit: number;
  groupcodeonedit:string;

 constructor(private groupservice : GroupService, private checkuniqueservice : CheckUniqueService) { }


 ngOnInit(): void {
  this.retrieveGroups();
  this.retrieveBalanceSheetGroups();
  this.cols = [
    { field: "groupname", header: "Group" },
    { field: "groupcode", header:"Head Code"},
    { field: "groupdescription", header: "Description" },
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
  return this.groups ? this.first === (this.groups.length - this.rows): true;
}

isFirstPage(): boolean {
  return this.groups ? this.first === 0 : true;
}

alertUpdate(){
  Swal.fire( {
  text: 'Group updated successfully!',
  icon: 'success'})
}
alertSave(){
  Swal.fire({
    text: 'Group saved successfully!',
    icon: 'success'})
}
alertUniqueError(){
  Swal.fire({
    text: 'Group name should be unique!',
    icon: 'warning'})
}
retrieveGroups(): void {
  this.groupservice.getAll()
    .subscribe({
      next: (data) => {
        this.groups = data;
         this.loading = false;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}

retrieveBalanceSheetGroups(): void {
  this.groupservice.getAllBalanceSheetGroups()
    .subscribe({
      next: (data) => {
        this.balancesheetgroups = data;
         this.loading = false;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}

clonedGroups: { [s: string]: Group; } = {};
  onRowEditInit(group: Group) {
    this.disable=true;
    console.log('Row edit initialized');
    this.clonedGroups[group.groupname!] = { ...group };
    this.groupnameonedit =  group.groupname;
    this.groupidonedit =  group.groupid;
    this.groupcodeonedit = group.groupcode;
  }
  onRowEditSave(id : number ,group: Group) {
    console.log('Row edit saved');
    console.log(group);


    this.checkuniqueservice.checkUnique(id,group.groupname.trim(),'checkgroupuniqueonedit').subscribe({
      next:(uniquedata)=> { 
        if(uniquedata == false) { 
          this.ngOnInit();
          this.alertUniqueError(); 
          this.disable=false;
        }  
        else{
        this.groupservice.update(id,group)
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
  onRowEditCancel(group: Group, index: number) {
    console.log('Row edit cancelled');
    this.groups[index] = this.clonedGroups[group.groupname!];
    delete this.clonedGroups[group.groupname!];
    this.disable=false;
  }

  onGroupAdd(){
    this.groupForDialog = {
      groupname: null!,groupcode: null!, groupdescription: null!, isactive: null!
  };
    this.displayDialog = true;
  }
  onGroupReset(){
    this.groupForDialog = {
      groupname: null!,groupcode: null!, groupdescription: null!, isactive: null!
  };
    this.displayDialog = true;
    this.submitted =false;
  }
  saveGroup(){
    this.submitted =true;  
    this.groupnameunique = true;
    this.groupcodeunique = true;
    console.log(this.groupnameunique)
    console.log(this.groups)
    console.log(this.groupForDialog.groupname)
    if(this.groups!=null)
    {
    for (let index = 0; index < this.groups.length; index++) {
        if (this.groups[index].groupname.toLowerCase() == this.groupForDialog.groupname.trim().toLowerCase())
      {
        console.log(this.groups[index].groupname)
        console.log(this.groupForDialog.groupname)
        this.groupnameunique = false;
        break;
      }
      else{
        this.groupnameunique = true;
      }
      console.log(this.groupForDialog.groupcode)
      if(  this.groups[index].groupcode!=null )
      {
      if (this.groups[index].groupcode.toLowerCase() == this.groupForDialog.groupcode.trim().toLowerCase())
      {
        console.log(this.groups[index].groupcode)
        console.log(this.groupForDialog.groupcode)
        this.groupcodeunique = false;
        break;
      }
      else{
        this.groupcodeunique = true;
      }      
    }
  }
}
  
    if(this.groupnameunique&& this.groupcodeunique)
    {

    this.groupservice.create(this.groupForDialog)
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
  this.groups.forEach(elm => {
    const temp = [ elm.groupname,elm.groupcode, elm.groupdescription, elm.balancesheetgroup, elm.isactive];
    rows.push(temp);
    console.log('Rows', rows); // showing all data
  });
  let doc = new jsPDF();
  autoTable(doc,{
    columns:this.exportColumns,
    body:rows
  });
  doc.save('Group.pdf');
  
  
}
exportExcel() {
  let groupssort:Group[];
  console.log(this.groups.map((x)=>{Groupname:x.groupname}));
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.groups); // Sale Data
      const workbook = { Sheets: { 'group': worksheet }, SheetNames: ['group'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "group");
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
