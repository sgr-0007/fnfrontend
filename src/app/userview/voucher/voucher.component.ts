import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Voucher } from 'src/app/models/voucher.model';
import { VoucherService } from 'src/app/services/voucher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css'],

})
export class VoucherComponent implements OnInit {
  vouchers : Voucher[] = [];

  companies : Voucher[] = [];

  selectedCompany!: Voucher;

  vouchertypes : Voucher[] = [];

  selectedVouchertype!: Voucher;


  displayDialog!: boolean;
  voucherForDialog!: Voucher;

   voucherID=0;

  first = 0;
  rows = 5;
  loading: boolean = true;
  dateTime = new Date();
  dateValue: Date;

  voucherDetails : Voucher[] = [];


  constructor(private voucherservice : VoucherService , private _router: Router) { }

  ngOnInit(): void {
    localStorage.setItem('vtype','vouchers')
    this.retrieveVouchers();
    this.retrieveCompanies();
    this.retrieveVouchertypes();
    this.dateTime.setDate(this.dateTime.getDate());
    console.log(new Date())
    // this.voucherForDialog.voucherdate = new Date();
    this.dateValue = new Date();
    this.dateValue.setMonth(this.dateValue.getMonth());
    

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
    return this.vouchers ? this.first === (this.vouchers.length - this.rows): true;
  }

  isFirstPage(): boolean {
    return this.vouchers ? this.first === 0 : true;
  }
  alertSave(){
    Swal.fire({
      text: 'Voucher saved successfully!',
      icon: 'success'})
  }

  retrieveCompanies(): void {
    this.voucherservice.getCompanies()
      .subscribe({
        next: (data) => {
          this.companies = data.filter(s => s.isactive);
           this.loading = false;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  retrieveVouchertypes(): void {
    this.voucherservice.getVoucherTypes(1)
      .subscribe({
        next: (data) => {
          this.vouchertypes = data;
           this.loading = false;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  retrieveVouchers(): void {
    this.voucherservice.getAll(1,0)
      .subscribe({
        next: (data) => {
          this.vouchers = data;
           this.loading = false;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  onVoucherAdd(){
    this.voucherForDialog = {
      companyname: null!, vouchertypename: null! , narration:null!
  };
    this.displayDialog = true;
  }
  onAddParticulars(id : number) {


  }
  saveVoucher(){
    console.log('Voucher Saved');

    console.log(this.selectedCompany.companyid)

    this.voucherForDialog.vouchernumber = "2022-2023-HO"+'-' + Math.floor(Math.random() * (1000 - 0 + 1)) + 0;;
    this.voucherForDialog.companyid = this.selectedCompany.companyid;
    this.voucherForDialog.vouchertypeid = this.selectedVouchertype.vouchertypeid;
     this.voucherForDialog.voucherdate = this.dateValue;
    console.log(this.voucherForDialog);
    this.voucherservice.create(this.voucherForDialog)
    .subscribe( data => {
      this.ngOnInit();
     console.log(data.voucherid);
     this.voucherID = data.voucherid;
     if (this.voucherID) {
      console.log(this.voucherID.toString());
      localStorage.setItem('vid',this.voucherID.toString());
      console.log(localStorage.getItem('vid'));
      this._router.navigate(["vouchers/0"])

  }
    });
    this.displayDialog = false;
   
  }

}
