import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { concatMap, Observable, of, tap } from 'rxjs';
import { Companymaster } from 'src/app/models/companymaster.model';
import { Creditlimit } from 'src/app/models/creditlimit';
import { Currency } from 'src/app/models/currency.model';
import { Financialyear } from 'src/app/models/financialyear';
import { Invoicedetails } from 'src/app/models/invoicedetails';
import { Itemsdetails } from 'src/app/models/itemsdetails';
import { Payment } from 'src/app/models/payment';
import { Paymentterms } from 'src/app/models/paymentterms';
import { SalesLedger } from 'src/app/models/sales-ledger';
import { Saleview } from 'src/app/models/saleview';
import { CompanymasterService } from 'src/app/services/companymaster.service';
import { CreditlimitService } from 'src/app/services/creditlimit.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { InvoiceserviceService } from 'src/app/services/invoiceservice.service';
import { PaymentService } from 'src/app/services/payment.service';
import { SalesledgerService } from 'src/app/services/salesledger.service';
import Swal from 'sweetalert2';
import { ToWords } from 'to-words';


@Component({
  selector: 'app-generate-invoice',
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.css']
})
export class GenerateInvoiceComponent implements OnInit {
  @ViewChild('invoiceForm') invoiceForm: NgForm;
  title="Generate Invoice"
  inveditId:number;
  words :string;
  currentDate:Date=new Date();
  companies : Companymaster[] = []
  items: MenuItem[];
  buyerLedger:Saleview[];
  delevieryLedger:Saleview[];
  sellerLedger:Saleview[];
  selectCompany:Companymaster=new Companymaster();
  financialYear:Financialyear=new Financialyear();
  selectedBuyerLedger:Saleview;
  selectedSellerLedger:Saleview;
  buyerLedgerDetails:Saleview=new Saleview();
  sellerLedgerDetails:Saleview=new Saleview();
  delieveryDetails:Saleview=new Saleview();
  itemDetails:Itemsdetails[];
  item:Itemsdetails=new Itemsdetails();
  itemselect:Itemsdetails=new Itemsdetails();
  paymentTermDetails:Paymentterms[];
  selectedPayment:Paymentterms=new Paymentterms();
  itemselected:Itemsdetails[]=[];
  currency : Currency[] = [];
  gfg: number = 0;
  samedelivery:boolean=false;
  formGroup: FormGroup;
  dateRange:Date[];
  invocieperiod:Date[];
  invoiceTotal:number;
  buyerlimit:Creditlimit=new Creditlimit();
  invoiceDetails:Invoicedetails=new Invoicedetails();
  paymentDetails:Payment;
  deleteSelected:Itemsdetails[];
  limit;
  editmode:boolean=false;
  constructor(private companyservice : CompanymasterService,
    private currencyservice : CurrencyService,
    private _saleLedgerService:SalesledgerService,
    private _invoiceService:InvoiceserviceService,
    private _paymentService:PaymentService, 
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private dateformat:DatePipe,
    private _buyerlimit:CreditlimitService) { }
  change(event){
    console.log(event.value)
    this.invoiceDetails.buyerid=event.value;
    console.log(this.sellerLedger);
    console.log(this.buyerLedgerDetails=this.buyerLedger.filter(x=>x.ledgerId===event.value)[0])
    this.checkdelivery();
    this.renderCreditlimit(event.value);
  }

