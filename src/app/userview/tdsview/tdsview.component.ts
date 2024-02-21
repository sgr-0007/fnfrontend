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
import { Gstdetails } from 'src/app/models/gstdetails.model';
import { VoucherService } from 'src/app/services/voucher.service';






@Component({
  selector: 'app-tdsview',
  templateUrl: './tdsview.component.html',
  styleUrls: ['./tdsview.component.css'],
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


export class TdsviewComponent implements OnInit {
  exportColumns: any[];

  isactive = [
    { label: "Active" , value :true},
    { label: "InActive" ,  value :false },
  ];

 groups : Gstdetails[] = []
 balancesheetgroups :BalanceGroup[] = [] 

 cols:any[];

 displayDialog!: boolean;
groupForDialog!: Gstdetails;

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
  vgstid : number = 0;
 constructor(private groupservice :VoucherService) { }


 ngOnInit(): void {
  this.retrieveGroups();
  

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
  text: 'updated successfully!',
  icon: 'success'})
}
alertSave(){
  Swal.fire({
    text: 'Saved successfully!',
    icon: 'success'})
}
retrieveGroups(): void {
  this.groupservice.getGstIt()
    .subscribe({
      next: (data) => {
        this.groups = data;
         this.loading = false;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}

  onRowEditSave(id : number) {
    this.onGroupAdd(id);
      
  }
  onGroupAdd(id : number){
      this.vgstid = id;
    this.groupForDialog = {
      naturetransac:null!,
    challanno:null!,
    tdsremitted:null!,
    challandate:null!,
    nameofthebank:null!,
    bankbranch:null!,
    bsrcode:null!,    
    tdsreturnform:null!,
    year:null!,
    quarter:null!,
    branchapf:null!,   
    duedate:null!,
    dateoffiling:null!,
    ogreturnackform:null!,
    supplyattract:null!,

  };
    this.displayDialog = true;
  }
  onGroupReset(){
    this.groupForDialog = {
      naturetransac:null!,
      challanno:null!,
      tdsremitted:null!,
      challandate:null!,
      nameofthebank:null!,
      bankbranch:null!,
      bsrcode:null!,    
      tdsreturnform:null!,
      year:null!,
      quarter:null!,
      branchapf:null!,   
      duedate:null!,
      dateoffiling:null!,
      ogreturnackform:null!,
      supplyattract:null!,
  };
    this.displayDialog = true;
    this.submitted =false;
  }
 

clear(table: Table) {
  table.clear();
}
saveGroup() {
  console.log('Row edit saved');     
      this.groupservice.UPDGstIt(this.vgstid,this.groupForDialog)
      .subscribe( data => {
        this.ngOnInit();
        this.displayDialog = false;
        this.alertUpdate();
        this.disable=false;
      });
}


}
