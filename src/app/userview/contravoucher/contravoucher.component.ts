import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { ComponentCanDeactivate } from 'src/app/interface/component-can-deactivate';
import { Gstdetails } from 'src/app/models/gstdetails.model';
import { Itdetails } from 'src/app/models/itdetails.model';
import { Normalledger } from 'src/app/models/normalledger.model';
import { OfficeAccount } from 'src/app/models/officeaccount.model';
import { Voucher } from 'src/app/models/voucher.model';
import { UsermasterService } from 'src/app/services/usermaster.service';
import { VoucherService } from 'src/app/services/voucher.service';
import { YearlybudgetserviceService } from 'src/app/services/yearlybudgetservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contravoucher',
  templateUrl: './contravoucher.component.html',
  styleUrls: ['./contravoucher.component.css'],
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
export class ContravoucherComponent implements OnInit, ComponentCanDeactivate {
  isDirty = false;
  supplyattract = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  vouchers: Voucher[] = [];

  companies: Voucher[] = [];

  selectedCompany!: Voucher;

  vouchertypes: Voucher[] = [];

  selectedVouchertype!: Voucher;


  displayDialog!: boolean;
  voucherForDialog!: Voucher;
  dateTime = new Date();
  dateValue: Date;
  particularsdisabled = true;
  voucherdetailsdiv = false;
  voucherID: any;
  voucherDetailsForDialog!: Voucher;

  ledgers: Voucher[] = [];

  selectedLedger!: Voucher;

  debitledgers: Voucher[] = [];

  debitSelectedLedger!: Voucher;
  creditSelectedLedger!: Voucher;

  currencies: Voucher[] = [];

  selectedCurrency!: Voucher;
  voucherdetails: Voucher[];
  public totaldebitamountt = 0;
  public totalcreditamountt = 0;
  private value!: string | any[];

  dramount?: number;
  drledger?: number;
  first = 0;
  rows = 10;
  iscashbankbalance = false;
  cashbankbalance: any;
  selectedLedgerAlias: string;
  cacheck = true;
  dacheck = true;
  crBudgetResponse: any;
  drBudgetResponse: any;
  enteredCr: number;
  enteredDr: number;
  expledgers: Normalledger[];
  vnum = null;
  vouchermasterdiv = true;
  approvalStatus = [
    { status: "New", statusid: 1 },
    { status: "Checked", statusid: 2 },
    { status: "InCorrect", statusid: 3 },
    { status: "Approve", statusid: 4 },
    { status: "Reject", statusid: 5 },
  ];
  //roles
  maker = GlobalConstants.maker;
  checker = GlobalConstants.checker;
  approver = GlobalConstants.approver;
  sadmin = GlobalConstants.sadmin;

  //module
  module = GlobalConstants.contravoucher;

  loginuid: number = +sessionStorage.getItem("loginid");

  urole: number = 0;
  approvalStatusChecker: { status: string; statusid: number; }[];
  approvalStatusApprover: { status: string; statusid: number; }[];
  approvalStatusSadmin: { status: string; statusid: number; }[];

  checkedby: number;
  approvedby: number;
  voucherdetailsDrCrTable: Voucher[];
  voucherInfo: Voucher;
  voucherInfoArray: Voucher[];
  _lid: any;
  _crlid: number;
  cL: number;
  dL: number;
  vsequence: number = 1;
  voucherAccounts: OfficeAccount[];
  drOrCr = [
    { drcr: "Dr", drcrid: 1 },
    { drcr: "Cr", drcrid: 2 },

  ];
  displayGstDialog = false;
  displayItDialog = false;