  changeItem(event){
    console.log(this.item)
    console.log(event.value)
    console.log(this.itemDetails)
    
    console.log(this.itemselect=this.itemDetails.filter(x=>x.itemid==event.value)[0]) 
    this.item.qty=1;
  }
  changeforseller(event){
    console.log(event.value)
    this.invoiceDetails.supplierid=event.value;
    this.sellerLedgerDetails=this.sellerLedger.filter(x=>x.ledgerId===event.value)[0];
    console.log(this.sellerLedgerDetails) 
    
  }
  selectedCompany(event){
    console.log(event.value)
    this.invoiceDetails.companyid=event.value;
    console.log(this.selectCompany=this.companies.filter(x=>x.companyid===event.value)[0])
    this.renderBuyerDetails(this.selectCompany.companyid);
    this.renderSupplierDetails(this.selectCompany.companyid);
    /* this.retrieveInvoiceNumber(this.selectCompany.companytypeid); */
  }
 /*  retrieveInvoiceNumber(officeid){
    this._invoiceService.getInvoiceNumber(officeid).subscribe((response)=>{
        this.invoiceDetails=response;
        this.invoiceDetails.invoicedate=this.currentDate;
        console.log(this.invoiceDetails);
    }); 
  } */
  retrieveCompaines(): void {
    this.companyservice.getAll()
      .subscribe({
        next: (data) => {
          this.companies = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
    }
  
  changeDelievery(event){
    console.log(this.delevieryLedger);
    console.log(this.delieveryDetails=this.delevieryLedger.filter(x=>x.ledgerId===event.value)[0])

  }
  checkdelivery(){
    if(this.samedelivery){
      console.log("hi"+this.samedelivery); 
      this.delieveryDetails=this.buyerLedgerDetails;
      console.log(this.delieveryDetails);
    }else{
      this.delieveryDetails=new Saleview();
      console.log("make"+this.samedelivery); 
    }
   
   
  }
  
  ngOnInit(): void {
    console.log(this.inveditId=Number(this._route.snapshot.paramMap.get('id')))
    this.item.qty=1;
    console.log(this.currentDate.getDate())
    this.invoiceDetails.invoicedate=this.currentDate
    
    this.retrieveCompaines();
    
    this.renderCurrentFinancialYear();
    this.retrieveCurrency();
    this.renderAllItems();
    this.renderPayment();
    
    if(this.inveditId!=0 ){
      this.renderInvoiceById(this.inveditId);
      
    }
  }

  renderBuyerDetails(companyid){
    this._saleLedgerService.getBuyerDetails(companyid).subscribe(
      (response)=>{
         console.log(response); 
         this.buyerLedger=response;
         this.delevieryLedger=response;
         this.delevieryLedger=this.delevieryLedger.sort((a, b) => (a.ledgerName < b.ledgerName ) ? -1 : 1);
         console.log(this.buyerLedger)
         if(this.invoiceDetails.buyerid!=0|| this.invoiceDetails.buyerid!==undefined)
         this.buyerLedgerDetails=this.buyerLedger.filter(x=>x.ledgerId===this.invoiceDetails.buyerid)[0];
         if(this.invoiceDetails.deliveryid!=0)
         this.delieveryDetails=this.delevieryLedger.filter(x=>x.ledgerId===this.invoiceDetails.deliveryid)[0];
         console.log(this.delieveryDetails)
         
      }
    );
  }
  renderSupplierDetails(companyid){
    this._saleLedgerService.getSellerDetails(companyid).subscribe(
      (response)=>{
         console.log(response); 
         this.sellerLedger=response;
         this.sellerLedger=this.sellerLedger.sort((a, b) => (a.ledgerName < b.ledgerName ) ? -1 : 1);
         console.log(this.sellerLedger)
         if(this.invoiceDetails.supplierid!=0)
         {
         this.sellerLedgerDetails=this.sellerLedger.filter(x=>x.ledgerId===this.invoiceDetails.supplierid)[0];
         console.log(this.sellerLedgerDetails)
         if(this.sellerLedgerDetails==undefined)
         this.sellerLedgerDetails=new Saleview()
         }
      }
    );
  }

  renderCurrentFinancialYear(){
    this._invoiceService.getFinancialYearDetails().subscribe(
      (response)=>{
        console.log(response);
        this.financialYear=response;
        console.log(this.financialYear)
          
    console.log(this.financialYear.financialyearstartdate)
    let today = new Date();
        let firstDate = new Date(this.dateformat.transform(this.financialYear.financialyearstartdate,'MM/dd/yyyy'));
        let endDate = new Date(this.dateformat.transform(this.financialYear.financialyearenddate,'MM/dd/yyyy'));
        /* firstDate.setDate(today.getDate() - 7); */
        this.dateRange = [ firstDate, endDate];

        this.invocieperiod=this.dateRange;
    console.log(this.financialYear.financialyearenddate)
      }
    );
  }

  retrieveCurrency(): void {
    this.currencyservice.getAll()
      .subscribe({
        next: (data) => {
          this.currency = data;
          this.currency.forEach((item)=>{
            if(item.currencydisplay=='INR'){
              this.invoiceDetails.currency=item.currencyid
            }
          })
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  renderAllItems(){
    this._invoiceService.getItemDetails().subscribe(
      (response)=>{
        console.log(response);
        this.itemDetails=response;
        console.log(this.itemDetails)
      }
    );
  }

  addTable(){
    
   this.item={...this.item,...this.itemselect}
    console.log(this.item);
    
    this.item.taxvalue=Number(this.item.itemrate)*this.item.qty;
    //Service Charges not included.
    //this.item.servicevalue=Number((this.item.taxvalue*1/100).toFixed(4));
    this.item.totalvalue=this.item.taxvalue;
    /* if(this.item.tdsrate!=0)
    this.item.tdsvalue=this.item.itemRate*(this.item.tdsrate/100); */
    console.log(this.selectCompany)
    console.log(this.buyerLedgerDetails.state)
    if(this.selectCompany.stateid==this.buyerLedgerDetails.state)
    {
      this.item.igstrate=0;
    this.item.cgstvalue=Number((this.item.taxvalue*(this.item.cgstrate/100)).toFixed(4));
    this.item.sgstvalue=this.item.taxvalue*(this.item.sgstrate/100);
    this.item.total=(Number(this.item.totalvalue)+this.item.cgstvalue+this.item.sgstvalue);
  }else{
    this.item.cgstrate=0;
    this.item.sgstrate=0;
    this.item.igstvalue=this.item.taxvalue*(this.item.igstrate/100);
    this.item.total=(Number(this.item.totalvalue)+this.item.igstvalue);
  }
  console.log(this.item); 
    /* this.item.totalValue=Number(this.item.total)+this.item.tdsvalue; */
    
    /* this.item.total=Math.round(this.item.total) */
    this.item.total=Number((this.item.total).toFixed(4));
    this.itemselected.push(this.item);
    this.item=new Itemsdetails();
    let total1=0;
    
    let totalcgst=0;
    let totalsgst=0;
    let totaligst=0;
    for(let total of this.itemselected)
    {
      total1 +=total.total;
      totalcgst +=total.cgstvalue;
      totalsgst +=total.sgstvalue;
      totaligst +=total.igstvalue;
    }
    
    this.invoiceTotal=Math.round(total1);
    this.invoiceDetails.sgstvalue=totalsgst;
    this.invoiceDetails.cgstvalue=totalcgst;
    this.invoiceDetails.igstvalue=totaligst;
    this.invoiceDetails.invoicetotal=Math.round(this.invoiceTotal);
    const toWords = new ToWords();
            this.words=toWords.convert(this.invoiceTotal)
            this.invoiceDetails.totalinwords=this.words;
    console.log(this.itemselected);
    console.log(this.item)
    console.log(this.itemDetails)
    
  
  }



  deleteTable(){

  }

  
  calculateTotal(event){
    let itemchange=new Itemsdetails();
    console.log(event);
    this.itemselected
    .find(x => {
      x.itemid==event.itemId
      itemchange=x
     });
     console.log(itemchange)
     if(this.calculateValues(itemchange)!==null){
      itemchange=this.calculateValues(itemchange)
      this.itemselected
    .find(x => {
      console.log(x)
      x=itemchange
      console.log(x)
     });
    }
    
  }


calculateValues(item:Itemsdetails):Itemsdetails{
  
  
    
   
    console.log(item)
     item.taxvalue=Number(item.itemrate)*item.qty;
    item.servicevalue=Number((item.taxvalue*1/100).toFixed(4));
    item.totalvalue=item.taxvalue+item.servicevalue;
    /* if(this.item.tdsrate!=0)
    this.item.tdsvalue=this.item.itemRate*(this.item.tdsrate/100); */
    if(this.selectCompany.stateid==this.buyerLedgerDetails.state)
    {
      item.igstrate=0;
    item.cgstvalue=Number((item.servicevalue*(item.cgstrate/100)).toFixed(4));
    item.sgstvalue=item.servicevalue*(item.sgstrate/100);
    item.total=(Number(item.totalvalue)+item.cgstvalue+item.sgstvalue);
  }else{
    item.cgstrate=0;
    item.sgstrate=0;
    item.igstvalue=item.servicevalue*(item.igstrate/100);
    item.total=(Number(item.totalvalue)+item.igstvalue);
  }
  console.log(item); 
    /* this.item.totalValue=Number(this.item.total)+this.item.tdsvalue; */
    
    /* this.item.total=Math.round(this.item.total) */
    item.total=Number((item.total).toFixed(4));
    this.limit=this.limit-item.total;

    console.log(this.limit)
    
    let total1=0;
    let totalcgst=0;
    let totalsgst=0;
    let totaligst=0;
    for(let total of this.itemselected)
    {
      total1 +=total.total;
      totalcgst +=total.cgstvalue;
      totalsgst +=total.sgstvalue;
      totaligst +=total.igstvalue;
    }
    this.buyerlimit.limitUtilize=total1;
    this.invoiceTotal=Math.round(total1);
    this.invoiceDetails.sgstvalue=totalsgst;
    this.invoiceDetails.cgstvalue=totalcgst;
    this.invoiceDetails.igstvalue=totaligst;
    this.invoiceDetails.invoicetotal=Math.round(this.invoiceTotal);
    const toWords = new ToWords();
            this.words=toWords.convert(this.invoiceTotal)
            this.invoiceDetails.totalinwords=this.words;
    console.log(this.itemselected);
    console.log(item)
    console.log(this.itemDetails)
    if(this.limit>0){
    return item;
  }else{
    Swal.fire("Warning!","Could not be added! Your's Limit is reached please update the balance","error");
    return null;
  }
  
}




  renderPayment(){
    this._invoiceService.getPaymnetTermDetails().subscribe(
      (response)=>{
        console.log(response);
        this.paymentTermDetails=response;
        console.log(this.paymentTermDetails)
      }
    );
  }
  selectePaymentTerm(event){
    console.log(event.value)
    this.selectedPayment =this.paymentTermDetails.filter(x=>x.paymentTermsId==event.value)[0];
    console.log(this.selectedPayment)
  }

  saveInvoice(form:NgForm){ 
    
    if(this.itemselected.length!=0){
    console.log(this.buyerlimit)
    console.log(form.value)
    
    console.log(this.invoiceDetails.invoicedate)
    if(this.editmode!=true){
      this.invoiceDetails.makerverifiedstatu=1;  
      this.invoiceDetails.approververifiedstatus=1;  
    }
    let invId:number;
    let invNumber:string;
    this.invoiceDetails.companyid=this.selectCompany.companyid;
    this.invoiceDetails.deliveryid=this.delieveryDetails.ledgerId;
    this.invoiceDetails.financialyearid=this.financialYear.financialyearid;
    this.invoiceDetails.paymenttermsid=this.selectedPayment.paymentTermsId;
    console.log(this.invocieperiod)
    this.invoiceDetails.invoiceperiodstart=this.invocieperiod[0];
    this.invoiceDetails.invoiceperiodend=this.invocieperiod[1];
    
    console.log(this.invoiceDetails)
      this._invoiceService.saveInvoice(this.invoiceDetails).pipe(
        tap(res=>{console.log("invoice",res)
          console.log(res.body);  
          let m=JSON.stringify(res.body);
          this.invoiceDetails=JSON.parse(m);
          console.log(this.invoiceDetails);
          invId=this.invoiceDetails.invoiceid;
          invNumber=this.invoiceDetails.invoicenumber;
         }),
        concatMap(res=>
          this._invoiceService.saveInvoiceItem(this.itemselected,invId)
          ),
          concatMap((res)=>{
            if(!this.editmode)
            return this._paymentService.insertInvoiceDetails(invId)
            else
            return of(false);
          }
            )
            
      ).subscribe(response=>{
        console.log(response);
        if(this.editmode!=true)
        Swal.fire("Success","Invoice NO :<b>"+invNumber+"</b> Created Successfuly...");
        else
        Swal.fire("Success","Invoice NO :<b>"+invNumber+"</b> Updated Successfuly...");

       this.clearForm(form)

      }
      );
      console.log(this.itemselected)
    }else{
      Swal.fire("warning","No Item  selected");
    }
    }

    clearForm(form:NgForm){ 
      form.resetForm();
      this.itemselected=[];
        this.invoiceTotal=0;
        this.sellerLedgerDetails=new Saleview()
        this.words=null
        this.buyerlimit=null;
        this._router.navigate(['/invoice/generate']);
    }


    renderInvoiceById(invoiceid:number){
        this._invoiceService.getInvoiceDetailsById(invoiceid).subscribe((response)=>{
          console.log(response);  
          this.editmode=true;
          this.invoiceDetails=response;
          this.invoiceDetails.invoicedate= new Date(this.invoiceDetails.invoicedate);
            if(this.invoiceDetails.companyid!=0)
            this.selectCompany.companyid=this.invoiceDetails.companyid;
            this.renderBuyerDetails(this.selectCompany.companyid);
    this.renderSupplierDetails(this.selectCompany.companyid)
            console.log(this.buyerLedgerDetails)
            console.log(this.sellerLedger)
            console.log(this.invoiceDetails.supplierid)
            
          this.invocieperiod=[new Date(this.invoiceDetails.invoiceperiodstart),new Date(this.invoiceDetails.invoiceperiodend)]
          
            console.log(this.invocieperiod)
            this.renderInvoiceItems(this.invoiceDetails.invoiceid);
            /* this.invoiceDetails.invoicedate=this.dateformat.transform(this.invoiceDetails.invoicedate,'dd/MM/yyyy') */
            console.log(this.invoiceDetails.invoicedate=new Date(this.invoiceDetails.invoicedate))
            this.invoiceTotal=this.invoiceDetails.invoicetotal;
            const toWords = new ToWords();
            this.words=toWords.convert(this.invoiceTotal)
            this.selectedPayment.paymentTermsId=this.invoiceDetails.paymenttermsid
            this.renderCreditlimit(this.invoiceDetails.buyerid)
            console.log(this.words,{currency:true})
            console.log(this.invoiceDetails);
            
        });
    }
    renderInvoiceItems(invoiceId:number){
      this._invoiceService.getInvoiceItemDetails(invoiceId).subscribe(
        (response)=>{
              console.log(response)
              this.itemselected=response;
              console.log(this.itemselected)
              
              for(let i of this.itemselected){
                console.log(i)
                this.item=this.itemDetails.filter(x=>x.itemid===i.itemid)[0]
                 i.itemname=this.item.itemname;   
                    console.log(this.item);
              }
              this.item.qty=1
        }
      );
  }
  renderCreditlimit(buyerid:number)
  {
    this._buyerlimit.getcreditlimitbybuyerid(buyerid).subscribe(
      (response)=>{
          console.log(response);
          
          
          if(response!=null){
            this.buyerlimit=response;
          }else{
            this.buyerlimit=null;
          }
          console.log(this.buyerlimit);
    });      
  } 


  deleteselected(){
    let total=0;
    let result= confirm("are you sure ,want to delete?")
    if(result){
      console.log(this.limit)
      console.log(this.itemselected.slice(0,1))
      console.log(this.deleteSelected)
      this.deleteSelected.forEach((item)=>{
        console.log(item);
         total=total+ item.total;

        console.log(this.itemselected) 
        console.log(this.itemselected.indexOf(item))
        this.itemselected.forEach((item2,index)=>{
        if(item2==item) this.itemselected.splice(index,1);
        })
         console.log(this.itemselected) 
      })
      console.log(total=Math.round(total))
      console.log(this.invoiceTotal)
      this.invoiceTotal=this.invoiceTotal-total;
      console.log(this.invoiceTotal)
      
      this.invoiceDetails.invoicetotal=Math.round(this.invoiceTotal)
      const toWords = new ToWords();
      this.words=toWords.convert(this.invoiceTotal)
      this.invoiceDetails.totalinwords=this.words;
      this.deleteSelected=[];
    }
  }

}
