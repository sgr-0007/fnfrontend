import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { ComponentCanDeactivate } from 'src/app/interface/component-can-deactivate';
import { Financialyear } from 'src/app/models/financialyear';
import { Yearlybudget } from 'src/app/models/yearlybudget.mode';
import { InvoiceserviceService } from 'src/app/services/invoiceservice.service';
import { UsermasterService } from 'src/app/services/usermaster.service';
import { VoucherService } from 'src/app/services/voucher.service';
import { YearlybudgetserviceService } from 'src/app/services/yearlybudgetservice.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
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
export class BudgetComponent implements OnInit, ComponentCanDeactivate {
  isDirty = false;

  isactive = [
    { label: "Active", value: true },
    { label: "InActive", value: false },
  ];

  approvalStatus = [
    { status: "New", statusid: 1 },
    { status: "Checked", statusid: 2 },
    { status: "InCorrect", statusid: 3 },
    { status: "Approve", statusid: 4 },
    { status: "Reject", statusid: 5 },
  ];

  ybForDialog!: Yearlybudget;
  ybMaster!: Yearlybudget;
  ybDetail!: Yearlybudget;
  yearlyDetails: Yearlybudget[] = [];
  yb: Yearlybudget[] = [];
  ybDetails: Yearlybudget[] = [];
  ybDetailsForDialog: Yearlybudget;
  submitted = false;
  ybnameunique: boolean;
  budgetdetailsdiv = false;
  companies: Yearlybudget[] = [];
  ledgers: Yearlybudget[] = [];
  ybname: string;
  ybId: any;
  ybName: any;
  compId: number;
  _cid: number;
  _fy: string;
  allFy: Financialyear[];
  selectedFinancialname: string;
  ybDetailsHist: Yearlybudget[];
  historyDialog = false;
  budgetdetailsdivog = false;
  budgetmasterdiv = true;
  newLedgerDialog = false;
  newLedgerForDialog!: Yearlybudget;
  isLoading: boolean = false;
  //roles
  maker = GlobalConstants.maker;
  checker = GlobalConstants.checker;
  approver = GlobalConstants.approver;

  //module
  budget = GlobalConstants.budget;

  loginuid: number = +sessionStorage.getItem("loginid");

  urole: number = 0;
  approvalStatusChecker: { status: string; statusid: number; }[];
  approvalStatusApprover: { status: string; statusid: number; }[];
  checkedby: number;
  approvedby: number;
  finyear: number;
  budgetform = true;
  backtoform = false;
  comid: number;
  finanyear: string;
  budgname: string;
  budgid: number;
  reviseForDialog!: Yearlybudget;
  displayDialog = false;
  yhid: any;
  yid: any;
  ledid: any;
  sanc: any;
  ybDetailsHistofHist: Yearlybudget[];
  historyofHistDialog: boolean = false;
  constructor(private yearlybudgetservice: YearlybudgetserviceService, private voucherservice: VoucherService, private invoiceservice: InvoiceserviceService
    , private uservice: UsermasterService) { }
  canDeactivate(): boolean {
    return !this.isDirty;
  }
  ngOnInit(): void {
    this.yearlyDetails = [];

    this.approvalStatusChecker = this.approvalStatus.filter(x => (x.statusid == 2 || x.statusid == 3))
    this.approvalStatusApprover = this.approvalStatus.filter(x => (x.statusid == 4 || x.statusid == 5))

    console.log(this.loginuid);

    this.uservice.userRoleCheck(this.loginuid, this.budget).subscribe(
      (response) => {
        console.log(response);
        if (response != null) {
          this.urole = response.roleid;
        } else {
          this.urole = 0
        }
      }
    );

    this.ybForDialog = {

      balancebudgetamount: null!, companyid: null!, balancecarriedforwardforledger: null!,
      companyname: null!, financialyear: null!, isactive: null!, ledgeralias: null!, ledgerid: null!,
      sanctionedbudget: null!, usedbudgetamount: null!, yearlybudgetdetailsid: null!, yearlybudgetid: null!,
      yearlybudgetname: null!, yearlybudgetdetailshistoryid: null!, financialyearid: null!, financialyearname: null!
      , estimatedbudget: null!
    }
    this.ybDetail = {
      balancebudgetamount: null!, companyid: null!, balancecarriedforwardforledger: null!,
      companyname: null!, financialyear: null!, isactive: null!, ledgeralias: null!, ledgerid: null!,
      sanctionedbudget: null!, usedbudgetamount: null!, yearlybudgetdetailsid: null!, yearlybudgetid: null!,
      yearlybudgetname: null!, yearlybudgetdetailshistoryid: null!, financialyearid: null!, financialyearname: null!
      , estimatedbudget: null!

    }
    this.ybMaster = {
      balancebudgetamount: null!, companyid: null!, balancecarriedforwardforledger: null!,
      companyname: null!, financialyear: null!, isactive: null!, ledgeralias: null!, ledgerid: null!,
      sanctionedbudget: null!, usedbudgetamount: null!, yearlybudgetdetailsid: null!, yearlybudgetid: null!,
      yearlybudgetname: null!, yearlybudgetdetailshistoryid: null!, financialyearid: null!, financialyearname: null!
      , estimatedbudget: null!

    }
    this.newLedgerForDialog = {

      balancebudgetamount: null!, balancecarriedforwardforledger: null!,
      isactive: null!, ledgeralias: null!, ledgerid: null!,
      sanctionedbudget: null!, usedbudgetamount: null!, yearlybudgetdetailsid: null!
      , yearlybudgetdetailshistoryid: null!
      , estimatedbudget: null!
    }
    this.renderCurrentFinancialYear();
    this.renderYbMaster();
    this.renderCompanies();
    this.renderAllFinancialYear();
    console.log(this.yearlyDetails)

  }


