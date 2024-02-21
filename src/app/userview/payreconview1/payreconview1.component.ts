import { Component, OnInit } from '@angular/core';
import { Salenotereconcile } from 'src/app/models/salenotereconcile.model';
import { Voucher } from 'src/app/models/voucher.model';
import { VoucherService } from 'src/app/services/voucher.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payreconview1',
  templateUrl: './payreconview1.component.html',
  styleUrls: ['./payreconview1.component.css']
})
export class Payreconview1Component implements OnInit {
  salenotes: Salenotereconcile[];
  voucherInfoArray: Voucher[];
  daybookForDialog!: Salenotereconcile;

  first = 0;
  rows = 10;
  voucherForDialog!: Voucher;
  voucherID: any;
  myDate = new Date();
  selectedVoucher: Voucher[];
  cid: number;
  voucherInfo: Voucher;
  debitledgersnofilter: Voucher[];
  selectedData: Salenotereconcile[] = [];
  dateTime = new Date();
  companies: Voucher[];

  constructor(private voucherservice: VoucherService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.daybookForDialog = {
      salenotedate: null!, companyid: null!
  };
    this.voucherInfoArray = [];
    this.dateTime.setDate(this.dateTime.getDate());

    this.retrieveSaleNotes();
    this.retrieveCompanies();

    this.voucherservice.getDrLedgers()
      .subscribe({
        next: (data) => {
          this.debitledgersnofilter = data;
          console.log(this.debitledgersnofilter);
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

  retrieveCompanies(): void {
    this.voucherservice.getCompanies()
      .subscribe({
        next: (data) => {
          this.companies = data.filter(s => s.isactive);
          
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  retrieveSaleNotes(): void {
    this.voucherservice.getAllPaymentRecon(this.daybookForDialog.salenotedate,this.daybookForDialog.companyid)
      .subscribe({
        next: (data) => {
          this.salenotes = data;
          console.log(data); 
        },
        error: (e) => console.error(e)
      });
  }
  savePayment(recdata: Salenotereconcile) {
    this.voucherForDialog = new Voucher();
    this.voucherservice.getVoucherinfo(recdata.voucherid)
      .subscribe({
        next: (vidata) => {
          this.selectedVoucher = vidata;
          console.log(vidata)
          this.cid = this.selectedVoucher[0].companyid;


          this.voucherForDialog.vouchertypeid = 1;
          this.voucherForDialog.voucherdate = this.myDate;
          this.voucherForDialog.companyid = this.cid;
          this.voucherForDialog.accounttypeid = this.selectedVoucher[0].accounttypeid;
          console.log(this.voucherForDialog);
          this.voucherForDialog.statusid=4;

          this.voucherservice.create(this.voucherForDialog)
            .subscribe(data => {
              console.log(data.voucherid);
              this.voucherID = data.voucherid;
              this.voucherInfo = new Voucher();
              this.voucherInfo.ledgeralias = this.debitledgersnofilter.find(x => x.drledgername == recdata.growername).drledgeralias;
              this.voucherInfo.debitledger = this.debitledgersnofilter.find(x => x.drledgername == recdata.growername).debitledger;
              console.log(this.voucherInfo.debitledger);
              this.voucherInfo.debitamount = recdata.netamount;
              this.voucherInfoArray.push(this.voucherInfo);

              this.voucherInfo = new Voucher();
              this.voucherInfo.ledgeralias = recdata.bankname;
              this.voucherInfo.creditledger = recdata.bankid;
              console.log(this.voucherInfo.creditledger);
              this.voucherInfo.creditamount = recdata.netamount;
              this.voucherInfoArray.push(this.voucherInfo);

              console.log(this.voucherInfoArray);

              //switched to array    
              this.voucherservice.addVoucherdetails(data.voucherid, data.companyid, this.voucherInfoArray).subscribe(
                (datadetails) => {
                  console.log(datadetails);

                }
              );
              this.voucherservice.updatePaymentRecon(recdata.srid)
                .subscribe(data => {
                });
              this.voucherForDialog.totaldebitamount = recdata.netamount;
              this.voucherForDialog.totalcreditamount = recdata.netamount;

              this.voucherservice.updateVoucherAmount(this.voucherID, this.voucherForDialog)
                .subscribe(data => {
                  this.ngOnInit();


                });



            });

        }
      });




  }


  async approveSelected() {
    if (this.selectedData.length == 0) {
      Swal.fire("Warning", "No Record has been selected");
    } else {

      for (let i = 0; i < this.selectedData.length; i++) {
        this.savePayment(this.selectedData[i]);
        await this.sleep(6000);


      }
     
        Swal.fire("Success", "Approved successfully");
      
    }


  }

  sleep(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onSearch(){
this.retrieveSaleNotes();


  }
  onReset(){
    this.daybookForDialog = {
      salenotedate: null!, companyid: null!
  };
  }
}
