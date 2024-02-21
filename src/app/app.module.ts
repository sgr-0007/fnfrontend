import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupmasterComponent } from './userview/groupmaster/groupmaster.component';
import {TableModule} from 'primeng/table';
import { ButtonModule } from "primeng/button";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';
import { VoucherComponent } from './userview/voucher/voucher.component';
import {CalendarModule} from 'primeng/calendar';
import { CurrencymasterComponent } from './userview/currencymaster/currencymaster.component';
import { RoleComponent } from './userview/role/role.component';
import { SubgroupmasterComponent } from './userview/subgroupmaster/subgroupmaster.component';
import { VoucherdetailsComponent } from './userview/voucherdetails/voucherdetails.component';
import {FileUploadModule} from 'primeng/fileupload';
import { SalesvoucherComponent } from './userview/salesvoucher/salesvoucher.component';
import { PurchasevoucherComponent } from './userview/purchasevoucher/purchasevoucher.component';
import { ContravoucherComponent } from './userview/contravoucher/contravoucher.component';
import { DashboardComponent } from './userview/dashboard/dashboard.component';
import { JournalvoucherComponent } from './userview/journalvoucher/journalvoucher.component';
import { ReceiptvoucherComponent } from './userview/receiptvoucher/receiptvoucher.component';
import { SalesledgerComponent } from './userview/salesledger/salesledger.component';
import {MatCardModule} from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {MatListModule} from '@angular/material/list';
import { SalesledgerviewComponent } from './userview/salesledgerview/salesledgerview.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import { PurchaseviewComponent } from './userview/purchaseview/purchaseview.component';
import { FilesuploadComponent } from './userview/filesupload/filesupload.component';
import { LoginComponent } from './components/login/login.component';
import { UserviewComponent } from './userview/userview.component';
import { UserviewModule } from './userview/userview.module';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableExporterModule} from  'mat-table-exporter';
import { LoginresetComponent } from './components/loginreset/loginreset.component';
// import { UniqueMobileNumberDirective } from './customdirective/unique-mobile-number.directive';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginresetComponent,
    // UniqueMobileNumberDirective
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    TableModule,
    ButtonModule,
    BrowserAnimationsModule,
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
    UserviewModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
