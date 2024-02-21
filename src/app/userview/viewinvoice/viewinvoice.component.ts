import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild, ɵwhenRendered } from '@angular/core';
import { Invoicedetails } from 'src/app/models/invoicedetails';
import { InvoiceserviceService } from 'src/app/services/invoiceservice.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { Itemsdetails } from 'src/app/models/itemsdetails';
import { Router } from '@angular/router';
import { UsermasterService } from 'src/app/services/usermaster.service';
import { GlobalConstants } from 'src/app/common/global-constants';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Companymaster } from 'src/app/models/companymaster.model';
import { CompanymasterService } from 'src/app/services/companymaster.service';
@Component({
  selector: 'app-viewinvoice',
  templateUrl: './viewinvoice.component.html',
  styleUrls: ['./viewinvoice.component.css']
})
export class ViewinvoiceComponent implements OnInit {

  companies : Companymaster[] = [];
  auctiontype:any[];
  loading:boolean;
  selectdValue:selectVlaues=new selectVlaues(0,'null',null,null);
  Vlaues:selectVlaues[]=[new selectVlaues(1,'New','fiber_new','mat-color-green'),
                          new selectVlaues(2,'Check','done','mat-color-green'),
                          new selectVlaues(3,'Approved','done_all','mat-color-green'),
                          new selectVlaues(4,'Incorrect','clear','mat-color-red'),
                          new selectVlaues(5,'Rejected','clear_all','mat-color-red'),
                        ];
Vlaues1:selectVlaues[]=[new selectVlaues(1,'New','fiber_new','mat-color-green'),
                          new selectVlaues(2,'Check','done','mat-color-green'),
                          new selectVlaues(4,'Incorrect','clear','mat-color-red'),
                        ];

                        selectedauctionType:number;
  invoice:Invoicedetails[];
  tempaucinvdetails:Invoicedetails[];
  invItem:Itemsdetails[];
  clonedProducts: { [s: string]: Invoicedetails; } = {};
  selectedInvoice:Invoicedetails=new Invoicedetails();
  paystat:boolean;
  displayDialog:boolean=false;
  payinvoice:boolean=false;
  first = 0;
  checker;number=0;
  maker:number=0
  urole: number = 0;
  approver:number=0;
  moudleType: number = 10;
  uurlString: string;
  reportUrl: SafeResourceUrl ;
  reportU = GlobalConstants.reportUrl;
    rows = 10;
    filteredbranchid:number;
    loginuid: number = +sessionStorage.getItem("loginid");
  @ViewChild('content', {read: ElementRef}) content: ElementRef<any>;
  constructor(private _invoiceService:InvoiceserviceService,private _domsan  : DomSanitizer,
    private uservice: UsermasterService,private _router: Router,private companyservice : CompanymasterService) { 
      this.auctiontype=[{id:1,label:'Admin'},{id:8,label:'Auction'}];
    }
  
  ngOnInit(): void {
    this.filteredbranchid=null;
    this.retrieveCompaines();
    this.renderAllInvoice();
    
    this.checker=GlobalConstants.checker;
    this.approver=GlobalConstants.approver;
    this.maker=GlobalConstants.maker;
    this.uservice.userRoleCheck(this.loginuid, this.moudleType).subscribe(
      (response) => {
        console.log(response);
        if (response != null) {
          this.urole = response.roleid;
        } else {
          this.urole = 0;
        }
      }
    );
  }


  checkuser():boolean{
    if (this.urole == GlobalConstants.checker) {
      
      return false;
  
    }
    return true;
  }
  onRowEditInit(invoice: Invoicedetails) {
    this.clonedProducts[invoice.invoiceid] = {...invoice};
    console.log("initalize")
}

onRowEditSave(invocie: Invoicedetails) {
        console.log(invocie)
        this._invoiceService.approvestatus(invocie.invoiceid,invocie.approververifiedstatus,this.urole).subscribe((response)=>{
            console.log(response);
        });
        
    
}
emitevent(task){
  this.loading=true;
  console.log(task);
  this.payinvoice=task
  this.ngOnInit()
  this.renderAllInvoice();
}
retrieveCompaines(): void {
  this.companyservice.getNative()
    .subscribe({
      next: (data) => {
        console.log(data)
        this.companies = data;
         
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

onRowEditCancel(product: Invoicedetails, index: number) {
    this.invoice[index] = this.clonedProducts[product.invoiceid];
    delete this.clonedProducts[product.invoiceid];
}

  renderAllInvoice(){
    this.loading=true;
      this._invoiceService.getInvoiceDetails().subscribe(
        (response)=>{
              console.log(response)
              this.invoice=response;
              this.tempaucinvdetails=this.invoice;
              this.loading=false
        }
      );
  }


  filterbyAuctionType(){
    console.log("selected value"+this.selectedauctionType)
    
    this.invoice=this.tempaucinvdetails;
    if(this.selectedauctionType!=null)
    console.log(this.invoice=this.invoice.filter(x=>x.invoicefromadminorauction===this.selectedauctionType
    ))
  }

  filterbybranch(){

    console.log("selected value"+this.filteredbranchid)
    
    this.invoice=this.tempaucinvdetails;
    if(this.filteredbranchid!=null)
    console.log(this.invoice=this.invoice.filter(x=>x.companyid===this.filteredbranchid 
    ))
    
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("onvhage"+changes)
    console.log("paystat"+this.paystat)
    // changes.prop contains the old and the new value...
    
  }
  renderInvoiceItems(invoiceId:number){
    // this._invoiceService.getInvoiceItemDetails(invoiceId).subscribe(
    //   (response)=>{
    //         console.log(response)
    //         this.invItem=response;
    //   }
    // );



    this.uurlString  = this.reportU+"invoicedetails?invoiceid="+invoiceId;
this.reportUrl = this._domsan.bypassSecurityTrustResourceUrl(this.uurlString);
console.log(this.reportUrl)
}


  showItem(event){
    console.log(event);
    this.selectedInvoice=event;
    this.displayDialog=true;
    this.renderInvoiceItems(this.selectedInvoice.invoiceid);
  }
  payInvoice(invitem){
    this.selectedInvoice=invitem;
    console.log(invitem)
    this.payinvoice=true;
  }

  public openPDF(): void {
    
    const content=this.content.nativeElement;
    
    console.log(content)
    const doc = new jsPDF();
   
    var html = htmlToPdfmake(content.innerHTML);
     
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open(); 
    /* html2canvas(content).then((canvas) => {
       let fileWidth = 308;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      console.log(FILEURI);
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      
      console.log(PDF.addImage(FILEURI, 'png', 200, 20, 200, 300))
      console.log(PDF)
      
      PDF.save('angular-demo.pdf');
    }); */
  }
  editInvoice(invitem){
    console.log(invitem)
    this._router.navigate(['/invoice/generate/',invitem.invoiceid]);
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
    return this.invoice ? this.first === (this.invoice.length - this.rows): true;
}

isFirstPage(): boolean {
    return this.invoice ? this.first === 0 : true;
}
}



export class selectVlaues {

  valueid: number;
  valueName: string;
  valueIcon: string;
  valueClass: String;

  constructor(valueid, valueName, valueIcon, valueClass) {
    this.valueid = valueid;
    this.valueName = valueName;
    this.valueIcon = valueIcon;
    this.valueClass = valueClass;
  }
}