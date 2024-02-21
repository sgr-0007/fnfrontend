import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UserviewRoutingModule } from './userview-routing.module';
import { UserviewComponent } from './userview.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './mainstructure/header/header.component';
import { SidebarComponent } from './mainstructure/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupmasterComponent } from './groupmaster/groupmaster.component';
import { RouterModule } from '@angular/router';
import { SalesledgerviewComponent } from './salesledgerview/salesledgerview.component';
import { SubgroupmasterComponent } from './subgroupmaster/subgroupmaster.component';
import { CurrencymasterComponent } from './currencymaster/currencymaster.component';
import { RoleComponent } from './role/role.component';
import { PurchaseviewComponent } from './purchaseview/purchaseview.component';
import { PurchasevoucherComponent } from './purchasevoucher/purchasevoucher.component';
import { ContravoucherComponent } from './contravoucher/contravoucher.component';
import { JournalvoucherComponent } from './journalvoucher/journalvoucher.component';
import { ReceiptvoucherComponent } from './receiptvoucher/receiptvoucher.component';
import { SalesvoucherComponent } from './salesvoucher/salesvoucher.component';
import { SalesledgerComponent } from './salesledger/salesledger.component';
import { VoucherdetailsComponent } from './voucherdetails/voucherdetails.component';
import { VoucherComponent } from './voucher/voucher.component';
import { FilesuploadComponent } from './filesupload/filesupload.component';
import { CompanymasterComponent } from './companymaster/companymaster.component';
import { NormalledgermasterComponent } from './normalledgermaster/normalledgermaster.component';
import { DaybookviewComponent } from './daybookview/daybookview.component';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableExporterModule} from  'mat-table-exporter';
import {ToastModule} from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DaybooktransactionComponent } from './daybooktransaction/daybooktransaction.component';
import { TrialbalancereportComponent } from './trialbalancereport/trialbalancereport.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import { CashbookComponent } from './cashbook/cashbook.component';
import { ProfitlossComponent } from './profitloss/profitloss.component';
import { UsermasterComponent } from './usermaster/usermaster.component';


