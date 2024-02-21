import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { FileUploadsInfo } from 'src/app/models/file.model';
import { Fileuploadlist } from 'src/app/models/fileuploadlist';
import { Voucher } from 'src/app/models/voucher.model';
import { UsermasterService } from 'src/app/services/usermaster.service';
import { VoucherService } from 'src/app/services/voucher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pettycash',
  templateUrl: './pettycash.component.html',
  styleUrls: ['./pettycash.component.css']
})
export class PettycashComponent implements OnInit {
  selectedData: Voucher[] = [];
  filData: Voucher[] = [];

  pcashlist: Voucher[];
  pcashdialog!: Voucher;
  dateTime = new Date();
  viewablefile: Fileuploadlist = new Fileuploadlist();
  pdffile = false;
  imagefile = false;
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
  viewdisable = false;
  billdialog: boolean = false;
  vid: any;
  approvalStatus = [
    { statuspetty: "WITH HELD", statusid: 1 },
    { statuspetty: "BILLS RETURN", statusid: 2 },
    { statuspetty: "DISALLOWED", statusid: 3 },
    { statuspetty: "APPROVED", statusid: 4 },
    { statuspetty: "REJECT", statusid: 5 },
    { statuspetty: "MAKER APPROVED", statusid: 6 },
    { statuspetty: "CHECKER APPROVED", statusid: 7 },
  ];
  approvalStatusMaker: { statuspetty: string; statusid: number; }[];
  approvalStatusChecker: { statuspetty: string; statusid: number; }[];
  approvalStatusApprover: { statuspetty: string; statusid: number; }[];
  approvalStatusSadmin: { statuspetty: string; statusid: number; }[];

  //roles
  maker = GlobalConstants.maker;
  checker = GlobalConstants.checker;
  approver = GlobalConstants.approver;
  sadmin = GlobalConstants.sadmin;

  //module
  module = GlobalConstants.salesvoucher;

  loginuid: number = +sessionStorage.getItem("loginid");
  cidlogin: number = +sessionStorage.getItem("companyidlogin");

  urole: number = 0;
  hoUser: boolean;
  viewablefiles: boolean = true;
  voucherInfoArray: any;


