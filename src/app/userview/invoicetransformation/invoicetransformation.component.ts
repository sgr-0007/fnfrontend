import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, tap } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { AucInvoiceDetails } from 'src/app/models/auc-invoice-details';
import { Companymaster } from 'src/app/models/companymaster.model';
import { Invoicedetails } from 'src/app/models/invoicedetails';
import { Itemsdetails } from 'src/app/models/itemsdetails';
import { CompanymasterService } from 'src/app/services/companymaster.service';
import { InvoiceserviceService } from 'src/app/services/invoiceservice.service';
import { UsermasterService } from 'src/app/services/usermaster.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoicetransformation',
  templateUrl: './invoicetransformation.component.html',
  styleUrls: ['./invoicetransformation.component.css']
})
export class InvoicetransformationComponent implements OnInit {

  companies : Companymaster[] = [];
  filteredbranchid:number;
  fromDate:Date;
  toDate:Date;
  currentDate:Date ;
  constructor(private _invoiceService:InvoiceserviceService,
    private uservice: UsermasterService,private _router: Router,public datepipe: DatePipe,private companyservice : CompanymasterService) { 
      this.isRowSelectable = this.isRowSelectable.bind(this);
    }
    selectdValue:selectVlaues=new selectVlaues(0,'null',null,null);
    Vlaues:selectVlaues[]=[new selectVlaues(1,'New','fiber_new','mat-color-green'),
                            new selectVlaues(2,'Check','done','mat-color-green'),
                            new selectVlaues(3,'Approved','done_all','mat-color-green'),
                            new selectVlaues(4,'Incorrect','clear','mat-color-red'),
                            new selectVlaues(5,'Rejected','clear_all','mat-color-red'),
                          ];
  Vlaues1:selectVlaues[]=[new selectVlaues(1,'New','fiber_new','mat-color-green'),
                            new selectVlaues(2,'Check','done','mat-color-green'),
                            new selectVlaues(4,'Incorrect','clear','mat-color-red'),
                          ];
  
  
    invoice:Invoicedetails[];
    aucinvdetails:AucInvoiceDetails[];
    tempaucinvdetails:AucInvoiceDetails[];
    selectedData:AucInvoiceDetails[]=[];
    invItem:Itemsdetails[];
    clonedProducts: { [s: string]: Invoicedetails; } = {};
    selectedInvoice:Invoicedetails=new Invoicedetails();
    displayDialog:boolean=false;
    payinvoice:boolean=false;
    first = 0;
    checker;number=0;
    maker:number=0
    urole: number = 0;
    approver:number=0;
    moudleType: number = 10;
      rows = 10;
      loginuid: number = +sessionStorage.getItem("loginid");
      loading:boolean=false;

  
      ngOnInit(): void {
        this.currentDate=new Date();
        this.retrieveCompaines();
        this.renderAllInvoice();
        
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

        
      }
    
      isRowSelectable(event) {
    
        console.log("is row selectable")
        console.log("outof staock for approve"+
        !this.isAlreadyApproved(event.data));
        return !this.isAlreadyApproved(event.data);
        
    }
    isAlreadyApproved(data) {
      console.log("approvalstatus:"+data.status)
      return (data.status === 1);
        }
      checkuser():boolean{
        if (this.urole == GlobalConstants.checker) {
          
          return false;
      
        }
        return true;
      }
      onRowEditInit(invoice: Invoicedetails) {
        this.clonedProducts[invoice.invoiceid] = {...invoice};
        console.log("initalize")
    }
    
    onRowEditSave(invocie: Invoicedetails) {
            console.log(invocie)
            this._invoiceService.approvestatus(invocie.invoiceid,invocie.approververifiedstatus,this.urole).subscribe((response)=>{
                console.log(response);
            });
            
        
    }
    
    onRowEditCancel(product: Invoicedetails, index: number) {
        this.invoice[index] = this.clonedProducts[product.invoiceid];
        delete this.clonedProducts[product.invoiceid];
    }
    
      renderAllInvoice(){
          this._invoiceService.getInvoiceDetails().subscribe(
            (response)=>{
                  console.log(response)
                  this.invoice=response;
            }
          );
      }
      
      retrieveCompaines(): void {
        this.companyservice.getNative()
          .subscribe({
            next: (data) => {
              console.log(data)
              this.companies = data;
               
              console.log(data);
            },
            error: (e) => console.error(e)
          });
        }

      filterbybranch(){
        console.log("selected value"+this.filteredbranchid)
        this.aucinvdetails=this.tempaucinvdetails;
        console.log(this.aucinvdetails=this.aucinvdetails.filter(x=>x.companyId===this.filteredbranchid 
        ))
        
      }

      renderAllAUCInvoice(){
        this._invoiceService.getAUCInvoiceDetailsByDate(this.toDate,this.fromDate,this.filteredbranchid).subscribe(
          (response)=>{
                console.log(response)
                
                
                this.aucinvdetails=response;
                if(this.aucinvdetails.length!=0){
                this.aucinvdetails.forEach((inv)=>{if(inv.paymentDueDate!=null){
                 console.log("Major"+new Date(this.datepipe.transform(inv.paymentDueDate,"MM/dd/y")));
                 inv.invoiceDate=new Date(this.datepipe.transform(inv.invoiceDate,"MM/dd/y"))
                  inv.paymentDueDate=new Date(this.datepipe.transform(inv.paymentDueDate,"MM/dd/y"))
                }
                })}
                this.tempaucinvdetails=this.aucinvdetails;
                
                this.loading=false;
          }
        );
    }
    
      renderInvoiceItems(invoiceId:number){
        this._invoiceService.getInvoiceItemDetails(invoiceId).subscribe(
          (response)=>{
                console.log(response)
                this.invItem=response;
          }
        );
    }
    
    
      showItem(event){
        console.log(event);
        this.selectedInvoice=event;
        this.displayDialog=true;
        this.renderInvoiceItems(this.selectedInvoice.invoiceid);
      }

      approveSelectedLdger(){
        this.loading=true;
        if(this.selectedData.length==0){
          Swal.fire("Warning","No ledger is been selected");  
          this.loading=false;
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
                  x.status=1;
                  this.selectedData.push(x);
                  
                }
                
              )
              this.loading=false;
            }
          })
      
          this.approveinvoice()
      
          
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

      approveinvoice(){
        console.log("Selected Data"+this.selectedData)
        this._invoiceService.approveAucInvoiceDetails(this.selectedData).pipe(
          concatMap(
         res=>
          this._invoiceService.createInvVoucher() 
        )  
        ).subscribe((response)=>{
          Swal.fire("Success","Approved!");
          this.selectedData=[];
          this.ngOnInit();
        })  
      }

      searchAucInv(){
        if(this.toDate==null || this.fromDate==null || this.filteredbranchid==null)
        alert("Please choose the date filter");
        else{
        this.loading=true;
        console.log("date "+this.fromDate+this.filteredbranchid)
        this.renderAllAUCInvoice();
      }
      }

      approveBuyer(data){
        this.loading=true;
        console.log(data);
        this.selectedData.push(data);
        console.log("Selected Data"+this.selectedData)
          this._invoiceService.approveAucInvoiceDetails(this.selectedData).subscribe((response)=>{
            Swal.fire("Success","Approved!");
            this.selectedData=[];
           
            this.renderAllAUCInvoice();
            
          },
          ()=>{
              Swal.fire("! Please check if ledger is approved or else contact your admin");
              this.loading=false;
          }
          ) 

      }

      payInvoice(invitem){
        this.selectedInvoice=invitem;
        console.log(invitem)
        this.payinvoice=true;
      }
    
      public openPDF(): void {
        
      }
      editInvoice(invitem){
        console.log(invitem)
        this._router.navigate(['/invoice/generate/',invitem.invoiceid]);
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
    return this.invoice ? this.first === (this.invoice.length - this.rows): true;
}

isFirstPage(): boolean {
    return this.invoice ? this.first === 0 : true;
}
  
}
export class selectVlaues {

  valueid: number;
  valueName: string;
  valueIcon: string;
  valueClass: String;

  constructor(valueid, valueName, valueIcon, valueClass) {
    this.valueid = valueid;
    this.valueName = valueName;
    this.valueIcon = valueIcon;
    this.valueClass = valueClass;
  }
}