import {Steps, StepsModule} from 'primeng/steps';
import {MenuModule} from 'primeng/menu'
import { MatNativeDateModule } from '@angular/material/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumber, InputNumberModule } from 'primeng/inputnumber';
import {CheckboxModule} from 'primeng/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {ListboxModule} from 'primeng/listbox';
import { ViewinvoiceComponent } from './viewinvoice/viewinvoice.component';
import { InvoicepaymentComponent } from './invoicepayment/invoicepayment.component';
import { PaymentviewComponent } from './paymentview/paymentview.component';
import { GenerateInvoiceComponent } from './generate-invoice/generate-invoice.component';
import { PaymentvoucherComponent } from './paymentvoucher/paymentvoucher.component';
import { YearlybudgetComponent } from './yearlybudget/yearlybudget.component';
import { LedgerviewComponent } from './ledgerview/ledgerview.component';
import { UnderdevelopmentComponent } from './underdevelopment/underdevelopment.component';
import { BalancesheetComponent } from './balancesheet/balancesheet.component';
import { UsermanagmentComponent } from './usermanagment/usermanagment.component';
import { BankreconcilationComponent } from './bankreconcilation/bankreconcilation.component';
import { BudgetComponent } from './budget/budget.component';
import { PaymentdisplayComponent } from './paymentdisplay/paymentdisplay.component';
import { PaymentrecieptComponent } from './paymentreciept/paymentreciept.component';
import { PaymenteditComponent } from './paymentedit/paymentedit.component';
import { ItemmasterComponent } from './itemmaster/itemmaster.component';
import { NgxDocViewerComponent, NgxDocViewerModule } from 'ngx-doc-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { GroupreportComponent } from './groupreport/groupreport.component';
import { VoucherreportComponent } from './voucherreport/voucherreport.component';
import { VoucherreportviewComponent } from './voucherreportview/voucherreportview.component';
import { CashbookreportviewComponent } from './cashbookreportview/cashbookreportview.component';
import { VoucherlistreportviewComponent } from './voucherlistreportview/voucherlistreportview.component';
import { TrailbalancereportviewComponent } from './trailbalancereportview/trailbalancereportview.component';
import { IncomeexpensereportviewerComponent } from './incomeexpensereportviewer/incomeexpensereportviewer.component';
import { OtherreportsComponent } from './otherreports/otherreports.component';
import { BsreportComponent } from './bsreport/bsreport.component';
import { InvoicereportComponent } from './invoicereport/invoicereport.component';
import { InvoicetransformationComponent } from './invoicetransformation/invoicetransformation.component';
import { BuyertransformationComponent } from './buyertransformation/buyertransformation.component';
import { CbledgerreportComponent } from './cbledgerreport/cbledgerreport.component';
import { DrnotevoucherComponent } from './drnotevoucher/drnotevoucher.component';
import { CrnotevoucherComponent } from './crnotevoucher/crnotevoucher.component';
import { Creditlimit } from '../models/creditlimit';
import { CreditlimitsComponent } from './creditlimits/creditlimits.component';
import { TbwoschComponent } from './tbwosch/tbwosch.component';
import { IeschComponent } from './iesch/iesch.component';
import { OpeningbalancemasterComponent } from './openingbalancemaster/openingbalancemaster.component';
import { BsschComponent } from './bssch/bssch.component';
import { Gstr3bComponent } from './gstr3b/gstr3b.component';
import { Gstr7Component } from './gstr7/gstr7.component';
import { SubledgermasterComponent } from './subledgermaster/subledgermaster.component';
import { TdsviewComponent } from './tdsview/tdsview.component';
import { TdsreportComponent } from './tdsreport/tdsreport.component';
import { GrowertransComponent } from './growertrans/growertrans.component';
import { SalenotetransComponent } from './salenotetrans/salenotetrans.component';
import { Payreconview1Component } from './payreconview1/payreconview1.component';
import { GstitviewComponent } from './gstitview/gstitview.component';
import { TbsubledgerComponent } from './tbsubledger/tbsubledger.component';
import { RecbcoverComponent } from './recbcover/recbcover.component';
import { PaybcoverComponent } from './paybcover/paybcover.component';
import { BankcoverreportviewComponent } from './bankcoverreportview/bankcoverreportview.component';
import { BankcoverreportviewpaymentComponent } from './bankcoverreportviewpayment/bankcoverreportviewpayment.component';
import { Payreconview2Component } from './payreconview2/payreconview2.component';
import { PensionerComponent } from './pensioner/pensioner.component';
import { PensionerfamComponent } from './pensionerfam/pensionerfam.component';
import { EmployeeComponent } from './employee/employee.component';
import { BankcoverreportviewpaymentbComponent } from './bankcoverreportviewpaymentb/bankcoverreportviewpaymentb.component';
import { BranchinfavourComponent } from './branchinfavour/branchinfavour.component';
import { BankcoverreportviewpaymentcComponent } from './bankcoverreportviewpaymentc/bankcoverreportviewpaymentc.component';
import { ReceiptsComponent } from './receipts/receipts.component';
import { PettycashComponent } from './pettycash/pettycash.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { Pettyreport1Component } from './pettyreport1/pettyreport1.component';
import { Pettyreport2Component } from './pettyreport2/pettyreport2.component';

 
@NgModule({
  declarations: [
    
    UserviewComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    SalesledgerviewComponent,
    GroupmasterComponent,
    SubgroupmasterComponent,
    CurrencymasterComponent,
    RoleComponent,
    PurchaseviewComponent,
    PurchasevoucherComponent,
    ContravoucherComponent,
    JournalvoucherComponent,
    ReceiptvoucherComponent,
    SalesvoucherComponent,
    SalesledgerComponent,
    VoucherdetailsComponent,
    VoucherComponent,
    FilesuploadComponent, 
    CompanymasterComponent,
    NormalledgermasterComponent,
    DaybookviewComponent,
    DaybooktransactionComponent,
    TrialbalancereportComponent,
    CashbookComponent,
    ProfitlossComponent,  
    UsermasterComponent,
    ViewinvoiceComponent,
     InvoicepaymentComponent, 
     PaymentviewComponent,
   GenerateInvoiceComponent,
   PaymentvoucherComponent,
   YearlybudgetComponent,
   LedgerviewComponent,
   UnderdevelopmentComponent,
   BalancesheetComponent,
   UsermanagmentComponent,
   BankreconcilationComponent,
   BudgetComponent,
   ItemmasterComponent, 
   
   PaymentrecieptComponent,
   PaymentdisplayComponent,
  PaymenteditComponent,
  GroupreportComponent,
  VoucherreportComponent,
  VoucherreportviewComponent,
  CashbookreportviewComponent,
  VoucherlistreportviewComponent,
  TrailbalancereportviewComponent,
  IncomeexpensereportviewerComponent,
  OtherreportsComponent,
  BsreportComponent,
  InvoicereportComponent,
  InvoicetransformationComponent,
  BuyertransformationComponent,
  CbledgerreportComponent,
  DrnotevoucherComponent,
  CrnotevoucherComponent ,
  CreditlimitsComponent,
  TbwoschComponent,
  IeschComponent,
  OpeningbalancemasterComponent,
  BsschComponent,
  Gstr3bComponent,
  Gstr7Component,
  SubledgermasterComponent,
  TdsviewComponent,
  TdsreportComponent,
  GrowertransComponent,
  SalenotetransComponent,
  Payreconview1Component,
  GstitviewComponent,
  TbsubledgerComponent,
  RecbcoverComponent,
  PaybcoverComponent,
  BankcoverreportviewComponent,
  BankcoverreportviewpaymentComponent,
  Payreconview2Component,
  PensionerComponent,
  PensionerfamComponent,
  EmployeeComponent,
  BankcoverreportviewpaymentbComponent,
  BranchinfavourComponent,
  BankcoverreportviewpaymentcComponent,
  ReceiptsComponent,
  PettycashComponent,
  Pettyreport1Component,
  Pettyreport2Component 
  ],
  imports: [
    CommonModule,
    UserviewRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextareaModule,
    DropdownModule,
    CalendarModule,
    FileUploadModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatRadioModule,
    MatStepperModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTableExporterModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatMenuModule,
    ToastModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    StepsModule,
    MenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    InputTextModule,
    InputNumberModule,
    CheckboxModule,
    ListboxModule,
    NgxDocViewerModule,
    PdfViewerModule,
    ScrollPanelModule,
    InputSwitchModule
    
  ],
  providers: [MatDatepickerModule,DatePipe],
  bootstrap: [UserviewComponent]
})
export class UserviewModule { }  