  constructor(private uservice: UsermasterService, private voucherservice: VoucherService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.voucherInfoArray = [];
    this.approvalStatusChecker = this.approvalStatus.filter(x => (x.statusid != 5 && x.statusid != 4 && x.statusid != 6))
    this.approvalStatusMaker = this.approvalStatus.filter(x => (x.statusid != 5 && x.statusid != 4 && x.statusid != 7))
    this.approvalStatusApprover = this.approvalStatus.filter(x => (x.statusid == 4 || x.statusid == 5))
    this.approvalStatusSadmin = this.approvalStatus
    this.pcashdialog = new Voucher();
    this.dateTime.setDate(this.dateTime.getDate());

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

    this.voucherservice.getCompaniesByUser(this.loginuid)
      .subscribe({
        next: (data) => {

          console.log(data);
          if (data[0].companyid == 1) {
            this.hoUser = true;
            this.companies = data.filter(s => s.isactive);
          }
          else {
            this.hoUser = false;

            this.companies = data.filter(x => x.companyid == this.cidlogin && x.isactive == true);
          }
        }
      })


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



  retrievePc(): void {
    this.voucherservice.getVoucherPettyCash(this.pcashdialog.daybookfromdate, this.pcashdialog.daybooktodate)
      .subscribe({
        next: (data) => {
          if (this.hoUser) {
            this.pcashlist = data.filter(x => x.submit == true && x.companyid == this.pcashdialog.companyid);
          }
          else {
            this.pcashlist = data.filter(x => x.companyid == this.pcashdialog.companyid);

          }

          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  onSearch() {
    this.retrievePc();

  }
  onReset() {
    this.pcashdialog = new Voucher();

  }

  onOpenBillsDialog(row: any) {
    this.viewablefiles = row.submit == true ? false : true;
    this.vid = row.voucherdetailid;
    this.billdialog = true;
    this.fileInfos = this.voucherservice.getFiles(this.vid);
  }

  encChnge(row: any) {


  }



  onSubmit() {
    this.filData = [];
    if (this.selectedData.length === 0) {
      Swal.fire("Warning", "No Record has been selected");
    } else {
      this.filData = this.selectedData.filter(x=>x.submit!=true);
      console.log(this.selectedData.length)
      for (let i = 0; i < this.selectedData.length; i++) {
  
        if(this.selectedData[i].submit!=true)
        {
        this.selectedData[i].submit = true;
        console.log(this.selectedData[i])
        this.voucherservice.createVoucherPettycash(this.selectedData[i])
          .subscribe({
            next: (data) => {
              console.log(data);
              this.retrievePc();

            },
            error: (e) => console.error(e)
          });
        }

      }
      const sum =  this.filData
        .reduce((sum, current) => sum + current.amount, 0)

        console.log(sum);
           this.voucherForDialog = new Voucher();
        this.voucherForDialog.vouchertypeid = 4;
        this.voucherForDialog.voucherdate = new Date();
        this.voucherForDialog.companyid = this.pcashdialog.companyid;
        this.voucherForDialog.accounttypeid = 1;
        this.voucherForDialog.totaldebitamount = sum;
          this.voucherForDialog.totalcreditamount = sum;
          this.voucherForDialog.statusid=4
        this.voucherservice.create(this.voucherForDialog)
        .subscribe(data => {
          console.log(data)
          console.log(data.voucherid);
          this.voucherID = data.voucherid;
          this.voucherInfo = new Voucher();
          this.voucherInfo.ledgeralias = "APF - MISC. ADVANCES(IMPREST)(AP)";
          this.voucherInfo.debitledger = 15670;
          console.log(this.voucherInfo.debitledger);
          this.voucherInfo.debitamount = sum;
          this.voucherInfoArray.push(this.voucherInfo);

          this.voucherInfo = new Voucher();
          this.voucherInfo.ledgeralias = "BILLS TO HO (AP)";
          this.voucherInfo.creditledger = 15676;
          console.log(this.voucherInfo.creditledger);
          this.voucherInfo.creditamount = sum;
          this.voucherInfoArray.push(this.voucherInfo);

          console.log(this.voucherInfoArray);
          //switched to array    
          this.voucherservice.addVoucherdetails(data.voucherid, data.companyid, this.voucherInfoArray).subscribe(
            (datadetails) => { 
              console.log(datadetails);

            }
          );
        });
        this.alertSave();

    }



   

  }
  onSubmitHO() {

 console.log(this.selectedData)
 console.log(this.selectedData.length)
    if (this.selectedData.length == 0) {
      Swal.fire("Warning", "No Record has been selected");
    } else {

      for (let i = 0; i < this.selectedData.length; i++) {

        console.log(this.selectedData[i])
        if (this.selectedData[i].statusid != null && this.selectedData[i].statusid != 0) {
          this.selectedData[i].statuspetty = this.approvalStatus.find(x => x.statusid == this.selectedData[i].statusid).statuspetty;
        }
        else {
          this.selectedData[i].statusid = 0;
          this.selectedData[i].statuspetty = null;
        }
        console.log(this.selectedData[i])
        this.voucherservice.updVoucherPettycashStatus(this.selectedData[i].voucherdetailid, this.selectedData[i])
          .subscribe({
            next: (data) => {
              console.log(data);
              this.retrievePc();

            },
            error: (e) => console.error(e)
          });


      }
      this.alertSave();

    }


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
        this.fileUploadInfo.moduleid = +this.vid;
        this.voucherservice.SaveFileInfo(this.fileUploadInfo).subscribe({
          next: (data) => {

            form.clear();


          },
          error: (e) => console.error(e)
        });
        this.voucherservice.upload(this.currentFile, fileName).subscribe({
          next: (data) => {
            this.fileInfos = this.voucherservice.getFiles(this.vid);



          },
          error: (e) => console.error(e)
        });
      }

      //this.alertSaveFile();
    }


  }

  alertSaveFile() {
    Swal.fire({
      text: 'File has been uploaded successfully!',
      icon: 'success'
    })
  }
  alertSave() {
    Swal.fire({
      text: 'Saved Successfully!',
      icon: 'success'
    })
  }

  checktypeImage(filename): boolean {
   
    let file = filename.substr(filename.lastIndexOf('.') + 1)
    if (file == "png" || file == "jpg" || file == "jpeg" || file == "PNG"|| file == "JPG") {
      return true
    }
    return false;
  }


  checktypePdf(filename): boolean {
    
    let file = filename.substr(filename.lastIndexOf('.') + 1)
    if (file == "pdf" || file == "PDF") {
      this.pdffile = true;
      return true
    }
    return false;
  }



  viewDisable(file) {
    this.viewablefile = file;
    if (this.checktypePdf(this.viewablefile.filegeneratedname)) {
      this.pdffile = true;
      this.imagefile = false;
    }
    else if (this.checktypeImage(this.viewablefile.filegeneratedname)) {
      this.pdffile = false;
      this.imagefile = true;
    }
    console.log(this.viewablefile)
    this.viewdisable = true;
    console.log(this.pdffile + "PDF FILE")
    console.log(this.imagefile + "IMAGE FILE")

  }
}