  alertSaveBd() {
    Swal.fire({
      text: 'New Budget for the financial year added successfully!',
      icon: 'success'
    })
  }
  alertSaveBdLedger() {
    Swal.fire({
      text: 'New Estimated Budget added for the Ledger!',
      icon: 'success'
    })
  }
  alertSaveStatus() {
    Swal.fire({
      text: 'Budget Details has been updated',
      icon: 'success'
    })
  }

  renderCompanies(): void {
    this.voucherservice.getCompaniesByUser(this.loginuid)
      .subscribe({
        next: (data) => {
          this.companies = data.filter(s => s.isactive);
          console.log(data);
          this.retrieveLedgers(data[0].companyid);

        },
        error: (e) => console.error(e)
      });
  }

  companyChange(companyid: number) {

    this.retrieveLedgers(companyid);


  }
  retrieveLedgers(cid: number): void {


    this.yearlybudgetservice.getExpenseLedgers(cid)
      .subscribe({
        next: (data) => {
          let ctype = this.companies.find(x => x.companyid == cid).companytypeid;
          this.ledgers = data.filter(x => (x.companytype == ctype || x.companytype == 5));
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  renderAllFinancialYear() {
    this.yearlybudgetservice.getAllFy().subscribe(
      (response) => {
        console.log(response);
        this.allFy = response;

      }
    );
  }
  renderCurrentFinancialYear() {
    this.invoiceservice.getFinancialYearDetails().subscribe(
      (response) => {
        console.log(response);
        this.ybForDialog.financialyear = response.financialyearname;

      }
    );
  }
  renderYbMaster() {
    this.yearlybudgetservice.getYearlyBudgetMaster(this.loginuid).subscribe(
      (response) => {
        console.log(response);
        this.yb = response;

      }
    );
  }

  calculateSanctionedTotal(ledgerid: number) {

    let totalDebit = 0;
    if (this.ybDetails) {
      for (let groupDetail of this.ybDetails) {
        if (groupDetail.ledgerid === ledgerid) {
          totalDebit = totalDebit + groupDetail.sanctionedbudget;
        }
      }

    }
    return (totalDebit === 0) ? '' : totalDebit;

  }


  onView(budgetId: number, rowData: Yearlybudget) {

    this.yearlybudgetservice.getYearlyBudgetdetails(budgetId).subscribe(
      (response) => {
        console.log(response);
        console.log(rowData);
        this.ybDetails = response;
        this.ybName = rowData.yearlybudgetname;
        this.budgetdetailsdivog = true;
        this.backtoform = true;
        this.budgetform = false;
        this.budgetmasterdiv = false;
        this.comid = rowData.companyid;
        this.finanyear = rowData.financialyear;
        this.budgid = rowData.yearlybudgetid;
        this.retrieveLedgers(this.comid);


      }
    );
  }

  renderYbDetails() {
    this.yearlybudgetservice.getYearlyBudgetdetails(this.ybId).subscribe(
      (response) => {
        console.log(response);
        this.ybDetails = response;

      }
    );
  }


  saveYb() {
    this.isLoading = true;
    this.submitted = true;
    this.ybnameunique = true;
    if (this.yb != null) {
      for (let index = 0; index < this.yb.length; index++) {
        if (this.yb[index].yearlybudgetname == this.ybForDialog.yearlybudgetname.trim()) {
          this.ybnameunique = false;
          break;
        }
        else {
          this.ybnameunique = true;
        }
      }
    }
    if (this.ybnameunique) {
      this.ybMaster.createdby = this.loginuid;
      this.ybMaster.financialyear = this.allFy.find(x => x.financialyearid == this.ybForDialog.financialyearid).financialyearname;
      this.ybMaster.yearlybudgetname = this.ybForDialog.yearlybudgetname;
      this.ybMaster.companyid = this.ybForDialog.companyid;
      this.yearlybudgetservice.createYearlyBudget(this.ybMaster)
        .subscribe(data => {

          console.log(this.yearlyDetails);
          this.budgetdetailsdiv = false;
          this.budgetdetailsdivog = false;

          this.yearlybudgetservice.createYearlyBudgetDetails(data.yearlybudgetid, this.yearlyDetails)
            .subscribe(data => {
              this.isLoading = false;
              console.log(this.yearlyDetails);
              console.log(data);
              this.alertSaveBd();
              this.renderYbMaster();
              this.yearlyDetails = [];
            });
          this.isDirty = false;
        });


    }
  }

  saveYbDet() {
    this.ybDetail = new Yearlybudget();
    this.ybDetail.usedbudgetamount = 0;
    this.ybDetail.balancecarriedforwardforledger = 0;
    this.ybDetail.sanctionedbudget = 0;
    this.ybDetail.balancebudgetamount = 0;
    this.ybDetail.ledgerid = this.ybForDialog.ledgerid
    this.ybDetail.ledgeralias = this.ledgers.find(x => x.ledgerid == this.ybForDialog.ledgerid).ledgeralias;
    this.ybDetail.companyid = this.ybForDialog.companyid;
    this.ybDetail.financialyear = this.allFy.find(x => x.financialyearid == this.ybForDialog.financialyearid).financialyearname;
    this.ybDetail.createdby = this.loginuid;
    this.ybDetail.createddate = new Date();
    this.ybDetail.ledgerid = this.ybForDialog.ledgerid;
    this.ybDetail.estimatedbudget = this.ybForDialog.estimatedbudget;
    this.yearlyDetails.push(this.ybDetail);

    console.log(this.yearlyDetails);
    this.ybDetails = this.yearlyDetails;
    this.budgetdetailsdiv = true;

  }
  bnameChange() {

    this.ybnameunique = true;
    this.budgetdetailsdivog = false;


  }

  fyOnChange(finid: number) {

    // this.selectedFinancialname = this.allFy.find(x=>x.financialyearid == finid).financialyearname;
  }

  showHistory(row: Yearlybudget) {

    this.yearlybudgetservice.getYearlyBudgetdetailsHistory(row.yearlybudgetid, row.ledgerid).subscribe(
      (response) => {
        console.log(response);
        this.ybDetailsHist = response;
        this.historyDialog = true;

      }
    );
  }

  displayHDialog(row: Yearlybudget){
    this.historyofHistDialog = true;
    this.showHistoryofHistory(row);
  }

  showHistoryofHistory(row: Yearlybudget) {

    this.yearlybudgetservice.getYearlyBudgetHistofhistory(row.yearlybudgetdetailshistoryid).subscribe(
      (response) => {
        console.log(response);
        this.ybDetailsHistofHist = response;

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
  onRowEditSave(budgethid: number, row: Yearlybudget) {

    this.checkedby = (row.statusid == 2 || row.statusid == 3) ? this.loginuid : 0;
    this.approvedby = (row.statusid == 4 || row.statusid == 5) ? this.loginuid : 0;
    this.yearlybudgetservice.updateStatus(row.statusid, this.checkedby, this.approvedby, budgethid).subscribe(
      (response) => {
        console.log(response);
        this.yearlybudgetservice.updateBudgetDetailsandHistory(budgethid, row).subscribe(
          (responsehist) => {
            console.log(responsehist);
            this.yearlybudgetservice.getYearlyBudgetdetailsHistory(row.yearlybudgetid, row.ledgerid).subscribe(
              (response) => {
                console.log(response);
                this.ybDetailsHist = response;
                this.historyDialog = true;
                this.yearlybudgetservice.getYearlyBudgetdetails(row.yearlybudgetid).subscribe(
                  (response) => {
                    console.log(response);
                    this.ybDetails = response;

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

  addNewBudget() {

    this.budgetform = true;
    this.budgetmasterdiv = true;
    this.budgetdetailsdivog = false
    this.backtoform = false;
    this.ybForDialog = {

      balancebudgetamount: null!, companyid: null!, balancecarriedforwardforledger: null!,
      companyname: null!, financialyear: null!, isactive: null!, ledgeralias: null!, ledgerid: null!,
      sanctionedbudget: null!, usedbudgetamount: null!, yearlybudgetdetailsid: null!, yearlybudgetid: null!,
      yearlybudgetname: null!, yearlybudgetdetailshistoryid: null!, financialyearid: null!, financialyearname: null!
      , estimatedbudget: null!
    }

  }
  saveYbDetails() {
    this.isLoading = true;
    console.log(this.allFy);
    console.log(this.finanyear);
    this.newLedgerForDialog.financialyear = this.finanyear;
    this.newLedgerForDialog.companyid = this.comid;
    this.newLedgerForDialog.sanctionedbudget = 0;
    this.newLedgerForDialog.usedbudgetamount = 0;
    this.yearlyDetails.push(this.newLedgerForDialog);
    this.yearlybudgetservice.createYearlyBudgetDetails(this.budgid, this.yearlyDetails)
      .subscribe(data => {
        console.log(this.yearlyDetails);
        console.log(data);
        this.alertSaveBd();
        this.yearlybudgetservice.getYearlyBudgetdetails(this.budgid).subscribe(
          (response) => {
            console.log(response);
            this.ybDetails = response;
            this.isLoading = false;
            this.ngOnInit();
          }
        );
      });
    this.newLedgerDialog = false;
  }
  onLedgerAdd() {
    this.newLedgerForDialog = {

      balancebudgetamount: null!, balancecarriedforwardforledger: null!,
      isactive: null!, ledgeralias: null!, ledgerid: null!,
      sanctionedbudget: null!, usedbudgetamount: null!, yearlybudgetdetailsid: null!
      , yearlybudgetdetailshistoryid: null!
      , estimatedbudget: null!
    }
    this.newLedgerDialog = true;

    this.retrieveLedgers(this.comid);
  }

  eschange() {

    this.isDirty = true;
  }
  addRevise(data: any) {
    this.reviseForDialog = {
      revise: null!, additional: null!
    };
    this.yhid = data.yearlybudgetdetailshistoryid;
    this.yid = data.yearlybudgetid;
    this.ledid = data.ledgerid;
    this.sanc = data.sanctionedbudget;

    this.displayDialog = true;
  }

  addChange() {
    this.reviseForDialog.revise = 0;
  }

  revChange() {
    this.reviseForDialog.additional = 0;


  }

  saveRevise() {
    this.reviseForDialog.yearlybudgetdetailshistoryid = this.yhid;
    this.reviseForDialog.yearlybudgetid = this.yid;
    this.reviseForDialog.ledgerid = this.ledid;

    if (this.reviseForDialog.additional === 0 && this.reviseForDialog.revise > 0) {
      this.reviseForDialog.revise = +this.reviseForDialog.revise;
      this.reviseForDialog.sanctionedbudget = +this.reviseForDialog.revise;
      console.log(this.reviseForDialog);


    }
    if (this.reviseForDialog.revise === 0 && this.reviseForDialog.additional > 0) {
      var totalB = +this.sanc;
      var addB = +this.reviseForDialog.additional;
      this.reviseForDialog.additional = +this.reviseForDialog.additional;
      this.reviseForDialog.sanctionedbudget = totalB + addB;

      console.log(this.reviseForDialog);
    }
    this.yearlybudgetservice.updateBudgetDetailsandHistoryRevise(this.yhid, this.reviseForDialog).subscribe(
      (responsehist) => {
        console.log(responsehist);
        this.yearlybudgetservice.getYearlyBudgetdetailsHistory(this.yid, this.ledid).subscribe(
          (response) => {
            console.log(response);
            this.ybDetailsHist = response;
            this.historyDialog = true;
            this.yearlybudgetservice.getYearlyBudgetdetails(this.yid).subscribe(
              (response) => {
                console.log(response);
                this.ybDetails = response;

              }
            );
          }
        );
      }
    );
    this.alertSaveStatus();
    this.displayDialog = false;

  }
}