  gstDetails: Gstdetails = new Gstdetails();
  itDetails: Itdetails = new Itdetails();
  sections = [
    { sectionname: "192", sectionid: 1 },
    { sectionname: "194-I", sectionid: 2 },
    { sectionname: "194-J", sectionid: 3 },
    { sectionname: "194-C", sectionid: 4 },
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

  gstledgers: Gstdetails[] = [];
  itledgers: Itdetails[] = [];
  gsttypes: any;
  cgstdataid: number;
  sgstdataid: number;
  igstdataid: number;
  tdsdataid: number;
  invoice: Gstdetails[];
  invobj!: Gstdetails;
  newGstDetails: Gstdetails;
  newItDetails: Itdetails;
  branches: Voucher[] = [];
  vstartsequence: number = 1;
  debitledgersnofilter: Voucher[];
  ledgersnofilter: Voucher[];
  cfilterid: any;
  radioSelect: any;
  stfilterid: any;
  hoUser: boolean;


  constructor(private uservice: UsermasterService, private voucherservice: VoucherService, private yearlybudgetservice: YearlybudgetserviceService) { }
  canDeactivate(): boolean {
    return !this.isDirty;
  }
  ngOnInit(): void {
    this.voucherInfoArray = [];
    localStorage.setItem('vtype', 'contravouchers')
    this.approvalStatusChecker = this.approvalStatus.filter(x => (x.statusid == 2 || x.statusid == 3))
    this.approvalStatusApprover = this.approvalStatus.filter(x => (x.statusid == 4 || x.statusid == 5))
    this.approvalStatusSadmin = this.approvalStatus

    console.log(this.loginuid);

    this.uservice.userRoleCheck(this.loginuid, this.module).subscribe(
      (response) => {
        console.log(response);
        if (response != null) {
          this.urole = response.roleid;
          localStorage.setItem("role", "" + this.urole)

        } else {
          this.urole = 0
        }
      }
    );



    this.voucherForDialog = {
      companyname: null!, vouchertypename: null!, narration: null!,
      debitledger: null!, debitamount: null!, creditledger: null!, creditamount: null!, narrationdr: null!,
      narrationcr: null!, companyid: null!, accounttype: null!, accounttypeid: null!, branchid: null!
    };
    this.retrieveCompanies();
    this.retrieveVouchertypes();
    this.dateTime.setDate(this.dateTime.getDate());
    console.log(new Date())
    this.dateValue = new Date();
    this.dateValue.setMonth(this.dateValue.getMonth());
    console.log(this.dateValue);
    // this.retrieveVouchers();
    this.retrieveCurrency();
    this.renderAllInvoice();
    this.retrieveBranches();
    this.loadLedgerswofilter();
    this.voucherForDialog.drcrid = 1;

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

  retrieveCompanies(): void {
    this.voucherservice.getCompaniesByUser(this.loginuid)
      .subscribe({
        next: (data) => {
          this.companies = data.filter(s => s.isactive);
          console.log(data);
          if (this.companies[0].companyid == 1) {
            this.hoUser = true;
          }
          else {
            this.hoUser = false;

          }
          this.voucherservice.getAll(2, this.loginuid)
            .subscribe({
              next: (vdata) => {
                this.vouchers = vdata.filter(x => x.companyid == data[0].companyid);
                console.log(vdata);
              },
              error: (e) => console.error(e)
            });
          this.yearlybudgetservice.getExpenseLedgers(data[0].companyid)
            .subscribe({
              next: (expdata) => {
                this.expledgers = expdata;
                console.log(expdata);
              },
              error: (e) => console.error(e)
            });
            this.voucherservice.getOfficeAccounts(this.loginuid)
            .subscribe({
              next: (adata) => {
                this.voucherAccounts = adata;
                this.AccountOnChange(adata[0].accounttypeid)
                this.voucherservice.getLastVdtest(data[0].companyid,adata[0].accounttypeid)
                .subscribe({
                  next: (data) => {
                    this.vsequence = (data != null) ? +data[0].voucherseq + 1 : 1;
                    this.vstartsequence = this.vsequence;
                    console.log(data);
                  },
                  error: (e) => console.error(e)
                });
                console.log(adata);
              },
              error: (e) => console.error(e)
            });
        },
        error: (e) => console.error(e)
      });
  }
  retrieveVouchertypes(): void {
    this.voucherservice.getVoucherTypes(2)
      .subscribe({
        next: (data) => {
          this.vouchertypes = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  saveVoucher() {
    // this.voucherForDialog.companyid = this.selectedCompany.companyid;
    this.voucherForDialog.vouchertypeid = this.selectedVouchertype.vouchertypeid;
    this.voucherForDialog.voucherdate = this.dateValue;
    console.log(this.newGstDetails)
    this.voucherForDialog.invoiceNo = (this.newGstDetails != null) ? this.newGstDetails.invoicenumber : "";
    console.log(this.voucherForDialog);
    let nrFlag = false;
    this.voucherInfoArray.forEach(el => {

      if (el.narration != null) {
        nrFlag = true;
        return;
      }
    })
    if (nrFlag) {
      this.voucherservice.create(this.voucherForDialog)
        .subscribe(data => {
          console.log(data.voucherid);
          this.voucherID = data.voucherid;
          this.vnum = data.vouchernumber;


          this.voucherservice.addVoucherdetails(data.voucherid, data.companyid, this.voucherInfoArray).subscribe(
            (datadetails) => {

              console.log(datadetails);
            }

          );
          if (this.newItDetails != null) {
            this.newGstDetails.itbvledgerid = this.newItDetails.itbvledgerid;
            this.newGstDetails.sectionid = this.newItDetails.sectionid;
            this.newGstDetails.returnid = this.newItDetails.returnid;
            this.newGstDetails.grossamount = this.newItDetails.grossamount;
            this.newGstDetails.tds = this.newItDetails.tds;
            this.newGstDetails.netamount = this.newItDetails.netamount;
          }
          console.log(this.newGstDetails);
          if (this.newGstDetails != null) {
            this.newGstDetails.gsttdscgst = (this.newGstDetails.gsttdscgst == null) ? 0 : +this.newGstDetails.gsttdscgst;
            this.newGstDetails.gsttdssgst = (this.newGstDetails.gsttdssgst == null) ? 0 : +this.newGstDetails.gsttdssgst;
            this.newGstDetails.gsttdsigst = (this.newGstDetails.gsttdsigst == null) ? 0 : +this.newGstDetails.gsttdsigst;
            console.log(this.newGstDetails);
            this.voucherservice.addgstitdetails(data.voucherid, this.newGstDetails).subscribe(
              (datadetails) => {

                console.log(datadetails);
              }
            );
          }
          if (this.totaldebitamountt == this.totalcreditamountt) {

            this.voucherForDialog.totalcreditamount = this.totalcreditamountt;

            this.voucherForDialog.totaldebitamount = this.totaldebitamountt;
            this.voucherservice.updateVoucherAmount(this.voucherID, this.voucherForDialog)
              .subscribe(data => {
                this.voucherdetailsdiv = false;
                this.ngOnInit();
                this.alertUpdateVoucherAmount(this.vnum);
                this.resetVoucherDetails();
                this.vnum = null;

                this.isDirty = false;

              });

          }
          else {
            this.alertCreditDebitError();
          }


        });
    }
    else {
      Swal.fire({
        text: 'Must have atleast one Narration!',
        icon: 'error'
      })
    }
  }
  retrieveCurrency(): void {
    this.voucherservice.getCurrency()
      .subscribe({
        next: (data) => {
          this.currencies = data.filter(s => s.isactive);
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  findsumdb(data: string | any[]) {
    this.totaldebitamountt = 0;
    this.value = data
    console.log(this.value);
    if (this.value != null) {
      for (let j = 0; j < data.length; j++) {
        this.totaldebitamountt += this.value[j].debitamount
        this.totaldebitamountt = +this.totaldebitamountt.toFixed(2);
        // this.roundTo(this.totaldebitamountt,2);

      }
    }
    console.log(this.totaldebitamountt)

  }
  findsumcr(data: string | any[]) {
    this.totalcreditamountt = 0;
    this.value = data
    console.log(this.value);
    if (this.value != null) {
      for (let j = 0; j < data.length; j++) {
        this.totalcreditamountt += this.value[j].creditamount
        this.totalcreditamountt = +this.totalcreditamountt.toFixed(2);

        // this.roundTo(this.totalcreditamountt,2);
      }
    }
    console.log(this.totalcreditamountt)

  }
  roundTo(num: number, places: number) {
    const factor = 10 ** places;
    return Math.round(num * factor) / factor;
  };
  alertBalanceExceed() {
    Swal.fire({
      text: 'Entered Ledger amount is exceeding the Budget balance!',
      icon: 'error'
    })
  }

  alertSave() {
    Swal.fire({
      text: 'Voucherdetails has been saved successfully!',
      icon: 'success'
    })
  }


  updateCrDrAmount() {
    if (this.totaldebitamountt == this.totalcreditamountt) {

      this.voucherForDialog.totalcreditamount = this.totalcreditamountt;

      this.voucherForDialog.totaldebitamount = this.totaldebitamountt;
      this.voucherservice.updateVoucherAmount(this.voucherID, this.voucherForDialog)
        .subscribe(data => {
          this.voucherdetailsdiv = false;
          this.ngOnInit();
          this.vnum = null;
          this.vouchermasterdiv = true;
          this.resetVoucherDetails();


        });

    }
    else {
      this.alertCreditDebitError();
    }
  }
  alertCreditDebitError() {
    Swal.fire({
      text: 'Total Credit amount should be equal to Debit!',
      icon: 'error'
    })
  }

  alertUpdateVoucherAmount(vno: string) {
    Swal.fire({
      text: vno + 'has been created successfully!',
      icon: 'success'
    })
  }
  resetVoucherDetails() {
    this.voucherForDialog = {
      companyname: null!, vouchertypename: null!, narration: null!,
      debitledger: null!, debitamount: null!, creditledger: null!, creditamount: null!, narrationdr: null!,
      narrationcr: null!, companyid: null!, accounttype: null!, accounttypeid: null!, branchid: null!
    };
    this.iscashbankbalance = false;
    this.cashbankbalance = null;
    this.cacheck = true;
    this.dacheck = true;
    this.voucherdetailsDrCrTable = null;
    this.totalcreditamountt = 0;
    this.totaldebitamountt = 0;
    this.gstDetails = null;
    this.itDetails = null;
    this.debitledgers = null;
    this.ledgers = null;
    this.voucherForDialog.drcrid = 1;

  }

  retrieveVouchers(): void {
    this.voucherservice.getAll(2, this.loginuid)
      .subscribe({
        next: (data) => {
          this.vouchers = data.filter(x => x.companyid == data[0].companyid);
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
  alertDuplicate() {
    Swal.fire({
      text: 'Selected Ledger is already present!',
      icon: 'warning'
    })
  }

  LedgerOnChange(_ledgerid: number) {
    this.cashbankbalance = null;
    var cashbankList = [];

    this.isDirty = true;

    this.cL = this.voucherForDialog.creditledger;
    this.dL = this.voucherForDialog.debitledger;
    // if (foundDebitLedger != undefined || foundCreditLedger != undefined || (this.cL == this.dL)) {

    //   this.alertDuplicate();
    //   this.iscashbankbalance = false;
    //   this.cashbankbalance = null;
    //    this.voucherForDialog.debitledger = null;
    //     this.voucherForDialog.debitamount = null;
    //     this.voucherForDialog.narrationdr = null;
    //     this.voucherForDialog.creditledger = null;
    //     this.voucherForDialog.creditamount = null;
    //     this.voucherForDialog.narrationcr = null;


    // }
    // else {
    var cashbankLedgers = this.debitledgers.filter(x => x.subgroupid == 209 || x.subgroupid == 81)
    cashbankLedgers.forEach(element => {
      cashbankList.push(element.subgroupid)
    });
    console.log(cashbankList);


    var foundexpLedger = undefined
    this.selectedLedgerAlias = this.ledgers.find(x => x.creditledger == _ledgerid).crledgeralias;
    var cbId = this.ledgers.find(x => x.creditledger == _ledgerid).subgroupid
    console.log(cbId)
    console.log(this.selectedLedgerAlias);
    if (this.expledgers != null) {

      foundexpLedger = this.expledgers.find(x => x.ledgerid == _ledgerid);

    }
    if (cashbankList.find(x => x == cbId) || foundexpLedger != undefined) {
      console.log(cashbankList);

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
            console.log(data)
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
    // }
  }

  cachange(camount: number) {

    if (camount > 0) {

      this.cacheck = false;


    }
    else {
      this.cacheck = true;
    }

  }
  dachange(damount: number) {
    console.log(damount);
    if (damount > 0) {
      this.dacheck = false;

    }
    else {
      this.dacheck = true;
    }

  }


  clonedGroups: { [s: string]: Voucher; } = {};
  onRowEditInit(_yb: Voucher) {
    console.log('Row edit initialized');
    this.clonedGroups[_yb.vouchernumber!] = { ..._yb };
  }

  onRowEditCancel(_yb: Voucher, index: number) {
    console.log('Row edit cancelled');
    this.vouchers[index] = this.clonedGroups[_yb.vouchernumber!];
    delete this.clonedGroups[_yb.vouchernumber!];
  }
  onRowEditSave(vouchid: number, row: Voucher) {

    this.checkedby = (row.statusid == 2 || row.statusid == 3) ? this.loginuid : 0;
    this.approvedby = (row.statusid == 4 || row.statusid == 5) ? this.loginuid : 0;
    if (row.statusid === 3 || row.statusid == 5) {
      if (row.remarks == null) {
        Swal.fire({
          text: 'Please enter the remarks!',
          icon: 'info'
        })
        this.ngOnInit();

        return;
      }

    }
    this.voucherservice.updateStatus(vouchid, row.statusid, this.approvedby, this.checkedby, row.remarks, row.voucherdate).subscribe({
      next: (data) => {
        if (data != 0) {
          this.ngOnInit();
          Swal.fire({
            text: 'You have changed the Voucher status!',
            icon: 'success'
          })

        }
        else {
          Swal.fire({
            text: 'Something went wrong, please check the budget limit!',
            icon: 'error'
          })
        }
      },

      error: (e) => {
        console.error(e);

      }


    });
  }


  saveDebitVoucher() {

    if (this.voucherForDialog.debitledger != null) {
      this.voucherInfo = new Voucher();
      this.voucherForDialog.voucherseq = this.vsequence

      this.voucherForDialog.creditledger = null!
      this.voucherForDialog.creditamount = null!
      this.voucherForDialog.narration = this.voucherForDialog.narrationdr;

      this.voucherInfo.voucherseq = this.voucherForDialog.voucherseq;
      this.voucherInfo.debitledger = +this.voucherForDialog.debitledger;
      this.voucherInfo.creditledger = this.voucherForDialog.creditledger;
      this.voucherInfo.debitamount = +this.voucherForDialog.debitamount;
      this.voucherInfo.creditamount = this.voucherForDialog.creditamount;
      this.voucherInfo.narration = this.voucherForDialog.narrationdr;
      this.voucherInfo.ledgeralias = this.debitledgers.find(x => x.debitledger == this.voucherInfo.debitledger).drledgeralias;
      this.voucherInfo.branchid = this.voucherForDialog.branchid;
      this.voucherInfo.branchname = (this.voucherInfo.branchid != null) ? this.branches.find(x => x.branchid == this.voucherInfo.branchid).branchname : '';

      // if (this.cashbankbalance != null && this.voucherInfo.debitamount > this.cashbankbalance) {
      //   this.alertBalanceExceed();
      //   this.voucherForDialog.debitledger = null;
      //   this.voucherForDialog.debitamount = null;
      //   this.voucherForDialog.narrationdr = null;
      //   this.iscashbankbalance = false;
      //   this.cashbankbalance = null;

      // }
      // else {
      this.voucherInfoArray.push(this.voucherInfo);
      console.log(this.voucherInfoArray);
      this.voucherdetailsDrCrTable = this.voucherInfoArray.filter(x => (x.debitledger != null || x.creditledger != null));
      this.findsumdb(this.voucherdetailsDrCrTable);
      this.voucherForDialog.debitledger = null;
      this.voucherForDialog.debitamount = null;
      this.voucherForDialog.narrationdr = null;
      this.voucherForDialog.branchid = null;
      this.iscashbankbalance = false;
      this.cashbankbalance = null;
      console.log(this.voucherdetailsDrCrTable)
      console.log(this.voucherInfoArray)
      // }

    }

  }
  saveCreditVoucher() {

    if (this.voucherForDialog.creditledger != null) {
      this.voucherInfo = new Voucher();
      this.voucherForDialog.voucherseq = this.vsequence

      this.voucherForDialog.debitamount = null!
      this.voucherForDialog.debitledger = null!;
      this.voucherForDialog.narration = this.voucherForDialog.narrationcr;

      this.voucherInfo.voucherseq = this.voucherForDialog.voucherseq;
      this.voucherInfo.debitledger = this.voucherForDialog.debitledger;
      this.voucherInfo.creditledger = +this.voucherForDialog.creditledger;
      this.voucherInfo.debitamount = this.voucherForDialog.debitamount;
      this.voucherInfo.creditamount = +this.voucherForDialog.creditamount;
      this.voucherInfo.narration = this.voucherForDialog.narrationcr;
      this.voucherInfo.ledgeralias = this.ledgers.find(x => x.creditledger == this.voucherInfo.creditledger).crledgeralias;
      this.voucherInfo.branchid = this.voucherForDialog.branchid;
      this.voucherInfo.branchname = (this.voucherInfo.branchid != null) ? this.branches.find(x => x.branchid == this.voucherInfo.branchid).branchname : '';

      // if (this.cashbankbalance != null && this.voucherInfo.creditamount > this.cashbankbalance) {
      //   this.alertBalanceExceed();
      //   this.voucherForDialog.creditledger = null;
      //   this.voucherForDialog.creditamount = null;
      //   this.voucherForDialog.narrationcr = null;
      //   this.iscashbankbalance = false;
      //   this.cashbankbalance = null;

      // }
      // else {

      this.voucherInfoArray.push(this.voucherInfo);
      this.voucherdetailsDrCrTable = this.voucherInfoArray.filter(x => (x.debitledger != null || x.creditledger != null));
      this.findsumcr(this.voucherdetailsDrCrTable)
      this.voucherForDialog.creditledger = null;
      this.voucherForDialog.creditamount = null;
      this.voucherForDialog.narrationcr = null;
      this.voucherForDialog.branchid = null;
      this.iscashbankbalance = false;
      this.cashbankbalance = null;

      //  }
    }

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
  loadLedgers(actype: number) {

    this.voucherservice.getDrLedgers()
      .subscribe({
        next: (data) => {
          data = data.filter(x=>x.companyid==null ||x.companyid==this.voucherForDialog.companyid);
          let ctype = this.companies.find(x => x.companyid == this.voucherForDialog.companyid).companytypeid;
          if (ctype == 1) {
            this.debitledgers = data.filter(x => x.accounttypeid == actype);

          }
          else if (ctype == 2) {
            this.debitledgers = data.filter(x => (x.companytype == ctype || x.companytype == 1015) && x.accounttypeid == actype);

          }
          else if (ctype == 3) {
            this.debitledgers = data.filter(x => (x.companytype == ctype || x.companytype == 1016) && x.accounttypeid == actype);

          }
          else {
            this.debitledgers = data.filter(x => (x.companytype == ctype) && x.accounttypeid == actype);

          }
        },
        error: (e) => console.error(e)
      });

    this.voucherservice.getCrLedgers()
      .subscribe({
        next: (data) => {
          data = data.filter(x=>x.companyid==null ||x.companyid==this.voucherForDialog.companyid);
          let ctype = this.companies.find(x => x.companyid == this.voucherForDialog.companyid).companytypeid;
          if (ctype == 1) {
            this.ledgers = data.filter(x => x.accounttypeid == actype);

          }
          else if (ctype == 2) {
            this.ledgers = data.filter(x => (x.companytype == ctype || x.companytype == 1015) && x.accounttypeid == actype);

          }
          else if (ctype == 3) {
            this.ledgers = data.filter(x => (x.companytype == ctype || x.companytype == 1016) && x.accounttypeid == actype);

          }
          else {
            this.ledgers = data.filter(x => (x.companytype == ctype) && x.accounttypeid == actype);

          }
          console.log(this.ledgers);
        },
        error: (e) => console.error(e)
      });

      this.voucherservice.getLastVdtest(this.voucherForDialog.companyid,actype)
      .subscribe({
        next: (data) => {
          this.vsequence = (data != null) ? +data[0].voucherseq + 1 : 1;
          this.vstartsequence = this.vsequence;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  getAccountTypes(oid: number) {
    this.voucherservice.getAccountsVoucher(oid)
      .subscribe({
        next: (data) => {
          this.voucherAccounts = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  BranchOnChange(company: number) {
    this.getAccountTypes(company);
   
    this.yearlybudgetservice.getExpenseLedgers(company)
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
          data = data.filter(x=>x.companyid==null ||x.companyid==this.voucherForDialog.companyid);
          let ctype = this.companies.find(x => x.companyid == this.voucherForDialog.companyid).companytypeid;
          if (ctype == 1) {
            this.debitledgers = data.filter(x => x.accounttypeid == this.voucherForDialog.accounttypeid);

          }
          else if (ctype == 2) {
            this.debitledgers = data.filter(x => (x.companytype == ctype || x.companytype == 1015) && x.accounttypeid == this.voucherForDialog.accounttypeid);

          }
          else if (ctype == 3) {
            this.debitledgers = data.filter(x => (x.companytype == ctype || x.companytype == 1016) && x.accounttypeid == this.voucherForDialog.accounttypeid);

          }
          else {
            this.debitledgers = data.filter(x => (x.companytype == ctype) && x.accounttypeid == this.voucherForDialog.accounttypeid);

          }

          console.log(data);
        },
        error: (e) => console.error(e)
      });

    this.voucherservice.getCrLedgers()
      .subscribe({
        next: (data) => {
          data = data.filter(x=>x.companyid==null ||x.companyid==this.voucherForDialog.companyid);
          let ctype = this.companies.find(x => x.companyid == this.voucherForDialog.companyid).companytypeid;
          if (ctype == 1) {
            this.ledgers = data.filter(x => x.accounttypeid == this.voucherForDialog.accounttypeid);

          }
          else if (ctype == 2) {
            this.ledgers = data.filter(x => (x.companytype == ctype || x.companytype == 1015) && x.accounttypeid == this.voucherForDialog.accounttypeid);

          }
          else if (ctype == 3) {
            this.ledgers = data.filter(x => (x.companytype == ctype || x.companytype == 1016) && x.accounttypeid == this.voucherForDialog.accounttypeid);

          }
          else {
            this.ledgers = data.filter(x => (x.companytype == ctype) && x.accounttypeid == this.voucherForDialog.accounttypeid);

          }
          console.log(data);
        },
        error: (e) => console.error(e)
      });
      this.voucherservice.getLastVdtest(company,this.voucherForDialog.accounttypeid)
      .subscribe({
        next: (data) => {
          this.vsequence = (data != null) ? +data[0].voucherseq + 1 : 1;
          this.vstartsequence = this.vsequence;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  getCrOfficeLedger(ledger: string) {
    this.voucherservice.getOfficeLedgers(this.voucherForDialog.companyid)
      .subscribe({
        next: (data) => {
          console.log(data);
          if (ledger == "cash") {
            this._crlid = data.cashid;
          }
          if (ledger == "bank") {
            this._crlid = data.bankid;
          }
          if (ledger == "cgst") {
            this._crlid = data.cgstid;
          }
          if (ledger == "igst") {
            this._crlid = data.igstid;
          }
          if (ledger == "sgst") {
            this._crlid = data.sgstid;
          }
          if (ledger == "tcs") {
            this._crlid = data.tcs;
          }
          if (ledger == "tds") {
            this._crlid = data.tds;
          }
          if (ledger == "gsttds") {
            this._crlid = data.gsttds;
          }

          if (this._crlid != null) {
            this.voucherForDialog.creditledger = this._crlid;

          }

        },
        error: (e) => console.error(e)
      });


  }

  vseqpl() {
    if (this.voucherInfo.voucherseq === this.vsequence) {
      this.vsequence++;
      this.voucherForDialog.drcrid = 1;

    }
  }
  vseqmi() {
    this.vsequence--;

  }
  getOfficeGSTLedger(ledger: string) {
    this.displayGstDialog = true;
    this.gstDetails = new Gstdetails();
    this.gsttypes = [];
    this.voucherservice.getGstLedgers(this.voucherForDialog.companyid)
      .subscribe({
        next: (data) => {
          this.gstledgers = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });

    this.voucherservice.getOfficeLedgers(this.voucherForDialog.companyid)
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

        },
        error: (e) => console.error(e)
      });
    console.log(this.gsttypes);
  }
  getOfficeITLedger(ledger: string) {
    this.displayItDialog = true;
    this.itDetails = new Itdetails();
    this.voucherservice.getItLedgers(this.voucherForDialog.companyid)
      .subscribe({
        next: (data) => {
          this.itledgers = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
    this.voucherservice.getOfficeLedgers(this.voucherForDialog.companyid)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.tdsdataid = data.tds;

        },
        error: (e) => console.error(e)
      });
  }
  getOfficeArticleLedger(ledger: string) {


  }


  saveGst() {
    if (this.voucherForDialog.drcrid == 1) {

      if (this.gstDetails.igstvalue > 0) {
        this.voucherInfo = new Voucher();
        this.voucherForDialog.voucherseq = this.vsequence

        this.voucherForDialog.creditledger = null!
        this.voucherForDialog.creditamount = null!

        this.voucherInfo.voucherseq = this.voucherForDialog.voucherseq;
        this.voucherInfo.debitledger = +this.igstdataid;
        this.voucherInfo.creditledger = this.voucherForDialog.creditledger;
        this.voucherInfo.debitamount = +this.gstDetails.igstvalue;
        this.voucherInfo.creditamount = this.voucherForDialog.creditamount;
        this.voucherInfo.ledgeralias = this.debitledgers.find(x => x.debitledger == this.voucherInfo.debitledger).drledgeralias;



        this.voucherInfoArray.push(this.voucherInfo);
        console.log(this.voucherInfoArray);
        this.voucherdetailsDrCrTable = this.voucherInfoArray.filter(x => (x.debitledger != null || x.creditledger != null));
        this.findsumdb(this.voucherdetailsDrCrTable);
        this.voucherForDialog.debitledger = null;
        this.voucherForDialog.debitamount = null;
        this.voucherForDialog.narrationdr = null;
        this.iscashbankbalance = false;
        this.cashbankbalance = null;
      }
      else {
        this.voucherInfo = new Voucher();
        this.voucherForDialog.voucherseq = this.vsequence

        this.voucherForDialog.creditledger = null!
        this.voucherForDialog.creditamount = null!

        this.voucherInfo.voucherseq = this.voucherForDialog.voucherseq;
        this.voucherInfo.debitledger = +this.sgstdataid;
        this.voucherInfo.creditledger = this.voucherForDialog.creditledger;
        this.voucherInfo.debitamount = +this.gstDetails.sgstvalue;
        this.voucherInfo.creditamount = this.voucherForDialog.creditamount;
        this.voucherInfo.ledgeralias = this.debitledgers.find(x => x.debitledger == this.voucherInfo.debitledger).drledgeralias;



        this.voucherInfoArray.push(this.voucherInfo);
        console.log(this.voucherInfoArray);
        this.voucherdetailsDrCrTable = this.voucherInfoArray.filter(x => (x.debitledger != null || x.creditledger != null));
        this.findsumdb(this.voucherdetailsDrCrTable);
        this.voucherForDialog.debitledger = null;
        this.voucherForDialog.debitamount = null;
        this.voucherForDialog.narrationdr = null;
        this.iscashbankbalance = false;
        this.cashbankbalance = null;


        this.voucherInfo = new Voucher();
        this.voucherForDialog.voucherseq = this.vsequence

        this.voucherForDialog.creditledger = null!
        this.voucherForDialog.creditamount = null!

        this.voucherInfo.voucherseq = this.voucherForDialog.voucherseq;
        this.voucherInfo.debitledger = +this.cgstdataid;
        this.voucherInfo.creditledger = this.voucherForDialog.creditledger;
        this.voucherInfo.debitamount = +this.gstDetails.cgstvalue;
        this.voucherInfo.creditamount = this.voucherForDialog.creditamount;
        this.voucherInfo.ledgeralias = this.debitledgers.find(x => x.debitledger == this.voucherInfo.debitledger).drledgeralias;



        this.voucherInfoArray.push(this.voucherInfo);
        console.log(this.voucherInfoArray);
        this.voucherdetailsDrCrTable = this.voucherInfoArray.filter(x => (x.debitledger != null || x.creditledger != null));
        this.findsumdb(this.voucherdetailsDrCrTable);
        this.voucherForDialog.debitledger = null;
        this.voucherForDialog.debitamount = null;
        this.voucherForDialog.narrationdr = null;
        this.iscashbankbalance = false;
        this.cashbankbalance = null;
      }

      this.voucherInfo = new Voucher();
      this.voucherForDialog.voucherseq = this.vsequence

      this.voucherForDialog.creditledger = null!
      this.voucherForDialog.creditamount = null!

      this.voucherInfo.voucherseq = this.voucherForDialog.voucherseq;
      this.voucherInfo.debitledger = +this.gstDetails.gstbvledgerid;
      this.voucherInfo.creditledger = this.voucherForDialog.creditledger;
      this.voucherInfo.debitamount = +this.gstDetails.invoicevalue;
      this.voucherInfo.creditamount = this.voucherForDialog.creditamount;
      this.voucherInfo.ledgeralias = this.debitledgersnofilter.find(x => x.debitledger == this.voucherInfo.debitledger).drledgeralias;



      this.voucherInfoArray.push(this.voucherInfo);
      console.log(this.voucherInfoArray);
      this.voucherdetailsDrCrTable = this.voucherInfoArray.filter(x => (x.debitledger != null || x.creditledger != null));
      this.findsumdb(this.voucherdetailsDrCrTable);
      this.voucherForDialog.debitledger = null;
      this.voucherForDialog.debitamount = null;
      this.voucherForDialog.narrationdr = null;
      this.iscashbankbalance = false;
      this.cashbankbalance = null;
      console.log(this.voucherdetailsDrCrTable)
      console.log(this.voucherInfoArray)

    }
    if (this.voucherForDialog.drcrid == 2) {
      if (this.gstDetails.igstvalue > 0) {

        this.voucherInfo = new Voucher();
        this.voucherForDialog.voucherseq = this.vsequence

        this.voucherForDialog.debitledger = null!
        this.voucherForDialog.debitamount = null!

        this.voucherInfo.voucherseq = this.voucherForDialog.voucherseq;
        this.voucherInfo.creditledger = +this.igstdataid;
        this.voucherInfo.debitledger = this.voucherForDialog.debitledger;
        this.voucherInfo.creditamount = +this.gstDetails.igstvalue;
        this.voucherInfo.debitamount = this.voucherForDialog.debitamount;
        this.voucherInfo.ledgeralias = this.ledgers.find(x => x.creditledger == this.voucherInfo.creditledger).crledgeralias;



        this.voucherInfoArray.push(this.voucherInfo);
        console.log(this.voucherInfoArray);
        this.voucherdetailsDrCrTable = this.voucherInfoArray.filter(x => (x.debitledger != null || x.creditledger != null));
        this.findsumcr(this.voucherdetailsDrCrTable);
        this.voucherForDialog.creditledger = null;
        this.voucherForDialog.creditamount = null;
        this.voucherForDialog.narrationcr = null;
        this.iscashbankbalance = false;
        this.cashbankbalance = null;
      }
      else {
        this.voucherInfo = new Voucher();
        this.voucherForDialog.voucherseq = this.vsequence

        this.voucherForDialog.debitledger = null!
        this.voucherForDialog.debitamount = null!

        this.voucherInfo.voucherseq = this.voucherForDialog.voucherseq;
        this.voucherInfo.creditledger = +this.sgstdataid;
        this.voucherInfo.debitledger = this.voucherForDialog.debitledger;
        this.voucherInfo.creditamount = +this.gstDetails.sgstvalue;
        this.voucherInfo.debitamount = this.voucherForDialog.debitamount;
        this.voucherInfo.ledgeralias = this.ledgers.find(x => x.creditledger == this.voucherInfo.creditledger).crledgeralias;



        this.voucherInfoArray.push(this.voucherInfo);
        console.log(this.voucherInfoArray);
        this.voucherdetailsDrCrTable = this.voucherInfoArray.filter(x => (x.debitledger != null || x.creditledger != null));
        this.findsumcr(this.voucherdetailsDrCrTable);
        this.voucherForDialog.creditledger = null;
        this.voucherForDialog.creditamount = null;
        this.voucherForDialog.narrationcr = null;
        this.iscashbankbalance = false;
        this.cashbankbalance = null;


        this.voucherInfo = new Voucher();
        this.voucherForDialog.voucherseq = this.vsequence

        this.voucherForDialog.debitledger = null!
        this.voucherForDialog.debitamount = null!

        this.voucherInfo.voucherseq = this.voucherForDialog.voucherseq;
        this.voucherInfo.creditledger = +this.cgstdataid;
        this.voucherInfo.debitledger = this.voucherForDialog.debitledger;
        this.voucherInfo.creditamount = +this.gstDetails.cgstvalue;
        this.voucherInfo.debitamount = this.voucherForDialog.debitamount;
        this.voucherInfo.ledgeralias = this.ledgers.find(x => x.creditledger == this.voucherInfo.creditledger).crledgeralias;



        this.voucherInfoArray.push(this.voucherInfo);
        console.log(this.voucherInfoArray);
        this.voucherdetailsDrCrTable = this.voucherInfoArray.filter(x => (x.debitledger != null || x.creditledger != null));
        this.findsumcr(this.voucherdetailsDrCrTable);
        this.voucherForDialog.creditledger = null;
        this.voucherForDialog.creditamount = null;
        this.voucherForDialog.narrationcr = null;
        this.iscashbankbalance = false;
        this.cashbankbalance = null;
      }

      this.voucherInfo = new Voucher();
      this.voucherForDialog.voucherseq = this.vsequence

      this.voucherForDialog.debitledger = null!
      this.voucherForDialog.debitamount = null!

      this.voucherInfo.voucherseq = this.voucherForDialog.voucherseq;
      this.voucherInfo.creditledger = +this.gstDetails.gstbvledgerid;
      this.voucherInfo.debitledger = this.voucherForDialog.debitledger;
      this.voucherInfo.creditamount = +this.gstDetails.invoicevalue;
      this.voucherInfo.debitamount = this.voucherForDialog.debitamount;
      this.voucherInfo.ledgeralias = this.ledgersnofilter.find(x => x.creditledger == this.voucherInfo.creditledger).crledgeralias;



      this.voucherInfoArray.push(this.voucherInfo);
      console.log(this.voucherInfoArray);
      this.voucherdetailsDrCrTable = this.voucherInfoArray.filter(x => (x.debitledger != null || x.creditledger != null));
      this.findsumcr(this.voucherdetailsDrCrTable);
      this.voucherForDialog.creditledger = null;
      this.voucherForDialog.creditamount = null;
      this.voucherForDialog.narrationcr = null;
      this.iscashbankbalance = false;
      this.cashbankbalance = null;
      console.log(this.voucherdetailsDrCrTable)
      console.log(this.voucherInfoArray)
    }
    this.newGstDetails = this.gstDetails;
    this.displayGstDialog = false;
  }



  saveIt() {
    if (this.voucherForDialog.drcrid == 1) {
      this.voucherInfo = new Voucher();
      this.voucherForDialog.voucherseq = this.vsequence

      this.voucherForDialog.creditledger = null!
      this.voucherForDialog.creditamount = null!

      this.voucherInfo.voucherseq = this.voucherForDialog.voucherseq;
      this.voucherInfo.debitledger = +this.itDetails.itbvledgerid;
      this.voucherInfo.creditledger = this.voucherForDialog.creditledger;
      this.voucherInfo.debitamount = +this.itDetails.grossamount;
      this.voucherInfo.creditamount = this.voucherForDialog.creditamount;
      this.voucherInfo.ledgeralias = this.debitledgersnofilter.find(x => x.debitledger == this.voucherInfo.debitledger).drledgeralias;



      this.voucherInfoArray.push(this.voucherInfo);
      console.log(this.voucherInfoArray);
      this.voucherdetailsDrCrTable = this.voucherInfoArray.filter(x => (x.debitledger != null || x.creditledger != null));
      this.findsumdb(this.voucherdetailsDrCrTable);
      this.voucherForDialog.debitledger = null;
      this.voucherForDialog.debitamount = null;
      this.voucherForDialog.narrationdr = null;
      this.iscashbankbalance = false;
      this.cashbankbalance = null;
      console.log(this.voucherdetailsDrCrTable)
      console.log(this.voucherInfoArray)



      this.voucherInfo = new Voucher();
      this.voucherForDialog.voucherseq = this.vsequence

      this.voucherForDialog.creditledger = null!
      this.voucherForDialog.creditamount = null!

      this.voucherInfo.voucherseq = this.voucherForDialog.voucherseq;
      this.voucherInfo.debitledger = +this.tdsdataid;
      this.voucherInfo.creditledger = this.voucherForDialog.creditledger;
      this.voucherInfo.debitamount = +this.itDetails.tds;
      this.voucherInfo.creditamount = this.voucherForDialog.creditamount;
      this.voucherInfo.ledgeralias = this.debitledgers.find(x => x.debitledger == this.voucherInfo.debitledger).drledgeralias;



      this.voucherInfoArray.push(this.voucherInfo);
      console.log(this.voucherInfoArray);
      this.voucherdetailsDrCrTable = this.voucherInfoArray.filter(x => (x.debitledger != null || x.creditledger != null));
      this.findsumdb(this.voucherdetailsDrCrTable);
      this.voucherForDialog.debitledger = null;
      this.voucherForDialog.debitamount = null;
      this.voucherForDialog.narrationdr = null;
      this.iscashbankbalance = false;
      this.cashbankbalance = null;
      console.log(this.voucherdetailsDrCrTable)
      console.log(this.voucherInfoArray)


    }
    if (this.voucherForDialog.drcrid == 2) {
      this.voucherInfo = new Voucher();
      this.voucherForDialog.voucherseq = this.vsequence

      this.voucherForDialog.debitledger = null!
      this.voucherForDialog.debitamount = null!

      this.voucherInfo.voucherseq = this.voucherForDialog.voucherseq;
      this.voucherInfo.creditledger = +this.itDetails.itbvledgerid;
      this.voucherInfo.debitledger = this.voucherForDialog.debitledger;
      this.voucherInfo.creditamount = +this.itDetails.grossamount;
      this.voucherInfo.debitamount = this.voucherForDialog.debitamount;
      this.voucherInfo.ledgeralias = this.ledgersnofilter.find(x => x.creditledger == this.voucherInfo.creditledger).crledgeralias;



      this.voucherInfoArray.push(this.voucherInfo);
      console.log(this.voucherInfoArray);
      this.voucherdetailsDrCrTable = this.voucherInfoArray.filter(x => (x.debitledger != null || x.creditledger != null));
      this.findsumcr(this.voucherdetailsDrCrTable);
      this.voucherForDialog.creditledger = null;
      this.voucherForDialog.creditamount = null;
      this.voucherForDialog.narrationcr = null;
      this.iscashbankbalance = false;
      this.cashbankbalance = null;
      console.log(this.voucherdetailsDrCrTable)
      console.log(this.voucherInfoArray)

      this.voucherInfo = new Voucher();
      this.voucherForDialog.voucherseq = this.vsequence

      this.voucherForDialog.debitledger = null!
      this.voucherForDialog.debitamount = null!

      this.voucherInfo.voucherseq = this.voucherForDialog.voucherseq;
      this.voucherInfo.creditledger = +this.tdsdataid;
      this.voucherInfo.debitledger = this.voucherForDialog.debitledger;
      this.voucherInfo.creditamount = +this.itDetails.tds;
      this.voucherInfo.debitamount = this.voucherForDialog.debitamount;
      this.voucherInfo.ledgeralias = this.ledgers.find(x => x.creditledger == this.voucherInfo.creditledger).crledgeralias;



      this.voucherInfoArray.push(this.voucherInfo);
      console.log(this.voucherInfoArray);
      this.voucherdetailsDrCrTable = this.voucherInfoArray.filter(x => (x.debitledger != null || x.creditledger != null));
      this.findsumcr(this.voucherdetailsDrCrTable);
      this.voucherForDialog.creditledger = null;
      this.voucherForDialog.creditamount = null;
      this.voucherForDialog.narrationcr = null;
      this.iscashbankbalance = false;
      this.cashbankbalance = null;
      console.log(this.voucherdetailsDrCrTable)
      console.log(this.voucherInfoArray)

    }
    this.newItDetails = this.itDetails;

    this.displayItDialog = false;
  }


  removeVd(event: any) {

    console.log(event)
    this.voucherInfoArray.splice(this.voucherInfoArray.findIndex((item) => item == event), 1)
    this.voucherdetailsDrCrTable = this.voucherInfoArray.filter(x => (x.debitledger != null || x.creditledger != null));
    this.findsumdb(this.voucherdetailsDrCrTable);
    this.findsumcr(this.voucherdetailsDrCrTable);
    console.log(this.voucherInfoArray);

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
    console.log(this.debitledgers.find(x => x.debitledger == id))
    this.gstDetails.gstbvgsttin = this.debitledgers.find(x => x.debitledger == id).gsttin;

  }
  retrieveBranches(): void {
    this.voucherservice.getAllBranches()
      .subscribe({
        next: (data) => {
          this.branches = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  AccountOnChange(accTypeId: number) {
    this.loadLedgers(accTypeId);

  }

  filterVoucher() {

    this.voucherservice.getAll(2, this.loginuid)
      .subscribe({
        next: (data) => {
          console.log(this.cfilterid)
          console.log(this.radioSelect)
          if (this.cfilterid == undefined && this.radioSelect != undefined && this.stfilterid == undefined) {
            this.vouchers = data.filter(x => x.accounttypeid == +this.radioSelect);

          }
          if (this.radioSelect == undefined && this.cfilterid != undefined && this.stfilterid == undefined) {
            this.vouchers = data.filter(x => x.companyid == this.cfilterid);

          }
          if (this.radioSelect == undefined && this.cfilterid == undefined && this.stfilterid != undefined) {
            this.vouchers = data.filter(x => x.statusid == this.stfilterid);

          }
          if (this.radioSelect == undefined && this.cfilterid == undefined && this.stfilterid == undefined) {
            this.vouchers = data;

          }
          if (this.radioSelect != undefined && this.cfilterid != undefined && this.stfilterid != undefined) {
            this.vouchers = data.filter(x => x.companyid == this.cfilterid && x.accounttypeid == +this.radioSelect && x.statusid == this.stfilterid);

          }


          if (this.radioSelect != undefined && this.cfilterid != undefined && this.stfilterid == undefined) {
            this.vouchers = data.filter(x => x.companyid == this.cfilterid && x.accounttypeid == +this.radioSelect);

          }
          if (this.radioSelect == undefined && this.cfilterid != undefined && this.stfilterid != undefined) {
            this.vouchers = data.filter(x => x.companyid == this.cfilterid && x.statusid == this.stfilterid);

          }
          if (this.radioSelect != undefined && this.cfilterid == undefined && this.stfilterid != undefined) {
            this.vouchers = data.filter(x => x.accounttypeid == +this.radioSelect && x.statusid == this.stfilterid);

          }
          console.log(data);
        },
        error: (e) => console.error(e)
      });

  }
}
