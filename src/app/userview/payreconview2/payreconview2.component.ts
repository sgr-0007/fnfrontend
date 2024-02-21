import { Component, OnInit } from '@angular/core';
import { Salenotereconcile } from 'src/app/models/salenotereconcile.model';
import { Voucher } from 'src/app/models/voucher.model';
import { VoucherService } from 'src/app/services/voucher.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { FileUploadsInfo } from 'src/app/models/file.model';

@Component({ 
  selector: 'app-payreconview2',
  templateUrl: './payreconview2.component.html',
  styleUrls: ['./payreconview2.component.css']
})
export class Payreconview2Component implements OnInit {
  salenotes: Salenotereconcile[];
    voucherInfoArray: Voucher[];
    daybookForDialog!: Salenotereconcile;
    dateTime = new Date();

  first = 0;
  rows = 10;
  voucherForDialog!: Voucher;
  voucherID: any;
  myDate = new Date();
  selectedVoucher: Voucher[];
  cid: number;
  voucherInfo: Voucher;
  debitledgersnofilter: Voucher[];
  fileInfos?: Observable<any>;
  selectedFiles?: FileList;
  currentFile?: File;
  fileUploads: FileUploadsInfo[] = [];
  fileUploadInfo: FileUploadsInfo = {
    fileuploadid: 0,
    filedisplayname: undefined,
    filegeneratedname: undefined,
    filemoduletype: 0,
    moduleid: 0
  };
  companies: Voucher[];


  constructor(private voucherservice: VoucherService,private datePipe: DatePipe) { }
 
  ngOnInit(): void {
    this.voucherInfoArray = [];
    this.daybookForDialog = {
      salenotedate: null!, companyid: null!
  };
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


  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }



  retrieveSaleNotes(): void {
    this.voucherservice.getAllPaymentReconFailed(this.daybookForDialog.salenotedate,this.daybookForDialog.companyid)
      .subscribe({
        next: (data) => {
          this.salenotes = data; 
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  savePaymentFailure(recdata : Salenotereconcile){
    this.voucherForDialog = new Voucher();
    this.voucherservice.getVoucherinfo(recdata.voucherid)
    .subscribe({
      next: (vidata) => { 
        this.selectedVoucher = vidata; 
        console.log(vidata)   
        this.cid =  this.selectedVoucher[0].companyid;


        this.voucherForDialog.vouchertypeid = 3;
        this.voucherForDialog.voucherdate = this.myDate; 
        this.voucherForDialog.companyid =   this.cid;
        this.voucherForDialog.accounttypeid = this.selectedVoucher[0].accounttypeid;
        this.voucherForDialog.statusid=4
        console.log(this.voucherForDialog);
      
      
        this.voucherservice.create(this.voucherForDialog)
          .subscribe(data => {
            console.log(data.voucherid);
            this.voucherID = data.voucherid; 
          

            this.voucherInfo = new Voucher();
            this.voucherInfo.ledgeralias =recdata.bankname;
            this.voucherInfo.debitledger = recdata.bankid;
            console.log(this.voucherInfo.debitledger);
            this.voucherInfo.debitamount = recdata.netamount;
            this.voucherInfoArray.push(this.voucherInfo);

            this.voucherInfo = new Voucher();
            this.voucherInfo.ledgeralias = "OTHER LIABILITIES - UNENCASHED GROWER PAYMENTS - (AP)";
            this.voucherInfo.creditledger =15567;
            this.voucherInfo.narrationcr =this.debitledgersnofilter.find(x=>x.drledgername==recdata.growername).drledgeralias+"-"+recdata.failureremarks;

            console.log(this.voucherInfo.creditledger);
            this.voucherInfo.creditamount = recdata.netamount;
            this.voucherInfoArray.push(this.voucherInfo);

            console.log(this.voucherInfoArray);

            //switched to array    
            this.voucherservice.addVoucherdetails(data.voucherid,data.companyid, this.voucherInfoArray).subscribe(
              (datadetails) => {
                console.log(datadetails);     
    
                }           
            ); 
            this.voucherservice.updatePaymentReconFailed(recdata.srid)
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




    savePaymentSuccess(recdata : Salenotereconcile){
      this.voucherForDialog = new Voucher();
      this.voucherservice.getVoucherinfo(recdata.voucherid)
      .subscribe({
        next: (vidata) => {  
          this.selectedVoucher = vidata; 
          console.log(vidata)   
          this.cid =  this.selectedVoucher[0].companyid;
  
  
          this.voucherForDialog.vouchertypeid = 1;
          this.voucherForDialog.voucherdate = this.myDate; 
          this.voucherForDialog.companyid =   this.cid;
          this.voucherForDialog.accounttypeid = this.selectedVoucher[0].accounttypeid;
          console.log(this.voucherForDialog);
          this.voucherForDialog.statusid=4
        
          this.voucherservice.create(this.voucherForDialog)
            .subscribe(data => {
              console.log(data.voucherid);
              this.voucherID = data.voucherid; 
            
  
              this.voucherInfo = new Voucher();
              this.voucherInfo.ledgeralias ="OTHER LIABILITIES - UNENCASHED GROWER PAYMENTS - (AP)";
              this.voucherInfo.debitledger = 15567;
              this.voucherInfo.narrationdr =this.debitledgersnofilter.find(x=>x.drledgername==recdata.growername).drledgeralias+"-"+recdata.failureremarks;

              console.log(this.voucherInfo.debitledger);
              this.voucherInfo.debitamount = recdata.netamount;
              this.voucherInfoArray.push(this.voucherInfo);
  
              this.voucherInfo = new Voucher();
              this.voucherInfo.ledgeralias = recdata.bankname;
              this.voucherInfo.creditledger =recdata.bankid;

              console.log(this.voucherInfo.creditledger);
              this.voucherInfo.creditamount = recdata.netamount;
              this.voucherInfoArray.push(this.voucherInfo);
  
              console.log(this.voucherInfoArray);
  
              //switched to array    
              this.voucherservice.addVoucherdetails(data.voucherid,data.companyid, this.voucherInfoArray).subscribe(
                (datadetails) => {
                  console.log(datadetails);     
      
                  }           
              ); 
              this.voucherservice.updatePaymentReconSuccess(recdata.srid)
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



      myUploader(event: any, form) {
        if (event.files[0]) {
          const file: File | null = event.files[0];
          if (file) {
            var timestamp = new Date().toISOString().replace(/[-:.]/g, "");
            var random = ("" + Math.random()).substring(2, 8);
            var fileName = file.name;
            this.currentFile = file;           
            this.voucherservice.uploadPaymentFailureFile(this.currentFile, fileName).subscribe({
              next: (data) => {
                this.ngOnInit();
                form.clear();

    
    
              },
              error: (e) => console.error(e)
            });
          }
    
          this.alertSaveFile();
        }
    
      }


      alertSaveFile() {
        Swal.fire({
          text: 'File has been read successfully!',
          icon: 'success'
        })
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
