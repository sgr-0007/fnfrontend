import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatTableExporterModule } from 'mat-table-exporter';
import { SalesLedger } from 'src/app/models/sales-ledger';
import { Saleview } from 'src/app/models/saleview';
import { SalesledgerService } from 'src/app/services/salesledger.service';
import Swal from 'sweetalert2';
import { selectVlaues } from '../salesledgerview/salesledgerview.component';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import FileSaver from 'file-saver';
import { GlobalConstants } from 'src/app/common/global-constants';
import { UsermasterService } from 'src/app/services/usermaster.service';



@Component({
  selector: 'app-purchaseview',
  templateUrl: './purchaseview.component.html',
  styleUrls: ['./purchaseview.component.css']
})
export class PurchaseviewComponent  extends MatTableExporterModule implements OnInit,AfterViewInit{

  title:string;
  salesData:Saleview[]=[];
  selectedData:Saleview[]=[];
  saleview1:Saleview[];
  disableedit=false;
  urole: number = 0;
  checker;number=0;
  
  maker:number=0
  
  loginuid: number = +sessionStorage.getItem("loginid");
  length:number;
  roelId:number=4;
  selectedId:number;
  approvalstatus:boolean=false;
  isLoading=true;
  selectdValue:selectVlaues=new selectVlaues(0,'null',null,null);
  Vlaues:selectVlaues[]=[new selectVlaues(1,'New','fiber_new','mat-color-green'),
                          new selectVlaues(2,'Check','done','mat-color-green'),
                          new selectVlaues(3,'Approved','done_all','mat-color-green'),
                          new selectVlaues(4,'Incorrect','clear','mat-color-red'),
                          new selectVlaues(5,'Rejected','clear_all','mat-color-red'),
                        ];
                        displayedColumns: string[] = ['ledgerCode','ledgerName', 'homeBranchName', 'city','state','subGroupId','approvalStatus','action'];
                        Vlaues1:selectVlaues[]=[new selectVlaues(1,'New','fiber_new','mat-color-green'),
                        new selectVlaues(2,'Check','done','mat-color-green'),
                        new selectVlaues(4,'Incorrect','clear','mat-color-red'),
                      ];



  constructor(private _route:Router,
    private _liveAnnouncer: LiveAnnouncer,  private uservice: UsermasterService,
    private _saleLedgerService:SalesledgerService) {
    super();
    this.isRowSelectable = this.isRowSelectable.bind(this);
  }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  dataSource :any;
  cat:number;
  
  first = 0;
  approver:number=0;
  rows = 10;
  moudleType: number = 9;
  
  ngOnInit(): void {
    this.title="List of Vendor's";
    this.renderSalesLedger();
    console.log(this.loginuid);
    this.checker=GlobalConstants.checker;
    this.approver=GlobalConstants.approver;
    this.maker=GlobalConstants.maker;
    
    this.uservice.userRoleCheck(this.loginuid, this.moudleType).subscribe(
      (response) => {
        console.log(response);
        if (response != null) {
          this.urole = response.roleid;
        } else {
          this.urole = 0;
        }
      }
    );
    if(this.roelId==3){
      this.displayedColumns=['ledgerCode','ledgerName', 'homeBranchName', 'city','state','approvalStatus']
      this.approvalstatus=true
    }else if(this.roelId==2){
      this.displayedColumns=['ledgerCode','ledgerName', 'homeBranchName', 'city','state','approvalStatus']
      this.approvalstatus=true
    }
    this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  } 
  renderSalesLedger(){
    this.cat=2;
    console.log(this._saleLedgerService.getLedgerDetailsByCat(this.cat).subscribe(
      (response) => {                           //next() callback
        console.log('response received')
        this.salesData = response; 
        console.log(this.salesData);
        this.dataSource = new MatTableDataSource(this.salesData);
        this.length=this.salesData.length;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.salesData)
        console.log(this.dataSource);
        console.log(this.salesData.length)
        this.isLoading = false;
      },
      (error)=>{
       
        
      }
    ));
  }
  generatePDF(){
    let doc = new jsPDF();
    let rows=[];
    console.log(this.displayedColumns)
    console.log(this.dataSource.filteredData)
    this.dataSource.filteredData.forEach(elm => {
      const temp = [ elm.ledgerName, elm.homeBranchName, elm.cityName, elm.stateName,elm.subGroupName];
      rows.push(temp);
      console.log('Rows', rows); // showing all data
    });
  autoTable(doc,{
    columns:['Ledger Name','Home Branch','City','State','Subgroup'],
    body:rows
  });
  doc.save('PurchaseList.pdf');
  
  }

  chekforuser(approve): boolean {

    if (this.urole == GlobalConstants.maker) {
      this.maker=GlobalConstants.maker;
      if (approve.valueid == 1) {
        console.log(approve.valueid)
        return false;
        

      }else return true;
    } else
      if (this.urole == GlobalConstants.checker) {
        console.log("Values Before"+approve.valueid)
        if (approve.valueid !== 3 && approve.valueid !== 5) {
          console.log(approve.valueid)
          return false;
        } else return true;

      } else if (this.urole == GlobalConstants.approver) {
          console.log(approve.valueid)
          return false;
      
      }
      return true;


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
    return this.salesData ? this.first === (this.salesData.length - this.rows): true;
  }
  
  isFirstPage(): boolean {
    return this.salesData ? this.first === 0 : true;
  }

  
  clonedGroups: { [s: string]: Saleview; } = {};
  onRowEditInit(sale: Saleview) {
     this.disableedit=true;
    console.log('Row edit initialized');
    this.clonedGroups[sale.ledgerId] = { ...sale }; 
    console.log(this.clonedGroups)
  }
  onRowEditSave(id : number ,sale: Saleview) {
    console.log('Row edit saved');
    console.log(sale);
      
    this.updateStatus(sale);
    
  }
  onRowEditCancel(sale: Saleview, index: number) {
   /*  console.log('Row edit cancelled');
    this.salesData[index] = this.clonedGroups[group];
    delete this.clonedGroups[group];
    this.disable=false; */
    
    this.salesData[index]=this.clonedGroups[sale.ledgerId];
    delete this.clonedGroups[sale.ledgerId]
  }


  
  isRowSelectable(event) {
    console.log("is row selectable")
    console.log("outof staock for approve"+
    !this.isAlreadyApproved(event.data))
    return !this.isAlreadyApproved(event.data);
}


