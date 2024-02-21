import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Financialyear } from 'src/app/models/financialyear';
import { Yearlybudget } from 'src/app/models/yearlybudget.mode';
import { InvoiceserviceService } from 'src/app/services/invoiceservice.service';
import { UsermasterService } from 'src/app/services/usermaster.service';
import { VoucherService } from 'src/app/services/voucher.service';
import { YearlybudgetserviceService } from 'src/app/services/yearlybudgetservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-yearlybudget',
  templateUrl: './yearlybudget.component.html',
  styleUrls: ['./yearlybudget.component.css'],
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
export class YearlybudgetComponent implements OnInit {
  isactive = [
    { label: "Active" , value :true},
    { label: "InActive" ,  value :false },
  ];

  approvalStatus = [
    { status: "New" , statusid :1},
    { status: "Checked" , statusid :2},
    { status: "InCorrect" , statusid :3},
    { status: "Approve" ,  statusid :4},
    { status: "Reject" ,  statusid :5},
  ];

  ybForDialog!: Yearlybudget;
  yb: Yearlybudget[] =[];
  ybDetails: Yearlybudget[] =[];
  ybDetailsForDialog: Yearlybudget;
  submitted = false;
  ybnameunique :boolean;
  budgetdetailsdiv = false;
  companies : Yearlybudget[] = [];
  ledgers : Yearlybudget[] = [];
  ybname: string;
  ybId: any;
  ybName: any;
  compId : number;
   _cid: number;
   _fy: string;
  allFy: Financialyear[];
  selectedFinancialname: string;
  ybDetailsHist: Yearlybudget[];
  historyDialog = false;

  //roles
  maker = GlobalConstants.maker;
  checker = GlobalConstants.checker;
  approver = GlobalConstants.approver;

  //module
  budget = GlobalConstants.budget;

  loginuid : number = +sessionStorage.getItem("loginid");

  urole : number = 0;
  approvalStatusChecker: { status: string; statusid: number; }[];
  approvalStatusApprover: { status: string; statusid: number; }[];
  checkedby: number;
  approvedby: number;
  finyear: number;


  constructor(private yearlybudgetservice : YearlybudgetserviceService ,private voucherservice : VoucherService , private invoiceservice : InvoiceserviceService
    ,private uservice : UsermasterService) { }

  ngOnInit(): void {
   
this.approvalStatusChecker = this.approvalStatus.filter(x=>(x.statusid == 2 || x.statusid == 3))
this.approvalStatusApprover = this.approvalStatus.filter(x=>(x.statusid == 2||x.statusid == 3 || x.statusid == 4 || x.statusid == 5))

    console.log(this.loginuid);

      this.uservice.userRoleCheck(this.loginuid,this.budget).subscribe(
        (response)=>{
          console.log(response);
          if(response!=null){
          this.urole=response.roleid;
          }else{
            this.urole=0
          }
        }
      );
    
    this.ybForDialog = {

      balancebudgetamount : null!,companyid:null!, balancecarriedforwardforledger:null!,
      companyname:null!,financialyear:null!,isactive:null!,ledgeralias:null!,ledgerid:null!,
      sanctionedbudget:null!,usedbudgetamount:null!,yearlybudgetdetailsid:null!,yearlybudgetid:null!,
      yearlybudgetname:null!,yearlybudgetdetailshistoryid:null!, financialyearid:null!,financialyearname:null!

    }

      this.renderCurrentFinancialYear();
    this.renderYbMaster();
    this.renderCompanies();
this.renderAllFinancialYear();


  }


  alertSaveBd(){
    Swal.fire({
      text: 'Budget details added successfully!',
      icon: 'success'})
  }
  alertSaveStatus(){
    Swal.fire({
      text: 'Budget Details has been updated',
      icon: 'success'})
  }

