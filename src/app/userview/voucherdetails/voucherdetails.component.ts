import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Observable, timer } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { FileUploadsInfo } from 'src/app/models/file.model';
import { Fileuploadlist } from 'src/app/models/fileuploadlist';
import { Gstdetails } from 'src/app/models/gstdetails.model';
import { Itdetails } from 'src/app/models/itdetails.model';
import { Normalledger } from 'src/app/models/normalledger.model';
import { SubLedger } from 'src/app/models/subledger';
import { Voucher } from 'src/app/models/voucher.model';
import { Yearlybudget } from 'src/app/models/yearlybudget.mode';
import { InvoiceserviceService } from 'src/app/services/invoiceservice.service';
import { SubLedgerService } from 'src/app/services/subledger.service';
import { VoucherService } from 'src/app/services/voucher.service';
import { YearlybudgetserviceService } from 'src/app/services/yearlybudgetservice.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-voucherdetails',
  templateUrl: './voucherdetails.component.html',
  styleUrls: ['./voucherdetails.component.css']
})
export class VoucherdetailsComponent implements OnInit {
  supplyattract = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];
  modes = [
    { modename: "Cheque", modeid: 1 },
    { modename: "Online", modeid: 2 },
    { modename: "DD", modeid: 3 },
    { modename: "Cash", modeid: 4 },

    
  ];
  dateTime = new Date();
  loginuid: number = +sessionStorage.getItem("loginid");

  recDialog: Boolean = false;
  modeDialog: Boolean = false;
  headerDialog: Boolean = false;

  paymentForDialog!:Voucher;
  headerForDialog!:Voucher;

//roles
maker = GlobalConstants.maker;
checker = GlobalConstants.checker;
approver = GlobalConstants.approver;
sadmin = GlobalConstants.sadmin;

