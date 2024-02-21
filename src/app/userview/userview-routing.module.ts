import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupmasterComponent } from './groupmaster/groupmaster.component';
import { SalesledgerviewComponent } from './salesledgerview/salesledgerview.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserviewComponent } from './userview.component';
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
import { CompanymasterComponent } from './companymaster/companymaster.component';
import { NormalledgermasterComponent } from './normalledgermaster/normalledgermaster.component';
import { DaybookviewComponent } from './daybookview/daybookview.component';
import { DaybooktransactionComponent } from './daybooktransaction/daybooktransaction.component';
import { TrialbalancereportComponent } from './trialbalancereport/trialbalancereport.component';
import { CashbookComponent } from './cashbook/cashbook.component';
import { ProfitlossComponent } from './profitloss/profitloss.component';
import { UsermasterComponent } from './usermaster/usermaster.component';
import { GenerateInvoiceComponent } from './generate-invoice/generate-invoice.component';
import { ViewinvoiceComponent } from './viewinvoice/viewinvoice.component';
import { InvoicepaymentComponent } from './invoicepayment/invoicepayment.component';
import { PaymentviewComponent } from './paymentview/paymentview.component';
import { PaymentvoucherComponent } from './paymentvoucher/paymentvoucher.component';
import { YearlybudgetComponent } from './yearlybudget/yearlybudget.component';
import { LedgerviewComponent } from './ledgerview/ledgerview.component';
import { UnderdevelopmentComponent } from './underdevelopment/underdevelopment.component';
import { BalancesheetComponent } from './balancesheet/balancesheet.component';
import { UsermanagmentComponent } from './usermanagment/usermanagment.component';
import { BankreconcilationComponent } from './bankreconcilation/bankreconcilation.component';
import { BudgetComponent } from './budget/budget.component';
import { DirtycheckGuard } from '../guard/dirtycheck.guard';
import { PaymentrecieptComponent } from './paymentreciept/paymentreciept.component';
import { PaymentdisplayComponent } from './paymentdisplay/paymentdisplay.component';
import { PaymenteditComponent } from './paymentedit/paymentedit.component';
import { ItemmasterComponent } from './itemmaster/itemmaster.component';
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
import { CreditlimitsComponent } from './creditlimits/creditlimits.component';
import {      } from '../guard/authguard.guard';
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
import { Pettyreport1Component } from './pettyreport1/pettyreport1.component';
import { Pettyreport2Component } from './pettyreport2/pettyreport2.component';