  renderCompanies(): void {
    this.voucherservice.getCompanies()
      .subscribe({
        next: (data) => {
          this.companies = data.filter(s => s.isactive);
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  companyChange(companyid : number){

    this.retrieveLedgers(companyid);


  }
  retrieveLedgers(cid : number): void {
    this.yearlybudgetservice.getExpenseLedgers(cid)
      .subscribe({
        next: (data) => {
          this.ledgers = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  renderAllFinancialYear(){
    this.yearlybudgetservice.getAllFy().subscribe(
      (response)=>{
        console.log(response);
        this.allFy=response;

      }
    );
  }
  renderCurrentFinancialYear(){
    this.invoiceservice.getFinancialYearDetails().subscribe(
      (response)=>{
        console.log(response);
        this.ybForDialog.financialyear=response.financialyearname;

      }
    );
  }
  renderYbMaster(){
    this.yearlybudgetservice.getYearlyBudgetMaster(0).subscribe(
      (response)=>{
        console.log(response);      

        this.yb=response;

      }
    );
  }

  calculateSanctionedTotal(ledgerid : number){

    let totalDebit = 0;
     if(this.ybDetails)
     {
        for (let groupDetail of this.ybDetails) {
        if (groupDetail.ledgerid === ledgerid) {
          totalDebit = totalDebit+groupDetail.sanctionedbudget;
        }
     }

     }
     return (totalDebit===0)?'':totalDebit;

  }


  onView(budgetId : number,  rowData : Yearlybudget){

    this.yearlybudgetservice.getYearlyBudgetdetails(budgetId).subscribe(
          (response)=>{
            console.log(response);
            this.ybDetails=response;
            this.ybName = rowData.yearlybudgetname;
            this.budgetdetailsdiv = true;
    
          }
        );
    }
    
      renderYbDetails(){
        this.yearlybudgetservice.getYearlyBudgetdetails(this.ybId).subscribe(
          (response)=>{
            console.log(response);
            this.ybDetails=response;
    
          }
        );
      }


  saveYb(){
    this.submitted=true;
    this.ybnameunique = true;
    if(this.yb!=null){
    for (let index = 0; index < this.yb.length; index++) {
      if (this.yb[index].yearlybudgetname == this.ybForDialog.yearlybudgetname.trim())
      {
        this.ybnameunique = false;
        break;
      }
      else{
        this.ybnameunique = true;
      }      
    }
  }
     if(this.ybnameunique)
    {
      this.ybForDialog.createdby = this.loginuid;
      this.ybForDialog.financialyear = this.allFy.find(x=>x.financialyearid == this.ybForDialog.financialyearid).financialyearname;
      this.finyear = this.allFy.find(x=>x.financialyearid == this.ybForDialog.financialyearid).financialyearid;
    this.yearlybudgetservice.createYearlyBudget(this.ybForDialog)
    .subscribe( data => {
      this.ybname = this.ybForDialog.yearlybudgetname;
      const compId =  this.ybForDialog.companyid;
      this._cid =  this.ybForDialog.companyid;
      this._fy = this.allFy.find(x=>x.financialyearid == this.ybForDialog.financialyearid).financialyearname;
      this.ngOnInit();
      this.budgetdetailsdiv = true;
      this.ybDetailsForDialog = {

        balancebudgetamount : null!, balancecarriedforwardforledger:null!,
        ledgeralias:null!,ledgerid:null!,
        sanctionedbudget:null!,usedbudgetamount:null!,yearlybudgetdetailsid:null!,yearlybudgetdetailshistoryid:null!        
  
      }
      this.ybId = data.yearlybudgetid;
      this.ybName = data.yearlybudgetname;
      this.ybForDialog.companyid = compId;
      this.ybForDialog.yearlybudgetname = this.ybname;
      this.ybForDialog.financialyearid = this.finyear;
      this.renderYbDetails();


    });
  }
  }
  bnameChange(){

    this.budgetdetailsdiv = false;
    this.ybnameunique = true;


  }
  saveYbDetails(){
 
    this.ybDetailsForDialog.usedbudgetamount = 0;
    this.ybDetailsForDialog.companyid = this._cid;
    this.ybDetailsForDialog.financialyear = this._fy; 
    console.log(this.ybDetailsForDialog); 
    this.ybDetailsForDialog.createdby=this.loginuid;  
    this.yearlybudgetservice.createYearlyBudgetDetails(this.ybId,null)
    .subscribe( data => {
      this.ybname = this.ybForDialog.yearlybudgetname;
      this.ybDetailsForDialog = {
        balancebudgetamount : null!, balancecarriedforwardforledger:null!,
        ledgeralias:null!,ledgerid:null!,
        sanctionedbudget:null!,usedbudgetamount:null!,yearlybudgetdetailsid:null!,
        companyid:null!,financialyear:null!,yearlybudgetdetailshistoryid:null!,financialyearid:null!,financialyearname:null!       
  
      }
      this.renderYbDetails();
    });
    this.alertSaveBd();
  }

  fyOnChange(finid : number){

    // this.selectedFinancialname = this.allFy.find(x=>x.financialyearid == finid).financialyearname;
  }

  showHistory(row : Yearlybudget){

    this.yearlybudgetservice.getYearlyBudgetdetailsHistory(row.yearlybudgetid,row.ledgerid).subscribe(
      (response)=>{
        console.log(response);
        this.ybDetailsHist=response; 
        this.historyDialog = true;

      }
    );
  }

  clonedGroups: { [s: string]: Yearlybudget; } = {};
  onRowEditInit(_yb: Yearlybudget) {    
    console.log('Row edit initialized');
    this.clonedGroups[_yb.yearlybudgetname!] = { ..._yb };
  }

  onRowEditCancel(_yb: Yearlybudget, index: number) {
    console.log('Row edit cancelled');
    this.yb[index] = this.clonedGroups[_yb.yearlybudgetname!];
    delete this.clonedGroups[_yb.yearlybudgetname!];
  }
  onRowEditSave(budgethid : number , row :Yearlybudget){

    this.checkedby =  (row.statusid==2|| row.statusid==3)?this.loginuid:0;
    this.approvedby =  (row.statusid==4|| row.statusid==5)?this.loginuid:0;
    this.yearlybudgetservice.updateStatus(row.statusid,this.checkedby,this.approvedby,budgethid).subscribe(
      (response)=>{
        console.log(response);
       this.yearlybudgetservice.updateBudgetDetailsandHistory(budgethid,row).subscribe(
        (responsehist)=>{
          console.log(responsehist);
          this.yearlybudgetservice.getYearlyBudgetdetailsHistory(row.yearlybudgetid,row.ledgerid).subscribe(
            (response)=>{
              console.log(response); 
              this.ybDetailsHist=response; 
              this.historyDialog = true;
              this.yearlybudgetservice.getYearlyBudgetdetails(row.yearlybudgetid).subscribe(
                (response)=>{
                  console.log(response);
                  this.ybDetails=response;
          
                }
              ); 
            }
          );
        }
      ); 
   
       this.alertSaveStatus();
      }
    );


  }

}