approveSelectedLdger(){
  if(this.selectedData.length==0){
    Swal.fire("Warning","No ledger is been selected");  
  }else{
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.selectedData.forEach(
          (x)=>{
            console.log(x);
            x.approvalStatus=this.Vlaues[2].valueid;
            this.updateStatus(x)
            
          }
        )
        
      }
    })



    
  /* Swal.fire({
    title: 'Are you sure you want to approve all the selected ledger',
    icon: 'info',
    confirmButtonText: 'Log in'
  }).then((result) => {
    if (result['isConfirmed']){
      console.log(this.selectedData);
  this.selectedData.forEach(
    (x)=>{
      console.log(x);
      x.approvalStatus=this.Vlaues[2].valueid;
      this.updateStatus(x)
    }
  )
    }
  }) */
}
}
rejectSelectedLdger(){
  console.log(this.selectedData);
  this.selectedData.forEach(
    (x)=>{
      console.log(x);
      x.approvalStatus=this.Vlaues[4].valueid;
      this.updateStatus(x)
    }
  )
}
createLdger(){
  this._route.navigate(['/prucaheledger']);
}
checkSelectedLdger(){
  console.log(this.selectedData);
  this.selectedData.forEach(
    (x)=>{
      console.log(x);
      x.approvalStatus=this.Vlaues[1].valueid;
      this.updateStatus(x)
    }
  )
}
incorrectSelectedLdger(){
  console.log(this.selectedData);
  this.selectedData.forEach(
    (x)=>{
      console.log(x);
      x.approvalStatus=this.Vlaues[3].valueid;
      this.updateStatus(x)
    }
  )
}
isAlreadyApproved(data) {
  console.log("Message outof stock")
  console.log("approvalstatus:"+data.approvalStatus)
        return (data.approvalStatus === this.Vlaues[2].valueid);
    }

  view(element:Saleview){
    this._route.navigate(['/ledgerview', {queryParams:JSON.stringify(element)}]);
  }
  
  selectApprovalStatus(id,ledgerId){
    console.log(id)
    this.selectedId=ledgerId
    console.log(this.selectdValue=this.Vlaues.filter(x=>x.valueid===id)[0])
  }

  openDialog(action,obj) {
    console.log(obj);
    this._route.navigate(['/salesledger', obj]);
  }

  deleteSalesLedger(obj){
    this._saleLedgerService.deleteSalesLedger(obj).subscribe(
      data=>{
        console.log(data);
        Swal.fire('Deleted!!', 'Data Deleted successfully!!', 'success');
      }
    );
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  updateStatus(obj){
    
    obj.modifiedBy=2
    obj.recordApprovalStatus=obj.approvalStatus;
    console.log(obj.modifiedBy);
    this._saleLedgerService.updateApprovalStatus(obj).subscribe((data)=>{
      console.log(data);
      Swal.fire('Status Approved','Success');
    });
  }

}