urole: number = +localStorage.getItem("role");
  selectedFiles?: FileList;
  currentFile?: File;
  fileInfos?: Observable<any>;
  viewablefile:Fileuploadlist=new Fileuploadlist();
  pdffile=false;
  imagefile=false;
  dramount?: number;
  drledger?: number;

  fileUploads: FileUploadsInfo[] = [];
  fileUploadInfo: FileUploadsInfo = {
    fileuploadid: 0,
    filedisplayname: undefined,
    filegeneratedname: undefined,
    filemoduletype: 0,
    moduleid: 0
  };

  vouchers: Voucher[] = [];

  ledgers: Voucher[] = [];

  selectedLedger!: Voucher;

  debitledgers: Voucher[] = [];

  debitSelectedLedger!: Voucher;

  currencies: Voucher[] = [];

  selectedCurrency!: Voucher;

  selectedVoucher: Voucher[] = [];


  selectedcfgdetails: Voucher;

  debitdisplayDialog!: boolean;
  creditdisplayDialog!: boolean;
  voucherForDialog!: Voucher;
  voucherNarrationfileuploadForDialog!: Voucher;
  first = 0;
  rows = 5;
  loading: boolean = true;
  vid!: string | null;
  public totaldebitamounttt = 0;
  public totalcreditamounttt = 0;
  private value!: string | any[];
  selectedLedgerAlias: string;
  cashbankbalance: any;
  iscashbankbalance = false;
  savevoucherdetails = true;
  cacheck = true;
  dacheck = true;
  crBudgetResponse: any;
  drBudgetResponse: any;
  enteredCr: number;
  enteredDr: number;
  expledgers: Normalledger[];
  vtype: number;
  vouchersdr: Voucher[];
  voucherscr: Voucher[];

  viewdisable=false;
  statusid: number;
  bankRec: Voucher[];
  gsttypes: any;
  cgstdataid: number;
  sgstdataid: number;
  igstdataid: number;
  tdsdataid: number;
  gsttdscgstdataid: number;
  gsttdssgstdataid: number;
  gsttdsigstdataid: number;
  displayGstDialog: boolean;
  gstledgers: Gstdetails[] = [];
  displayItDialog: boolean;
  itledgers: Itdetails[] = [];
  invoice: Gstdetails[];
  debitledgersnofilter: any;
  gstDetails: Gstdetails = new Gstdetails();
  itDetails: Itdetails = new Itdetails();
  sections = [
    { sectionname: "192-Payment of Salary", sectionid: 1 },
    { sectionname: "194-C-Payment to Contractor/ Sub Crontractor", sectionid: 4 },
    { sectionname: "194-I-Rent on land/building/furniture/fitting", sectionid: 2 },
    { sectionname: "194-J-Fee for Professional Services", sectionid: 3 },
    { sectionname: "194-J-Fee for Technical Services", sectionid: 5 },

  ];
  returns = [
    { returnname: "24 q1", returnid: 1 },
    { returnname: "24 q2", returnid: 2 },
    { returnname: "24 q3", returnid: 3 },
    { returnname: "24 q4", returnid: 4 },
    { returnname: "26 q1", returnid: 5 },
    { returnname: "26 q2", returnid: 6 },
    { returnname: "26 q3", returnid: 7 },
    { returnname: "26 q4", returnid: 8 },

  ];
  invtypes = [
    { invtype: "Regular", invtypeid: 1 },
    { invtype: "Composit", invtypeid: 2 },
    { invtype: "Unregistered", invtypeid: 3 },
  ];
  voucherInfoArray: Voucher[];
  newGstDetailstbl: any[] = [];
  newGstDetails: Gstdetails;
  newItDetailstbl: any[] = [];
  newItDetails: Itdetails;
  ledgersnofilter: Voucher[];
  voucherID: any;
  vnum: any;
  tdsamount: number;
  subledgs: SubLedger[];
  companies: Voucher[];
  favDialog: Boolean = false;
  favourForDialog!:Voucher;
  empbanks: Voucher[];
  pensioners: Voucher[];
  fampensioners: Voucher[];
  branchinfavour : Voucher[];
  constructor(private subledgservice : SubLedgerService,private voucherservice: VoucherService, private invoiceservice: InvoiceserviceService, private route: ActivatedRoute, private _router: Router, private yearlybudgetservice: YearlybudgetserviceService) { }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  ngOnInit(): void {
    this.voucherInfoArray = [];

    console.log(this.urole);
    this.voucherForDialog = {
      totalcreditamount: null!, totaldebitamount: null!
    }
    this.vid = (this.route.snapshot.paramMap.get('id') == "0") ? localStorage.getItem('vid') : this.route.snapshot.paramMap.get('id');
    console.log(this.vid)
    this.retrieveCurrency();
    this.retrieveVoucherInfo();
    this.fileInfos = this.voucherservice.getFiles(this.vid);
    this.dateTime.setDate(this.dateTime.getDate());
    this.loadLedgerswofilter();
this.retrieveCompanies();
  }
  retrieveCompanies(): void {
    this.voucherservice.getCompaniesByUser(this.loginuid)
      .subscribe({
        next: (data) => {
          this.companies = data.filter(s => s.isactive);
        }
      })
    }
  OnDeleteFile(filename: any) {
    this.voucherservice.deleteFile(filename)
      .subscribe({
        next: () => {

          this.ngOnInit();

        },
        error: (e) => console.error(e)
      });

    this.alertDelete();

  }



  retrieveVoucherInfo() {

    this.voucherservice.getVoucherinfo(this.vid)
      .subscribe({
        next: (data) => {
          this.selectedVoucher = data;    
          this.vtype =  this.selectedVoucher[0].vouchertypeid;
          this.statusid =  this.selectedVoucher[0].statusid;
          this.loading = false;
          console.log(data);
          this.voucherservice.getgstview(this.selectedVoucher[0].voucherid)
          .subscribe({
            next: (gstdata) => {
            this.newGstDetailstbl = gstdata;
              console.log(gstdata);
            },
            error: (e) => console.error(e)
          });
          this.voucherservice.getitview(this.selectedVoucher[0].voucherid)
          .subscribe({
            next: (itdata) => {
            this.newItDetailstbl = itdata;
              console.log(itdata);
            },
            error: (e) => console.error(e)
          });
          this.yearlybudgetservice.getExpenseLedgers(this.selectedVoucher[0].companyid)
            .subscribe({
              next: (expdata) => {
                this.expledgers = expdata;
                console.log(expdata);
              },
              error: (e) => console.error(e)
            });

            this.voucherservice.getDrLedgers()
            .subscribe({
              next: (data) => {
                let ctype = this.companies.find(x=>x.companyid == this.selectedVoucher[0].companyid).companytypeid;
                this.debitledgers = data.filter(x => (x.companytype == ctype || x.companytype == 5)  && x.accounttypeid == this.selectedVoucher[0].accounttypeid);  
                //this.debitledgers = data.filter(x=>x.companyid==this.selectedVoucher[0].companyid);
                console.log(data);
              },
              error: (e) => console.error(e)
            });
        
            this.voucherservice.getCrLedgers()
            .subscribe({
              next: (data) => {
                let ctype = this.companies.find(x=>x.companyid == this.selectedVoucher[0].companyid).companytypeid;
                this.ledgers = data.filter(x => (x.companytype == ctype || x.companytype == 5)  && x.accounttypeid == this.selectedVoucher[0].accounttypeid);                  console.log(data);
              },
              error: (e) => console.error(e)
            });
            this.voucherservice.getVoucherdetails(this.vid)
      .subscribe({
        next: (data) => {
          // this.vouchersdr = data.filter(x=>x.debitledger!=null);
          // this.voucherscr = data.filter(x=>x.creditledger!=null);
          this.vouchers = data;
          this.loading = false;
          console.log(this.vouchers);
          this.findsum(this.vouchers);


        },
        error: (e) => console.error(e)
      });

        },
        error: (e) => console.error(e)
      });
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
    return this.vouchers ? this.first === (this.vouchers.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.vouchers ? this.first === 0 : true;
  }
  alertSave() {
    Swal.fire({
      text: 'Voucherdetails has been updated successfully!',
      icon: 'success'
    })
  }
  alertBalanceExceed() {
    Swal.fire({
      text: 'Entered Expense Ledger amount is exceeding the Budget balance!',
      icon: 'error'
    })
  }
  alertDuplicate() {
    Swal.fire({
      text: 'Selected Ledger is already present!',
      icon: 'warning'
    })
  }

  alertDelete() {
    Swal.fire({
      text: 'File deleted successfully!',
      icon: 'success'
    })
  }

  alertSaveFile() {
    Swal.fire({
      text: 'File has been uploaded successfully!',
      icon: 'success'
    })
  }

  alertCreditDebitError() {
    Swal.fire({
      text: 'Total Credit amount should be equal to Debit!',
      icon: 'error'
    })
  }

  alertUpdateVoucherAmount() {
    Swal.fire({
      text: 'Total Credit and Debit Amount has been saved successfully!',
      icon: 'success'
    })
  }

  alertBalance(ledgeral: string, balance: number) {
    Swal.fire({
      text: ledgeral + 'balance:' + balance + 'INR',
      icon: 'info'
    })
  }
  alertGstDelete() {
    Swal.fire({
      text: 'Deleted successfully!',
      icon: 'success'
    })
  }
  alertEmployee() {
    Swal.fire({
      text: 'Added successfully!',
      icon: 'success'
    })
  }
  myUploader(event: any, form) {
    if (event.files[0]) {
      const file: File | null = event.files[0];
      if (file) {
        var timestamp = new Date().toISOString().replace(/[-:.]/g, "");
        var random = ("" + Math.random()).substring(2, 8);
        var fileName = timestamp + random + file.name;
        this.currentFile = file;
        this.fileUploadInfo.filegeneratedname = fileName;
        this.fileUploadInfo.filedisplayname = file.name;

        this.fileUploadInfo.filemoduletype = 2;
        this.fileUploadInfo.moduleid = +this.vid!;
        this.voucherservice.SaveFileInfo(this.fileUploadInfo).subscribe({
          next: (data) => {

            form.clear();


          },
          error: (e) => console.error(e)
        });
        this.voucherservice.upload(this.currentFile, fileName).subscribe({
          next: (data) => {
            this.ngOnInit();



          },
          error: (e) => console.error(e)
        });
      }

      this.alertSaveFile();
    }

  }

  retrieveCurrency(): void {
    this.voucherservice.getCurrency()
      .subscribe({
        next: (data) => {
          this.currencies = data.filter(s => s.isactive);
          this.loading = false;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
 
  
  retrieveVoucherDetails(): void {

    this.voucherservice.getVoucherdetails(this.vid)
      .subscribe({
        next: (data) => {
          this.vouchersdr = data.filter(x=>x.debitledger!=null);
          this.voucherscr = data.filter(x=>x.creditledger!=null);
          this.vouchers = [...this.vouchersdr,...this.voucherscr];
          this.loading = false;
          console.log(this.vouchers);
          this.findsum(this.vouchers);


        },
        error: (e) => console.error(e)
      });
  }

  findsum(data: string | any[]) {
    this.totaldebitamounttt = 0;
    this.totalcreditamounttt = 0;
    this.value = data
    console.log(this.value);
    if (this.value != null) {
      for (let j = 0; j < data.length; j++) {
        this.totaldebitamounttt += this.value[j].debitamount
        this.totaldebitamounttt =  +this.totaldebitamounttt.toFixed(2);

        this.totalcreditamounttt += this.value[j].creditamount
        this.totalcreditamounttt =  +this.totalcreditamounttt.toFixed(2);

      }
    }
  }

  

  back() {
    this._router.navigate([localStorage.getItem('vtype')])
  }

  LedgerOnChange(_ledgerid: any , ledgertype : string) {
    _ledgerid = _ledgerid.value;
    this.retrieveSubLedgs(_ledgerid);
    console.log(_ledgerid);
    const _ledgeralias =  this.ledgers.find(x=>x.creditledger==_ledgerid);
    var foundLedger = this.vouchers.find(x => x.ledgeralias == _ledgeralias);   
    console.log(foundLedger);
    if (foundLedger != undefined) {

    
      this.alertDuplicate();
      this.debitdisplayDialog = false;
      return;
    }
    var foundexpLedger = undefined
    this.selectedLedgerAlias = this.ledgers.find(x => x.creditledger == _ledgerid).ledgeralias;
    console.log(this.selectedLedgerAlias);
    if(this.expledgers!=null)
    {
    console.log(this.expledgers.find(x => x.ledgerid == _ledgerid))

     foundexpLedger = this.expledgers.find(x => x.ledgerid == _ledgerid);
    }
    if (this.selectedLedgerAlias.includes('Cash') || this.selectedLedgerAlias.includes('cash') || this.selectedLedgerAlias.includes('Bank') || this.selectedLedgerAlias.includes('bank') || foundexpLedger != undefined) {
      if (foundexpLedger != undefined) {
        this.voucherservice.getExpIncomeBalance(_ledgerid).subscribe({
          next: (data) => {

            this.iscashbankbalance = true;
            this.cashbankbalance = data;


          },

          error: (e) => {
            console.error(e);
            this.iscashbankbalance = false;

          }


        });
      }

      else {

        this.voucherservice.getCashBankBalance(_ledgerid).subscribe({
          next: (data) => {

            this.iscashbankbalance = true;
            this.cashbankbalance = data;


          },

          error: (e) => {
            console.error(e);
            this.iscashbankbalance = false;

          }


        });
      }
    }
    else {

      this.iscashbankbalance = false;
    }
  }

  cachange(camount: number) {

    if (camount.toString().trim().length > 0) {

      this.cacheck = false;


    }
    else {
      this.cacheck = true;
    }

  }
  dachange(damount: number) {

    if (damount.toString().trim().length > 0) {
      this.dacheck = false;

    }
    else {
      this.dacheck = true;
    }

  }


  clonedGroups: { [s: string]: Voucher; } = {};
  onRowEditInit(voucher: Voucher) {
    console.log('Row edit initialized');
    console.log(voucher) 
    if(voucher.creditamount!=null){
      this.clonedGroups[voucher.crledgeralias!] = { ...voucher };
      this.retrieveSubLedgs(voucher.creditledger);
    }
    else
    {
    this.clonedGroups[voucher.drledgeralias!] = { ...voucher };
    this.retrieveSubLedgs(voucher.debitledger);

  }
}

  onRowEditSave(id: number, voucher: Voucher) {
    console.log(voucher)
    this.voucherservice.updateVoucherDetails(id,voucher)
    .subscribe( data => {
      this.ngOnInit();
      this.alertSave();
    });

  }
  onRowEditCancel(voucher: Voucher, index: number) {
    console.log('Row edit cancelled');
    if(voucher.creditamount!=null){
    this.vouchers[index] = this.clonedGroups[voucher.crledgeralias!];
    delete this.clonedGroups[voucher.crledgeralias!];
    }
    else{
      this.vouchers[index] = this.clonedGroups[voucher.drledgeralias!];
    delete this.clonedGroups[voucher.drledgeralias!];
    }
  }

  checktypeImage(filename):boolean{
    console.log(filename)
    let file=filename.substr(filename.lastIndexOf('.')+1)
    if(file=="png"||file=="jpg"||file=="jpeg"||file=="PNG"){
      return true
    }
    return false;
}


checktypePdf(filename):boolean{
  console.log(filename)
  let file=filename.substr(filename.lastIndexOf('.')+1)
  if(file=="pdf"){
    this.pdffile=true;
    return true
  }
  return false;
}



viewDisable(file){
  this.viewablefile=file;
  if(this.checktypePdf(this.viewablefile.filegeneratedname))
  {
    this.pdffile=true;
    this.imagefile=false;
  }
  else if(this.checktypeImage(this.viewablefile.filegeneratedname))
  {
    this.pdffile=false;
    this.imagefile=true;
  }
  console.log(this.viewablefile)
  this.viewdisable=true;
  console.log(this.pdffile+"PDF FILE")
  console.log(this.imagefile+"IMAGE FILE")

}
mode() {
  this.recDialog = true;
  let comid = this.selectedVoucher[0].companyid;
  let viid = this.selectedVoucher[0].voucherid;
  if( this.vtype==1)
  {
  this.voucherservice.getVoucherdetailsreconcile(comid,viid)
    .subscribe( data => {
      this.bankRec = data;
console.log(data);     
    });
  }
  if(this.vtype==3)
  {
    this.voucherservice.getVoucherdetailsrecreconcile(comid,viid)
    .subscribe( data => {
      this.bankRec = data;
console.log(data);     
    });

  }
}
addMode(row:any)
{

  this.modeDialog = true;
  this.paymentForDialog = {
    paymentmode: null!, chequeamount: null!, chequebankname: null!,
    chequedate: null!, chequenumber: null!, chequepaidto: null!, ddamount: null!, ddbankname: null!,
    dddate: null!, ddnumber: null!, ddpaidto: null!, onlinebankname:null!, onlinetransactionid:null!,
    onlinedate:null!,onlineamount:null!,onlinebankingcharges:null!,cashdate:null!,
    cashamount:null!,cashpaidto:null!,branchdetailsid:null!
  };

  this.paymentForDialog.voucherid = row.voucherid;
  this.paymentForDialog.voucherdetailid = row.voucherdetailid;
  this.voucherservice.getBranchFavour()
    .subscribe({
      next: (data) => {
        this.branchinfavour = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });

}

addHeader()
{
 
  this.headerDialog = true;
  this.headerForDialog = new Voucher();
  this.headerForDialog.voucherid = +this.vid;
  this.voucherservice.getBranchFavour()
    .subscribe({
      next: (data) => {
        this.branchinfavour = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });

}


saveHeader(){  
  this.headerForDialog.bank = this.branchinfavour.find(x=>x.branchdetailsid == this.headerForDialog.branchdetailsid).bank;
  this.voucherservice.createVoucherPaymentHeader(this.headerForDialog)
  .subscribe({
    next: (data) => {    
      console.log(data);
    },
    error: (e) => console.error(e)
  });
this.headerDialog = false;
}

buyerbankchange(){
  // this.favourForDialog = {
  //   bankemployeeid:null!,employeename:null!
  // };
  this.favourForDialog.bankemployeeid=null;
  this.favourForDialog.pensionerid=null;
  this.favourForDialog.pensionerfamilyid=null;
  this.favourForDialog.branchdetailsid=null;

}  

empbankchange(){
  // this.favourForDialog = {
  //   gstbvledgerid: null!, gstbvledgeralias: null!
  // };
  this.favourForDialog.gstbvledgerid=null;
  this.favourForDialog.pensionerid=null;
  this.favourForDialog.pensionerfamilyid=null;
  this.favourForDialog.branchdetailsid=null;


}
pensionerbankchange(){
  // this.favourForDialog = {
  //   gstbvledgerid: null!, gstbvledgeralias: null!
  // };
  this.favourForDialog.gstbvledgerid=null;
  this.favourForDialog.bankemployeeid=null;
  this.favourForDialog.pensionerfamilyid=null;
  this.favourForDialog.branchdetailsid=null;


}

pensionerfambankchange(){
  // this.favourForDialog = {
  //   gstbvledgerid: null!, gstbvledgeralias: null!
  // };
  this.favourForDialog.gstbvledgerid=null;
  this.favourForDialog.bankemployeeid=null;
  this.favourForDialog.pensionerid=null;
  this.favourForDialog.branchdetailsid=null;


}
branchinfavourchange(){
  // this.favourForDialog = {
  //   gstbvledgerid: null!, gstbvledgeralias: null!
  // };
  this.favourForDialog.gstbvledgerid=null;
  this.favourForDialog.bankemployeeid=null;
  this.favourForDialog.pensionerid=null;
  this.favourForDialog.pensionerfamilyid=null;


}
addFavour(row:any)
{ 

  this.favDialog = true;
  this.favourForDialog = {
    gstbvledgerid: null!, gstbvledgeralias: null!,bankemployeeid:null!,employeename:null!,pensionerid:null!,
    pensionerfamilyid:null!,pensioner:null!,pensionerfamily:null!,branchdetailsid:null!,apfname:null!
  };
  this.voucherservice.getGstLedgers(this.selectedVoucher[0].companyid)
    .subscribe({
      next: (data) => {
        this.gstledgers = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
    this.voucherservice.getempbank()
    .subscribe({
      next: (data) => {
        this.empbanks = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
    this.voucherservice.getPensioner()
    .subscribe({
      next: (data) => {
        this.pensioners = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
    this.voucherservice.getPensionerFam()
    .subscribe({
      next: (data) => {
        this.fampensioners = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
    this.voucherservice.getBranchFavour()
    .subscribe({
      next: (data) => {
        this.branchinfavour = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
this.favourForDialog.voucherid = row.voucherid;
this.favourForDialog.voucherdetailid = row.voucherdetailid;
this.favourForDialog.amount = (row.debitamount== null)?row.creditamount:row.debitamount;



}
savePayMode(){
  if(this.paymentForDialog.modeid === 1)
  {
     
this.paymentForDialog.chequebankname = (this.paymentForDialog.chequebankname == null)?this.branchinfavour.find(x=>x.branchdetailsid == this.paymentForDialog.branchdetailsid ).apfname:this.paymentForDialog.chequebankname;
  }
  else if(this.paymentForDialog.modeid === 2)
  {
this.paymentForDialog.onlinebankname = (this.paymentForDialog.onlinebankname == null)?this.branchinfavour.find(x=>x.branchdetailsid == this.paymentForDialog.branchdetailsid ).apfname:this.paymentForDialog.onlinebankname;
  }
  else if(this.paymentForDialog.modeid === 3)
  {
this.paymentForDialog.ddbankname = (this.paymentForDialog.ddbankname == null)?this.branchinfavour.find(x=>x.branchdetailsid == this.paymentForDialog.branchdetailsid ).apfname:this.paymentForDialog.ddbankname;
  }
  this.paymentForDialog.paymentmode = this.modes.find(x=>x.modeid== this.paymentForDialog.modeid).modename;
  this.voucherservice.createVoucherPayment(this.paymentForDialog)
  .subscribe({
    next: (data) => {
    
      console.log(data);
    },
    error: (e) => console.error(e)
  });
this.modeDialog = false;
}
saveFavour()
{
  if(this.favourForDialog.gstbvledgerid!=null)
  {
  this.favourForDialog.buyerinfavourof = this.gstledgers.find(x=>x.gstbvledgerid ==this.favourForDialog.gstbvledgerid).gstbvledgeralias;
  this.favourForDialog.employeeinfavourof = null;
  this.favourForDialog.pensionerinfavourof = null;
  this.favourForDialog.pensionerfamilyinfavourof = null;
  this.favourForDialog.branchdetailsinfavourof = null;
  }
  else if(this.favourForDialog.bankemployeeid!=null)
  {
    this.favourForDialog.employeeinfavourof = this.empbanks.find(x=>x.bankemployeeid ==this.favourForDialog.bankemployeeid).employeename;
    this.favourForDialog.buyerinfavourof = null;
    this.favourForDialog.pensionerinfavourof = null;
    this.favourForDialog.pensionerfamilyinfavourof = null;
    this.favourForDialog.branchdetailsinfavourof = null;

  }
  else if(this.favourForDialog.pensionerid!=null)
  {
    this.favourForDialog.pensionerinfavourof = this.pensioners.find(x=>x.pensionerid ==this.favourForDialog.pensionerid).pensioner;
    this.favourForDialog.buyerinfavourof = null;
    this.favourForDialog.employeeinfavourof = null;
    this.favourForDialog.pensionerfamilyinfavourof = null;
    this.favourForDialog.branchdetailsinfavourof = null;



  }
  else if(this.favourForDialog.pensionerfamilyid!=null)
  {
    this.favourForDialog.pensionerfamilyinfavourof = this.fampensioners.find(x=>x.pensionerfamilyid ==this.favourForDialog.pensionerfamilyid).pensionerfamily;
    this.favourForDialog.buyerinfavourof = null;
    this.favourForDialog.employeeinfavourof = null;
    this.favourForDialog.pensionerinfavourof = null;
    this.favourForDialog.branchdetailsinfavourof = null;


  }
  else if(this.favourForDialog.branchdetailsid!=null)
  {
    this.favourForDialog.branchdetailsinfavourof = this.branchinfavour.find(x=>x.branchdetailsid ==this.favourForDialog.branchdetailsid).apfname;
    this.favourForDialog.buyerinfavourof = null;
    this.favourForDialog.employeeinfavourof = null;
    this.favourForDialog.pensionerinfavourof = null;
    this.favourForDialog.pensionerfamilyinfavourof = null;


  }
  console.log(this.favourForDialog);
  this.voucherservice.createPaymentBankCoverDetails(this.favourForDialog)
  .subscribe({
    next: (data) => { 
    
      console.log(data);
    },
    error: (e) => console.error(e)
  });
  this.favDialog = false;
  let comid = this.selectedVoucher[0].companyid;
  let viid = this.selectedVoucher[0].voucherid;
  if( this.vtype==1)
  {
  this.voucherservice.getVoucherdetailsreconcile(comid,viid)
    .subscribe( data => {
      this.bankRec = data;
console.log(data);     
    });
  }
 

}

rate(voucherDet : Voucher){

  const rate = +voucherDet.rate;
  const vDet = +voucherDet.voucherdetailid;
  console.log(rate+"-"+vDet)
  this.voucherservice.UPDRate(rate,vDet)
  .subscribe( data => {
    this.retrieveVoucherInfo();
console.log(data);     
  });

}

getOfficeGSTLedger(ledger: string) {

  this.displayGstDialog = true;
  this.gstDetails = new Gstdetails();
  this.gsttypes = [];
  this.voucherservice.getGstLedgers(this.selectedVoucher[0].companyid)
    .subscribe({
      next: (data) => {
        this.gstledgers = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });

  this.voucherservice.getOfficeLedgers(this.selectedVoucher[0].companyid)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.gsttypes.push(data.igstid);
        this.gsttypes.push(data.sgstid);
        this.gsttypes.push(data.cgstid);
        this.cgstdataid = data.cgstid;
        this.sgstdataid = data.sgstid;
        this.igstdataid = data.igstid;
        this.tdsdataid = data.tds;
        this.gsttdscgstdataid = data.gsttdscgst
        this.gsttdssgstdataid = data.gsttdssgst
        this.gsttdsigstdataid = data.gsttdsigst

        console.log(this.gsttdsigstdataid)

      },
      error: (e) => console.error(e)
    });
  console.log(this.gsttypes);
}

getOfficeITLedger(ledger: string){

  this.displayItDialog = true;
  this.itDetails = new Itdetails();
  this.voucherservice.getItLedgers(this.selectedVoucher[0].companyid)
     .subscribe({
      next: (data) => {
         this.itledgers = data;
       console.log(data);
     },
      error: (e) => console.error(e)
    });
  this.voucherservice.getOfficeLedgers(this.selectedVoucher[0].companyid)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.tdsdataid = data.tds;

      },
      error: (e) => console.error(e)
    });

}

renderAllInvoice() {
  this.voucherservice.getInv().subscribe(
    (response) => {
      console.log(response)
      this.invoice = response;
    }
  );
}
gstbvOnChange(id: number) {
  console.log(this.debitledgersnofilter.find(x => x.debitledger == id)) 
  this.gstDetails.gstbvgsttin = this.debitledgersnofilter.find(x => x.debitledger == id).gsttin;

}

iTbvOnChange(id: number) {
  console.log(this.debitledgersnofilter.find(x => x.debitledger == id))
  this.itDetails.panno = this.debitledgersnofilter.find(x => x.debitledger == id).panno;
  console.log(this.itDetails.panno)

}

saveGst() {
 
  this.newGstDetailstbl = [];
  this.gstDetails.invtype = this.invtypes.find(x=>x.invtypeid==this.gstDetails.invtypeid).invtype;
  this.gstDetails.gstbvledgeralias = this.debitledgersnofilter.find(x=>x.debitledger == this.gstDetails.gstbvledgerid).drledgeralias;
  this.newGstDetails = this.gstDetails;
  this.newGstDetailstbl.push(this.newGstDetails);
  console.log(this.newGstDetails)
  console.log(this.newItDetails)
   this.voucherInfoArray = this.vouchers;
  // this.voucherForDialog.invoiceNo = (this.newGstDetails != null) ? this.newGstDetails.invoicenumber : "";
  // console.log(this.voucherForDialog); 
  
      this.voucherInfoArray.forEach(ell=>{
console.log(+ell.debitledger+"-"+ +this.gsttdscgstdataid)
console.log(+ell.creditledger+"-"+ +this.gsttdsigstdataid)

        if (this.newGstDetails != null) {
          if (+ell.creditledger === +this.gsttdscgstdataid) {
            this.tdsamount = (+ell.creditamount) + (+ell.creditamount);

            console.log(this.tdsamount)
          }
          if ( +ell.creditledger === +this.gsttdsigstdataid) {
console.log(+ell.creditamount)
            this.tdsamount = +ell.creditamount;
            console.log(this.tdsamount)

          }
        }

      })
      this.voucherInfoArray.forEach(ele => {
        if (this.newGstDetails != null) { 
          console.log( +this.tdsamount+""+ele.debitamount+""+this.newGstDetails.taxablevalue)
          if ((+ele.debitamount) + (+this.tdsamount) === +this.newGstDetails.taxablevalue) {
            this.newGstDetails.headofaccount = ele.debitledger;
                          this.newGstDetails.transactionnumber = ele.voucherseq;

          }
        }
        
      } )
      
      this.voucherInfoArray.forEach(element => {
        console.log(element)        

            if (+this.cgstdataid == +element.debitledger && (+element.rate!=0 && +element.rate!=null && +element.rate!=undefined)) {
             
              console.log(this.newGstDetails);
              if (this.newGstDetails != null) {
               
             
                this.newGstDetails.cgstvalue = +element.debitamount;
                this.newGstDetails.sgstvalue = +element.debitamount;
                this.newGstDetails.igstvalue = null;
                   this.newGstDetails.gsttdscgst=null;
                   this.newGstDetails.gsttdssgst=null;
                   this.newGstDetails.gsttdsigst=null;

                this.newGstDetails.rate = +element.rate;
                console.log(this.newGstDetails);
                this.voucherservice.addgstitdetails(this.selectedVoucher[0].voucherid, this.newGstDetails).subscribe(
                  (datadetails) => {

                    console.log(datadetails);
                  }
                );
              }

            }

            if (+this.igstdataid == +element.debitledger && (+element.rate!=0 && +element.rate!=null && +element.rate!=undefined)) {
             
              console.log(this.newGstDetails);
              if (this.newGstDetails != null) {
               
               
                this.newGstDetails.igstvalue = +element.debitamount;
                this.newGstDetails.cgstvalue = null;
                this.newGstDetails.sgstvalue = null;
                this.newGstDetails.gsttdscgst=null;
                this.newGstDetails.gsttdssgst=null;
                this.newGstDetails.gsttdsigst=null;

                this.newGstDetails.rate = +element.rate;

                console.log(this.newGstDetails);
                this.voucherservice.addgstitdetails(this.selectedVoucher[0].voucherid, this.newGstDetails).subscribe(
                  (datadetails) => {

                    console.log(datadetails);
                  }
                );
              }

            }


            if (+this.gsttdscgstdataid == +element.creditledger ) {
             
              console.log(this.newGstDetails);
              if (this.newGstDetails != null) {
              
                this.newGstDetails.gsttdscgst = element.creditamount;
                this.newGstDetails.gsttdssgst =element.creditamount;                  
                this.newGstDetails.gsttdsigst=null;
                this.newGstDetails.cgstvalue = null;
                this.newGstDetails.sgstvalue = null;
                this.newGstDetails.igstvalue =null;
                this.newGstDetails.rate = +element.rate;


                console.log(this.newGstDetails);
                this.voucherservice.addgstitdetails(this.selectedVoucher[0].voucherid, this.newGstDetails).subscribe(
                  (datadetails) => {

                    console.log(datadetails);
                  }
                );
              }

            }


            if (+this.gsttdsigstdataid == +element.creditledger) {
             
              console.log(this.newGstDetails);
              if (this.newGstDetails != null) {
              
                this.newGstDetails.gsttdsigst = element.creditamount;
                this.newGstDetails.gsttdscgst=null;
                this.newGstDetails.gsttdssgst=null;
                this.newGstDetails.cgstvalue = null;
                this.newGstDetails.sgstvalue = null;
                this.newGstDetails.igstvalue =null;
                this.newGstDetails.rate = +element.rate;


                console.log(this.newGstDetails);
                this.voucherservice.addgstitdetails(this.selectedVoucher[0].voucherid, this.newGstDetails).subscribe(
                  (datadetails) => {

                    console.log(datadetails);
                  }
                );
              }

            }
            this.retrieveVoucherInfo();

          }); 
          this.displayGstDialog = false;


}



saveIt() {
  
  this.newItDetailstbl = [];
  this.itDetails.returnname = this.returns.find(x=>x.returnid===this.itDetails.returnid).returnname;
  this.itDetails.sectionname = this.sections.find(x=>x.sectionid===this.itDetails.sectionid).sectionname;
  this.itDetails.ledgeralias = this.debitledgersnofilter.find(x => x.debitledger == this.itDetails.itbvledgerid).drledgeralias;
  console.log(this.itDetails.panno)
  this.newItDetails = this.itDetails;
console.log(this.newItDetails)
this.newItDetailstbl.push(this.newItDetails); 



 //IT Details
 if (this.newItDetails != null) {
  this.voucherservice.addgstitdetails(this.selectedVoucher[0].voucherid, this.newItDetails).subscribe(
    (datadetails) => {
      this.retrieveVoucherInfo();
      console.log(datadetails);
    }
  );
}
this.displayItDialog = false;

}

loadLedgerswofilter() {
  this.voucherservice.getDrLedgers()
    .subscribe({
      next: (data) => {
        this.debitledgersnofilter = data;
        console.log(this.debitledgers);
      },
      error: (e) => console.error(e)
    });

  this.voucherservice.getCrLedgers()
    .subscribe({
      next: (data) => {
        this.ledgersnofilter = data;
        console.log(this.ledgers);
      },
      error: (e) => console.error(e)
    });
}


removeGst(data:Gstdetails){
const gstdetid = data.vgstdetailsid;
console.log(gstdetid);
this.voucherservice.deleteGst(gstdetid)
.subscribe({
  next: (data) => {
    this.retrieveVoucherInfo();
    this.alertGstDelete();

  },
  error: (e) => console.error(e)
});
}
removeIt(data:Itdetails){
  const gstdetid = data.vgstdetailsid;
  this.voucherservice.deleteGst(gstdetid)
  .subscribe({
    next: (data) => {
    this.retrieveVoucherInfo();
    this.alertGstDelete();

    },
    error: (e) => console.error(e)
  });

}


retrieveSubLedgs(ledgid : number): void {
  this.subledgservice.getAll()
    .subscribe({
      next: (data) => {
        this.subledgs = data.filter(x=>x.ledgerid==ledgid);
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}

branchinfavourchangecheque(){

  this.paymentForDialog.chequebankname = null;

}

branchinfavourchangeol(){

  this.paymentForDialog.onlinebankname = null;

  
}

branchinfavourchangedd(){

  this.paymentForDialog.ddbankname = null;

  
}


}
