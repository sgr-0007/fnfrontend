import { Component, OnInit } from '@angular/core';
import { Voucher } from 'src/app/models/voucher.model';
import { VoucherService } from 'src/app/services/voucher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  
  exportColumns: any[];

  isactive = [
    { label: "Active" , value :true},
    { label: "InActive" ,  value :false },
  ];

 groups : Voucher[] = []

 cols:any[];

 displayDialog!: boolean;
groupForDialog!: Voucher;

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

 constructor(private groupservice : VoucherService) { }


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
  text: 'Employee updated successfully!',
  icon: 'success'})
}
alertSave(){
  Swal.fire({
    text: 'Employee saved successfully!',
    icon: 'success'})
}
alertUniqueError(){
  Swal.fire({
    text: 'Employee name should be unique!',
    icon: 'warning'})
}
retrieveGroups(): void {
  this.groupservice.getempbank()
    .subscribe({
      next: (data) => {
        this.groups = data;
         this.loading = false;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}



clonedGroups: { [s: string]: Voucher; } = {};
  onRowEditInit(group: Voucher) {
    this.disable=true;
    console.log('Row edit initialized');
    this.clonedGroups[group.bankemployeeid!] = { ...group };
    
  }
  onRowEditSave(id : number ,group: Voucher) {
    console.log('Row edit saved');
    console.log(group);

     
        this.groupservice.updateEmp(id,group)
        .subscribe( data => {
          this.ngOnInit();
          this.alertUpdate();
          this.disable=false;
        });   
    
  }
  onRowEditCancel(group: Voucher, index: number) {
    console.log('Row edit cancelled');
    this.groups[index] = this.clonedGroups[group.bankemployeeid!];
    delete this.clonedGroups[group.bankemployeeid!];
    this.disable=false;
  }

  onGroupAdd(){
    this.groupForDialog = {
      employeename: null!,designation: null!, bank: null!,
      ifsc: null!,accountno:null!,employeecode:null!  };
    this.displayDialog = true;
  }
  onGroupReset(){
    this.groupForDialog = {
      employeename: null!,designation: null!, bank: null!,
      ifsc: null!,accountno:null!,employeecode:null!  };
    this.displayDialog = true;
    this.submitted =false;
  }
  saveGroup(){
    this.submitted =true;  
    console.log(this.groups)
    console.log(this.groupForDialog.employeename)
    this.groupservice.createEmp(this.groupForDialog)
    .subscribe( data => {
      this.ngOnInit();
      this.alertSave();
    });

    this.displayDialog = false;
  }


}