const routes: Routes = [
  {path:'',component:UserviewComponent,
    children:[{path:'dashboard',component:DashboardComponent,canActivate:[    ]},
    { path: "userview/**",redirectTo:"login"},
    {path:'salesledger/view',component:SalesledgerviewComponent,canActivate:[ ]},
    { path: 'groups', component: GroupmasterComponent ,canActivate:[    ]},
    { path: 'subgroups', component: SubgroupmasterComponent ,canActivate:[    ]},
    { path: 'currency', component: CurrencymasterComponent ,canActivate:[    ]},
    { path: 'roles', component: RoleComponent ,canActivate:[    ]},
    {path:'purchaseledger/view',component:PurchaseviewComponent,canActivate:[    ]},
    {path:'paymentvouchers',component:PaymentvoucherComponent,canDeactivate:[DirtycheckGuard],canActivate:[    ]},
    {path: 'purchasevouchers', component: PurchasevoucherComponent,canDeactivate:[DirtycheckGuard],canActivate:[    ] },
    {path: 'contravouchers', component: ContravoucherComponent,canDeactivate:[DirtycheckGuard],canActivate:[    ] },
    {path: 'journalvouchers', component: JournalvoucherComponent,canDeactivate:[DirtycheckGuard] ,canActivate:[    ]},
    {path: 'receiptvouchers', component: ReceiptvoucherComponent,canDeactivate:[DirtycheckGuard],canActivate:[    ] },
    {path: 'salesvouchers', component: SalesvoucherComponent,canDeactivate:[DirtycheckGuard],canActivate:[    ]},
    {path:'salesledger',component: SalesledgerComponent,canDeactivate:[DirtycheckGuard],canActivate:[    ]},
    {path:'updatesalesledger',component: SalesledgerComponent,canDeactivate:[DirtycheckGuard],canActivate:[    ]}, 
    {path:'prucaheledger',component: SalesledgerComponent,canDeactivate:[DirtycheckGuard],canActivate:[    ]},
    { path: 'vouchers/:id', component: VoucherdetailsComponent ,canActivate:[    ]},
    { path: 'vouchers', component: VoucherComponent ,canActivate:[    ]},
    {path: 'company', component: CompanymasterComponent ,canActivate:[    ]},
    {path: 'normalledger', component: NormalledgermasterComponent ,canActivate:[    ]},
    {path: 'daybookview', component: DaybookviewComponent ,canActivate:[    ]},
    {path: 'daybooktransac', component: DaybooktransactionComponent ,canActivate:[    ]},
    {path: 'trailbalance', component: TrialbalancereportComponent ,canActivate:[    ]},
    {path: 'cashbook', component: CashbookComponent ,canActivate:[    ]},
     {path: 'usermaster', component: UsermasterComponent ,canActivate:[    ]},
     {path:'invoice/generate',component:GenerateInvoiceComponent,canActivate:[    ]},
     {path:'invoice',component:ViewinvoiceComponent,canActivate:[    ]},
     {path:'invoice/generate/:id',component:GenerateInvoiceComponent,canActivate:[    ]},
     {path:'invoice/payment',component:InvoicepaymentComponent,canActivate:[    ]},
     {path:'payment',component:PaymentviewComponent,canActivate:[    ]},
     {path:'ledgerview',component:LedgerviewComponent,canActivate:[    ]}, 
     {path:'underdev',component:UnderdevelopmentComponent,canActivate:[    ]}, 
     {path:'underdev',component:UnderdevelopmentComponent,canActivate:[    ]}, 
     {path:'profitloss',component:ProfitlossComponent,canActivate:[    ]}, 
     {path:'usermgnt',component:UsermanagmentComponent,canActivate:[    ]}, 
     { path: 'item', component: ItemmasterComponent ,canActivate:[    ]},
       {path:'invoice/generate',component:GenerateInvoiceComponent,canActivate:[    ]},
     {path:'invoice',component:ViewinvoiceComponent,canActivate:[    ]},
     {path:'invoice/generate/:id',component:GenerateInvoiceComponent,canActivate:[    ]},
     {path:'invoice/payment',component:InvoicepaymentComponent,canActivate:[    ]},
     {path:'payment',component:PaymentviewComponent,canActivate:[    ]},
     {path:'yearlybudget',component:YearlybudgetComponent,canActivate:[    ]},
     {path:'budget',component:BudgetComponent, canDeactivate:[DirtycheckGuard],canActivate:[    ]},
     {path:'ledgerview',component:LedgerviewComponent,canActivate:[    ]}, 
     {path:'balancesheet',component:BalancesheetComponent,canActivate:[    ]}, 
     {path:'usermanagment',component:UsermanagmentComponent,canActivate:[    ]},     
     {path:'bankreconcile',component:BankreconcilationComponent,canActivate:[    ]},
     {path:'payreciept',component:PaymentrecieptComponent,canActivate:[    ]},
      {path:'paydisplay',component:PaymentdisplayComponent,canActivate:[    ]},
     {path:'invoice/payment/:id',component:InvoicepaymentComponent,canActivate:[    ]},
      {path:'updatepayment/:id',component:PaymenteditComponent,canActivate:[    ]},
      {path:'groupreport',component:GroupreportComponent,canActivate:[    ]},
      {path:'voucherreport',component:VoucherreportComponent,canActivate:[    ]},
      { path: 'voucherreportview/:id', component: VoucherreportviewComponent ,canActivate:[    ]},
      {path:'cashbookreport',component:CashbookreportviewComponent,canActivate:[    ]},
      {path:'voucherlistreport',component:VoucherlistreportviewComponent,canActivate:[    ]},
      {path:'trailbalanceviewreport',component:TrailbalancereportviewComponent,canActivate:[    ]},
      {path:'ieviewreport',component:IncomeexpensereportviewerComponent,canActivate:[    ]},
      {path:'otherreport',component:OtherreportsComponent,canActivate:[    ]},
      {path:'bsreport',component:BsreportComponent,canActivate:[    ]},
      {path:'invoicereport',component:InvoicereportComponent,canActivate:[    ]},
      {path:'invoicetrans',component:InvoicetransformationComponent,canActivate:[    ]},
      {path:'ledgertrans',component:BuyertransformationComponent,canActivate:[    ]},
      {path:'cbledgerreport',component:CbledgerreportComponent,canActivate:[    ]},
      {path:'drnote',component:DrnotevoucherComponent,canActivate:[    ]},
      {path:'crnote',component:CrnotevoucherComponent,canActivate:[    ]},
      {path:'creditlimit',component:CreditlimitsComponent,canActivate:[    ]},
      {path:'tbwosch',component:TbwoschComponent,canActivate:[    ]},
      {path:'iesch',component:IeschComponent,canActivate:[    ]},
      {path:'opbalance',component:OpeningbalancemasterComponent,canActivate:[    ]},
      {path:'bssch',component:BsschComponent,canActivate:[    ]},
      {path:'gstr3b',component:Gstr3bComponent,canActivate:[    ]},
      {path:'gstr7',component:Gstr7Component,canActivate:[    ]},
      {path:'subledger',component:SubledgermasterComponent,canActivate:[    ]},
      {path:'tdsview',component:TdsviewComponent,canActivate:[    ]},
      {path:'tdsreport',component:TdsreportComponent,canActivate:[    ]},
      {path:'growertrans',component:GrowertransComponent,canActivate:[    ]},
      {path:'salesnotetrans',component:SalenotetransComponent,canActivate:[    ]},
      {path:'payreconview1',component:Payreconview1Component,canActivate:[    ]},
      {path:'gstitview',component:GstitviewComponent,canActivate:[    ]}, 
      {path:'tbsubledger',component:TbsubledgerComponent,canActivate:[    ]},  
      {path:'recbc',component:RecbcoverComponent,canActivate:[    ]},  
      {path:'paybc',component:PaybcoverComponent,canActivate:[    ]},  
      {path:'bcrec/:id',component:BankcoverreportviewComponent,canActivate:[    ]},  
      {path:'bcpay/:id',component:BankcoverreportviewpaymentComponent,canActivate:[    ]},  
      {path:'payreconview2',component:Payreconview2Component,canActivate:[    ]}, 
      {path:'pensioner',component:PensionerComponent,canActivate:[    ]}, 
      {path:'pensionerfam',component:PensionerfamComponent,canActivate:[    ]}, 
      {path:'emp',component:EmployeeComponent,canActivate:[    ]}, 
      {path:'bcpayb/:id',component:BankcoverreportviewpaymentbComponent,canActivate:[    ]},  
      {path:'branchinfavour',component:BranchinfavourComponent,canActivate:[    ]}, 
      {path:'bcpayc/:id',component:BankcoverreportviewpaymentcComponent,canActivate:[    ]},  
      {path:'receipts/:id',component:ReceiptsComponent,canActivate:[    ]},  
      {path:'pettycash',component:PettycashComponent,canActivate:[    ]}, 
       {path:'pettyreport1',component:Pettyreport1Component,canActivate:[    ]}, 
       {path:'pettyreport2',component:Pettyreport2Component,canActivate:[    ]}, 

      
  ]    
},
  
  
 
 
  
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserviewRoutingModule { }
