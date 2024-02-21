import { ChangeDetectorRef, Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesledgerService } from 'src/app/services/salesledger.service';
import { Saleview } from 'src/app/models/saleview';
import { VoucherService } from 'src/app/services/voucher.service';
import { Fileuploadlist } from 'src/app/models/fileuploadlist';
import { BankserviceService } from 'src/app/services/bankservice.service';
import { Ledgerbankdetails } from 'src/app/models/ledgerbankdetails';
@Component({
  selector: 'app-ledgerview',
  templateUrl: './ledgerview.component.html',
  styleUrls: ['./ledgerview.component.css']
})

export class LedgerviewComponent implements OnInit {
  filename;
  pdffile=false;
  imagefile=false;
  viewablefile:Fileuploadlist=new Fileuploadlist();
  ledgerview:Saleview=new Saleview();
  bankLedgerDetails:Array<Ledgerbankdetails>=[];
  filelist:Array<Fileuploadlist>=[];
  constructor(private _route:Router,
    private voucherservice: VoucherService,
     private _arouter:ActivatedRoute,
     private bankservice:BankserviceService,
     private _saleLedgerService:SalesledgerService,
     private changeDetector: ChangeDetectorRef) { }
     viewdisable=false;
  ngOnInit(): void {
    let id;
    console.log(id=this._arouter.snapshot.paramMap.get('queryParams'))
    console.log(this.ledgerview=JSON.parse(id))
    this.getExistingFile()
    this.getextradetails()
    this.getbankdetails()

  }
  getbankdetails() {
    this.bankservice.getBankDetailsByledgerid(this.ledgerview.ledgerId).subscribe(
      (resposne)=>{
  
  this.bankLedgerDetails=resposne;
        console.log(this.ledgerview);
        
    });
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }
  back(){
    if(this.ledgerview.underGroup==='sales'){
    this._route.navigate(['salesledger/view']);}
    else{
      this._route.navigate(['purchaseledger/view'])
    }
  }

  checktypeImage(filename):boolean{
      
      let file=filename.substr(filename.lastIndexOf('.')+1)
      if(file=="png"||file=="PNG"||file=="jpg"||file=="JPG"||file=="jpeg"||file=="JPEG"){
        
        
        return true
      }
      return false;
  }


  checktypePdf(filename):boolean{
    
    let file=filename.substr(filename.lastIndexOf('.')+1)
    
    if(file=="pdf"||file=='PDF'){
      this.pdffile=true;
      return true
      
    }
    return false;
}

  getextradetails(){
    this._saleLedgerService.getSalesLedgerDetailsById(this.ledgerview.ledgerId).subscribe((response)=>{
      /* this.ledgerview.address1=response.address1;
      this.ledgerview.address2=response.address2;
      this.ledgerview.bankName=response.bankName;
      this.ledgerview.bankAccountNumber=response.bankAccountNumber;
      this.ledgerview.ifscCode=response.ifscCode;
      this.ledgerview.bankAddress=response.bankAddress; */


    })
  }

  getExistingFile(){
    
    this.voucherservice.getFiles(this.ledgerview.ledgerId).subscribe(
      (response)=>{
        console.log(response);
        if(response!=null)
        this.filelist=response;
      }
    )
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
  


}
