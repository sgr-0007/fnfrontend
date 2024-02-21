import { Component, OnInit } from '@angular/core';
import { Voucher } from 'src/app/models/voucher.model';
import { VoucherService } from 'src/app/services/voucher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pensioner',
  templateUrl: './pensioner.component.html',
  styleUrls: ['./pensioner.component.css']
})
export class PensionerComponent implements OnInit {

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
  text: 'Pensioner updated successfully!',
  icon: 'success'})
}
alertSave(){
  Swal.fire({
    text: 'Pensioner saved successfully!',
    icon: 'success'})
}
alertUniqueError(){
  Swal.fire({
    text: 'Pensioner name should be unique!',
    icon: 'warning'})
}
retrieveGroups(): void {
  this.groupservice.getPensioner()
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
    this.clonedGroups[group.pensionerid!] = { ...group };
    
  }
  onRowEditSave(id : number ,group: Voucher) {
    console.log('Row edit saved');
    console.log(group);

     
        this.groupservice.updatePensioner(id,group)
        .subscribe( data => {
          this.ngOnInit();
          this.alertUpdate();
          this.disable=false;
        });   
    
  }
  onRowEditCancel(group: Voucher, index: number) {
    console.log('Row edit cancelled');
    this.groups[index] = this.clonedGroups[group.pensionerid!];
    delete this.clonedGroups[group.pensionerid!];
    this.disable=false;
  }

  onGroupAdd(){
    this.groupForDialog = {
      pensioner: null!,designationpensioner: null!, ifscpensioner: null!, accnopensioner: null!,annuityno:null!
  };
    this.displayDialog = true;
  }
  onGroupReset(){
    this.groupForDialog = {
      pensioner: null!,designationpensioner: null!, ifscpensioner: null!, accnopensioner: null!,annuityno:null!
  };
    this.displayDialog = true;
    this.submitted =false;
  }
  saveGroup(){
    this.submitted =true;  
    console.log(this.groups)
    console.log(this.groupForDialog.pensioner)
    this.groupservice.createPensioner(this.groupForDialog)
    .subscribe( data => {
      this.ngOnInit();
      this.alertSave();
    });

    this.displayDialog = false;
  }
}
