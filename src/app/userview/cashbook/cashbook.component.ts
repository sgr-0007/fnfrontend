import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Financialyear } from 'src/app/models/financialyear';
import { OfficeAccount } from 'src/app/models/officeaccount.model';
import { Voucher } from 'src/app/models/voucher.model';
import { InvoiceserviceService } from 'src/app/services/invoiceservice.service';
import { UsermasterService } from 'src/app/services/usermaster.service';
import { VoucherService } from 'src/app/services/voucher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cashbook',
  templateUrl: './cashbook.component.html',
  styleUrls: ['./cashbook.component.css'],
  styles: [`
        :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
            position: -webkit-sticky;
            position: sticky;
            top: 0rem;
        }

        .layout-news-active :host ::ng-deep .p-datatable tr > th {
            top: 0rem;
        }
    `]
})
export class CashbookComponent implements OnInit {

  cashbookForDialog!: Voucher;
  dbForDialog!: Voucher; 
  displayDialog : Boolean = false;
  companies: Voucher[] = [];
  financialYear:Financialyear=new Financialyear();
  cashbook : Voucher[] = [];
  first=0;
  rows=10;
  dateTime = new Date();
  //roles
  maker = GlobalConstants.maker;
  checker = GlobalConstants.checker;
  approver = GlobalConstants.approver;
  sadmin = GlobalConstants.sadmin;
   //module
   module = GlobalConstants.cashbook;

   loginuid: number = +sessionStorage.getItem("loginid");
   normalledger: Voucher[];

   urole: number = 0;
  voucherAccounts: OfficeAccount[];

  constructor(private uservice: UsermasterService,private voucherservice : VoucherService
    , private _invoiceService:InvoiceserviceService) { } 

  ngOnInit(): void {
    this.uservice.userRoleCheck(this.loginuid, this.module).subscribe(
      (response) => {
        console.log(response);
        if (response != null) {
          this.urole = response.roleid;
          localStorage.setItem("role", ""+this.urole)

        } else {
          this.urole = 0
        }
      }
    );
    this.cashbookForDialog = {
      daybookfromdate: null!, daybooktodate: null!, accounttypeid:null!
  };
  this.dateTime.setDate(this.dateTime.getDate());
  this.renderCurrentFinancialYear();
  this.retrieveVoucherAccounts();
  this.retrieveCompanies();
this.retrieveCashBook();


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
    return this.cashbook ? this.first === (this.cashbook.length - this.rows): true;
  }

  isFirstPage(): boolean {
    return this.cashbook ? this.first === 0 : true;
  }

  retrieveCashBook(): void {
console.log(this.cashbookForDialog.daybookfromdate)
console.log(this.cashbookForDialog.daybooktodate)
console.log(+this.cashbookForDialog.accounttypeid)
    this.voucherservice.cashBookView(this.cashbookForDialog.daybookfromdate,this.cashbookForDialog.daybooktodate,+this.cashbookForDialog.accounttypeid)
      .subscribe({
        next: (data) => {
          this.cashbook = data; 
          console.log(data);      
        },
        error: (e) => console.error(e)
      });
  }
  retrieveVoucherAccounts(): void {
    this.voucherservice.getOfficeAccounts(this.loginuid)
      .subscribe({
        next: (data) => {
          this.voucherAccounts = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  onSearch(){
    
    this.retrieveCashBook();

  }

  onReset(){
    this.cashbookForDialog = {
      daybookfromdate: null!, daybooktodate: null!
  };
  }
  onDelete(id : number){
    this.voucherservice.deleteDb(id)
    .subscribe({
      next: (data) => {
        this.retrieveCashBook();

      },
      error: (e) => console.error(e)
    });

  }


  renderCurrentFinancialYear(){
    this._invoiceService.getFinancialYearDetails().subscribe(
      (response)=>{
        console.log(response);
        this.financialYear=response;
        console.log(this.financialYear)
          
   
      }
    );
  }

  retrieveCompanies(): void {
    this.voucherservice.getCompaniesByUser(this.loginuid)
      .subscribe({
        next: (data) => {
          this.companies = data.filter(s => s.isactive);
         
        },
        error: (e) => console.error(e)
      });
  }

  onDbAdd(){
    this.dbForDialog = new Voucher();
    console.log( this.financialYear)
    this.dbForDialog.daybookdate = this.financialYear.financialyearstartdate;
    console.log(this.dbForDialog.daybookdate);
    this.displayDialog = true;
  }

  
  saveDb(){
    this.dbForDialog.ledgerid = this.dbForDialog.debitledger;
    this.dbForDialog.daybookdate = this.financialYear.financialyearstartdate;

    this.voucherservice.saveDayBook(this.dbForDialog)
    .subscribe({
      next: (data) => {
        this.ngOnInit();
         
        this.displayDialog = false;
        this.alertSuccess();
      },
      error: (e) => { 
        console.error(e) 
        this.displayDialog = false;
        this.alertFailure();
      }
    });
    
  }

  BranchOnChange(cid:number){
    this.voucherservice.getDrLedgers()
    .subscribe({
      next: (data) => {
        data = data.filter(x=>x.companyid==null ||x.companyid==cid);
        let ctype = this.companies.find(x=>x.companyid == cid).companytypeid;
        if (ctype == 1) {
          this.normalledger = data.filter(x => x.companyid == cid || x.debitledger==13331 || x.debitledger==13237);

        }
        else if (ctype == 2) {
          this.normalledger = data.filter(x => x.companyid == cid || x.debitledger==13331);

        }
        else if (ctype == 3) {
          this.normalledger = data.filter(x => x.companyid == cid || x.debitledger==13237);

        }
        else {
          this.normalledger = data.filter(x => x.companyid == this.dbForDialog.companyid);

        }  
                  console.log(data);
      },
      error: (e) => console.error(e)
    });
    
  }

  alertSuccess() {
    Swal.fire({
      text: 'Daybook Added!',
      icon: 'success'
    })
  }
  alertFailure() {
    Swal.fire({
      text: 'Already Present!',
      icon: 'warning'
    })
  }

}
