import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { State } from 'src/app/models/state';
import { City } from 'src/app/models/city';
import { SalesLedger } from 'src/app/models/sales-ledger';
import { SalesledgerService } from 'src/app/services/salesledger.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Companymaster } from 'src/app/models/companymaster.model';
import { Groupdetails } from 'src/app/models/groupdetails';
import { Subgroupdetails } from 'src/app/models/subgroupdetails';
import { CompanymasterService } from 'src/app/services/companymaster.service';
import { ComponentCanDeactivate } from 'src/app/interface/component-can-deactivate';
import { Observable } from 'rxjs';
import { Ledgerbankdetails } from 'src/app/models/ledgerbankdetails';
import { BankserviceService } from 'src/app/services/bankservice.service';
@Component({
  selector: 'app-salesledger',
  templateUrl: './salesledger.component.html',
  styleUrls: ['./salesledger.component.css'],
  providers:[
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})

export class SalesledgerComponent implements OnInit,OnChanges,ComponentCanDeactivate {
  
  title:string="FileUpload";
  show=true;
  ledgertitle:string;
  ledgerinitial:string;
  isLinear = false;
  firstFormGroup: FormGroup;
  bankFormGroup: FormGroup;
  stateName:State=new State();
  stateNames:State[]=new Array<State>();
 cityName:City=new City();
 selectedCity:City=new City();
 cityNames:City[]=new Array<City>();
 selectedCityNames:City[]=new Array<City>();
 salesLedger:SalesLedger=new SalesLedger();
 LedgerType:any;
 branchlist:Companymaster[]=[];
 fileIds:number[]=[];
 ledgernames:Array<String>=[];
 ledgeralies:Array<String>=[];
 branchstate:boolean=true;
 homeselected:number;
 vid=null;
 groupname:string="salesgroup"
 groupdetails:Groupdetails[]=[];
 isDirty=false;
 visibleBankDetails=false;
 subgroupdetails:Subgroupdetails[]=[];
 bankDetails:Ledgerbankdetails=new Ledgerbankdetails();
 bankDetailsList:Array<Ledgerbankdetails>=[];
 removedbankDetailsList:Array<Ledgerbankdetails>=[];
 associatedHomeBranch=[ {id:5, name: 'ALL'},
 {id:1, name: 'HO'},
 {id:2, name: 'RMO'},
 {id:3, name: 'APF'},
 {id:4, name: 'DOA'}]
  inventoryvalue=[ 
 {id:1, name: 'Yes'},
 {id:2, name: 'NO'}]

  constructor(private _aroute: ActivatedRoute,
    private _company:CompanymasterService, 
    private _formBuilder: FormBuilder,
    private bankservice:BankserviceService,
    private _saleLedgerService:SalesledgerService,
    private _router:Router) { 
      
  }
  canDeactivate(): boolean
  {
    return !this.isDirty;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.branchstate)
  }/* 
  window.onbeforeunload = function() {
    return "Data will be lost if you leave the page, are you sure?";
  }; */
  onchange(event){
    console.log("changes value")
    console.log(event.value)
    this.homeselected=event.value
    console.log(this.homeselected)
    this.firstFormGroup.get('ifBranch').enable();
    if(event.value==0)
    { 
      this._company.getAll().subscribe(
        (response)=>{
        this.branchlist=response;
      });
    }
    else
    if(event.value==3){/* 
      console.log("value transformed")
      this.firstFormGroup.get('ledgerifBranch').enable(); */
      this._saleLedgerService.getcompanybyid(this.homeselected,2).subscribe(
        (response)=>{
          console.log(response);
          this.branchlist=response;
        }
      );
    }
    else
    if(this.homeselected==4){/* 
      console.log("value transformed")
      this.firstFormGroup.get('ledgerifBranch').enable(); */
      this.firstFormGroup.get('ifBranch').disable();
    }else{
      /* this.firstFormGroup.get('ledgerifBranch').disable(); */
      this._saleLedgerService.getcompanybyid(this.homeselected,0).subscribe(
        (response)=>{
          console.log(response);
          this.branchlist=response;
        }
      );
    }

    

  }

  onGroupchange(event){
    console.log(event);
    this.getSubGroupId(event);
  }


  ngOnInit(): void {
    console.log(this.salesLedger)
    this.vid=39;
    
    this.getCitySetails();
    this.getStateDetails();
    this.getLedgerNames();
    this.getLedgerAlias();
    this.LedgerType=this._aroute.snapshot.url[0].path;
    console.log(this.LedgerType);
    this.ledgertitle="Buyer Ledger Creation Form";
    this.ledgerinitial="Buyer"
    this.firstFormGroup = this._formBuilder.group({
      ledgerCode:[null,Validators.required],
      ledgerName: [null, [Validators.required ,Validators.maxLength(30),this.checkLedgerNameExist.bind(this),Validators.pattern('.*\\S.*[a-zA-z0-9 ]+')]],
      ledgerAlias: [null, [Validators.required,Validators.maxLength(30),this.checkLedgerAliasExist.bind(this),Validators.pattern('.*\\S.*[A-Za-z0-9]+')]],
      associateHomeBranch: ['', Validators.required],
      ifBranch: ['',Validators.required],
      groupId: ['', [Validators.required]],
      subGroupId: ['', Validators.required],
      
      address1: ['', ],
      address2: ['', ],
      cityName:['',],
      /* address1: ['', Validators.pattern('[\\w\\s,_:]*.(\n)?')],
      address2: ['', Validators.pattern('[\\w\\s,_:]*.(\n)?') ],
       */city: ['0', Validators.required],
      state: ['0', Validators.required],
      
      /* bankAccountNumber: ['', Validators.pattern('[A-Za-z0-9]*')], */
      
    
    
      /* bankAddress: ['', Validators.pattern('[\\w\\s,_:]*.(\n)?')], */
       gst: ['', Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')],
       panno: [null, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')],
       pinCode:['',]
     });
    this.bankFormGroup = this._formBuilder.group({
      bankName: ['', Validators.pattern('[A-Za-z\\s]*')],
      bankAccountNumber: ['',  Validators.required],
      ifscCode: ['', Validators.pattern('[A-Za-z0-9]*')],
      bankAddress: ['',],
      // gst: ['', Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')],
      // pano: [null, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')],
    });
    
    
    if(this.LedgerType=="prucaheledger")
    {
      this.vid=8;
      this.ledgertitle="Vendor Ledger Creation Form";
      this.ledgerinitial="Vendor"
      this.firstFormGroup = this._formBuilder.group({
        ledgerCode:[null,Validators.required],
        ledgerName: ['', [Validators.required ,this.checkLedgerNameExist.bind(this),Validators.pattern('.*\\S.*[a-zA-z0-9 ]+')]],
        ledgerAlias: ['', [Validators.required ,this.checkLedgerAliasExist.bind(this),Validators.pattern('.*\\S.*[a-zA-z0-9 ]+')]],
        associateHomeBranch: ['', Validators.required],
        ifBranch: ['', Validators.required],
        groupId: ['', Validators.required],
        subGroupId: ['', Validators.required],
        affectInventory: [1, ],
        address1: ['', ],
      address2: ['', ],
      cityName: ['', ],
      /* 
        address1: ['', Validators.pattern('[\\w\\s,_:]*.(\n)?')],
        address2: ['', Validators.pattern('[\\w\\s,_:]*.(\n)?') ], */
        city: ['', Validators.required],
        state: ['', Validators.required],/* 
        bankName: ['', Validators.pattern('[A-Za-z\\s]*')],
        bankAccountNumber: ['', Validators.pattern('[A-Za-z0-9]*')],
        ifscCode: ['', Validators.pattern('[A-Za-z0-9]*') ],
        bankAddress: ['', Validators.pattern('[\\w\\s,_:]*.(\n)?')],*/
        gst: ['', Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')],
        panno: [null, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')], 
        pinCode: [null, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')], 
      });
      this.bankFormGroup = this._formBuilder.group({
        
        bankName: ['', Validators.pattern('[A-Za-z\\s]*')],
       /*  bankAccountNumber: ['', Validators.pattern('[A-Za-z0-9]*')], */
       bankAccountNumber: ['',  Validators.required],
        ifscCode: ['', Validators.pattern('[A-Za-z0-9]*') ],
        /* bankAddress: ['', Validators.pattern('[\\w\\s,_:]*.(\n)?')], */
        bankAddress: ['',],
        // gst: ['', Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')],
        // pano: [null, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')],
      
      });
      this.groupname="purchasegroup"
    }
    this.salesLedger.ledgerId=0;
    this.salesLedger.ledgerId=Number(this._aroute.snapshot.paramMap.get('ledgerId'));
    if(this.salesLedger.ledgerId!=0)
    {
      
      this.firstFormGroup = this._formBuilder.group({
        ledgerCode:[null],
        ledgerName: ['', [Validators.required ,Validators.maxLength(30),this.checkLedgerNameExist.bind(this),Validators.pattern('.*\\S.*[a-zA-z0-9 ]+')]],
        ledgerAlias: ['', [Validators.required ,Validators.maxLength(30),this.checkLedgerAliasExist.bind(this),Validators.pattern('.*\\S.*[a-zA-z0-9 ]+')]],
        associateHomeBranch: ['', Validators.required],
        ifBranch: ['', Validators.minLength],
        groupId: ['', Validators.required],
        subGroupId: ['', Validators.required],
        affectInventory: [1, ],
        address1: ['', ],
      address2: ['', ],
            cityName: ['', ],

        /* address1: ['', Validators.pattern('[\\w\\s,_:]*.(\n)?')],
        address2: ['', Validators.pattern('[\\w\\s,_:]*.(\n)?')],
         */city: ['', Validators.required],
        state: ['', Validators.required],/* 
        bankName: ['',  Validators.pattern('[A-Za-z]*')],
        bankAccountNumber: ['',  Validators.pattern('[0-9]*')],
        ifscCode: ['', Validators.pattern('[A-Za-z0-9]*') ],
        bankAddress: ['', Validators.pattern('[A-Za-z0-9]*')],*/
        gst: ['', Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')],
        panno: [null, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')], 
        pinCode: ['', Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')], 
      });
      this.bankFormGroup = this._formBuilder.group({
        
        bankName: ['', Validators.pattern('[A-Za-z\\s]*')],
        /* bankAccountNumber: ['',  Validators.pattern('[0-9]*')], */
        bankAccountNumber: ['',  Validators.required],
        ifscCode: ['', Validators.pattern('[A-Za-z0-9]*') ],
        /* bankAddress: ['', Validators.pattern('[A-Za-z0-9]*')], */
        bankAddress: ['',],
        // gst: ['', Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')],
        // pano: [null, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')],
      });
      
      this.editdetails();
      console.log(this.salesLedger);
      console.log(this._aroute.snapshot.paramMap.get('ledgerId'));
    }
    this.getGroupId(this.groupname);
  }

  onSubmit(event){
    console.log(event);
  }
  onStateChange(sid){
    console.log("hi state id is :"+sid);
    if(sid!==0)
    {
    console.log(this.selectedCityNames=this.cityNames.filter((item)=> item.stateId===sid));
    }else{
      this.firstFormGroup.controls['city'].setValue(0);
      this.selectedCityNames=this.cityNames 
    }
  }
  onCityChange(sid){
    console.log("hi city id is :"+sid);
    console.log(this.cityNames)
   /*  console.log(this.cityNames.findIndex(sid));
    console.log(this.stateNames=this.stateNames.filter((item)=> item.stateId==sid));
     */
    let id:number;
    if(sid!==0)
    console.log(this.selectedCity=this.cityNames.find((item)=> item.cityId===sid ));
    console.log(id);
   /*  this.stateNames=this.stateNames.filter((item)=>item.stateId==id); */
    this.firstFormGroup.controls['state'].setValue(this.selectedCity.stateId);
  }
form1(){

}
  save(){
    this.isDirty=false;
    const combinedvalue= {
      ...this.firstFormGroup.value
      };
      this.salesLedger=combinedvalue;
      this.salesLedger.active=0;
      this.salesLedger.ledgerType=0;
      this.salesLedger.createdBy=1;
      this.salesLedger.modifiedBy=1;
      this.salesLedger.undergroups="sales";
      this.salesLedger.companyId=1;
      this.salesLedger.ledgerCustomerId="custM456";
      this.salesLedger.ledgerSupplierId="supM456";
      this.salesLedger.recordApprovalStatus="1";
      this.salesLedger.affectInventory=0;
      this.salesLedger.fileUploadId=this.fileIds;
      this.salesLedger.bankdetails=this.bankDetailsList;
      console.log(this.LedgerType)
      if(this.LedgerType=="prucaheledger"){

        this.salesLedger.undergroups="purchase";
      }
      console.log(this.salesLedger);
      console.log(this.salesLedger)
      this._saleLedgerService.createSalesLedger(this.salesLedger).subscribe(data => {
        console.log(Response.toString)
        console.log(data)
        if (data['status'] == 201) {
          if(this.LedgerType=="salesledger"){
            console.log(this.LedgerType)
            Swal.fire('Success!!', 'Data saved successfully!!', 'success');
          this._router.navigateByUrl('salesledger/view');
          }else if(this.LedgerType=="prucaheledger"){
            console.log(this.LedgerType)
            Swal.fire('Success!!', 'Data saved successfully!!', 'success');
          this._router.navigateByUrl('purchaseledger/view');
          }
          else{
            Swal.fire('Error!!', 'something went wrong!!', 'success');
          }
        }
      }
      );
  }

  edit(){
    
    const salestemp:number=this.salesLedger.ledgerId;
    const ledgerCode=this.salesLedger.ledgerCode;
    console.log("ledger id to be passed"+this.salesLedger.ledgerId);
    const combinedvalue= {
      ...this.firstFormGroup.value
      };

      this.salesLedger=combinedvalue;
      this.salesLedger.ledgerCode=ledgerCode;
      this.salesLedger.ledgerId=salestemp;
      this.salesLedger.active=0;
      this.salesLedger.ledgerType=0;
      this.salesLedger.createdBy=1;
      this.salesLedger.modifiedBy=1;
      this.salesLedger.undergroups="sales";
      console.log(this.LedgerType)
      if(this.LedgerType=="prucaheledger"){

        this.salesLedger.undergroups="purchase";
      }
      this.salesLedger.bankdetails=this.bankDetailsList;
      this.salesLedger.companyId=1;
      this.salesLedger.ledgerCustomerId="custM456";
      this.salesLedger.ledgerSupplierId="supM456";
      this.salesLedger.recordApprovalStatus="1";
      this.salesLedger.fileUploadId=this.fileIds;
      console.log(this.salesLedger);
      
      
      this.bankservice.deleteBankList(this.removedbankDetailsList).subscribe(()=>{
          console.log("deleted");
      })
      this._saleLedgerService.updateSalesLedger(this.salesLedger).subscribe(
        data => {
          console.log(data)
          /* if (data['status'] == 202) {
  
            Swal.fire('Success!!', 'Data saved successfully!!', 'success');
            this._router.navigateByUrl('salesledger/view');
          }else {
  
            Swal.fire('Error!!', 'Something Went wrong!!', 'error');
            
          } */
          
            Swal.fire('Success!!', 'Data saved successfully!!', 'success');
            if(this.LedgerType=="prucaheledger")
            this._router.navigateByUrl('purchaseledger/view');
            else
            this._router.navigateByUrl('salesledger/view');
          
        }
      );
  }

  checkLedgerNameExist(control:FormControl){
    /* 
    if(this.ledgernames.indexOf(control.value)!==-1){
      return {'nameisnotallowed':true};
    }
    return null; */
    console.log(this.salesLedger.ledgerId)
    if(this.salesLedger.ledgerId==0)
    {
    if(this.ledgernames.indexOf(control.value)!==-1){
      return {'nameisnotallowed':true};
    }
  }else{
    console.log(this.salesLedger.ledgerAlias)
      if(this.salesLedger.ledgerName==control.value)
      {
      return null;
      }else
      if(this.ledgernames.indexOf(control.value)!==-1){
        return {'nameisnotallowed':true};
      } 
    }
    return null;
  }
  checkLedgerAliasExist(control:FormControl){
    console.log(this.salesLedger.ledgerId)
    if(this.salesLedger.ledgerId==0)
    {
    if(this.ledgeralies.indexOf(control.value)!==-1){
      return {'aliasisnotallowed':true};
    }
  }else{
    console.log(this.salesLedger.ledgerAlias)
      if(this.salesLedger.ledgerAlias==control.value)
      {
      return null;
      }else
      if(this.ledgeralies.indexOf(control.value)!==-1){
        return {'aliasisnotallowed':true};
      } 
    }
    return null;

  }


  getStateDetails(){
    this._saleLedgerService.getStates().subscribe(
      (response)=>{
        console.log("State Details"+response.toString());
        this.stateNames=response;
        console.log(this.stateNames[0]);
        }
    );
  }
  onLedgerNameChange(){
    this.isDirty=true;
    console.log(this.isDirty)
    window.addEventListener("beforeunload", (event) => {
      event.preventDefault();
      event.returnValue = "Unsaved modifications";
      return event;
   });
  }

  getLedgerNames(){
    this._saleLedgerService.getLedgerName().subscribe(
      (response)=>{
        console.log(response);
        this.ledgernames=response;
      }
    )
  }
  getLedgerAlias(){
    this._saleLedgerService.getLedgerAlias().subscribe(
      (response)=>{
        console.log(response);
        this.ledgeralies=response;
      }
    )
  }

  getCitySetails(){
    this._saleLedgerService.getCities().subscribe(
      (response)=>{
        this.cityNames=response;
        this.selectedCityNames=this.cityNames;
    console.log(this.selectedCityNames)
        console.log(this.cityNames[0]);
      }
    );
  }
  editdetails(){
    
    this.show=false;
    console.log(this._saleLedgerService.getSalesLedgerDetailsById(this.salesLedger.ledgerId).subscribe(
      (response) => { 
          
        console.log('get by idresponse received');
        console.log(response)
        this.salesLedger=response;
        console.log(this.salesLedger.undergroups)
       if(this.salesLedger.undergroups==="purchase"){
        this.ledgertitle="Purchase Ledger Creation Form";
        this.ledgerinitial="Vendor";
        this.groupname="purchasegroup"
        this.LedgerType="prucaheledger"
        this.getGroupId(this.groupname)
      }
        this.homeselected=this.salesLedger.associateHomeBranch;
        console.log(this.salesLedger)
        
        this.firstFormGroup.controls['ledgerName'].setValue(this.salesLedger.ledgerName);
        this.firstFormGroup.controls['ledgerAlias'].setValue(this.salesLedger.ledgerAlias);
        this.firstFormGroup.controls['associateHomeBranch'].setValue(this.salesLedger.associateHomeBranch);
        this.firstFormGroup.controls['ifBranch'].setValue(this.salesLedger.ifBranch);
        this.firstFormGroup.controls['groupId'].setValue(this.salesLedger.groupId);
        this.firstFormGroup.controls['subGroupId'].setValue(this.salesLedger.subGroupId);
        this.firstFormGroup.controls['address1'].setValue(this.salesLedger.address1);
        this.firstFormGroup.controls['address2'].setValue(this.salesLedger.address2);
        this.firstFormGroup.controls['affectInventory'].setValue(this.salesLedger.affectInventory);/* 
        this.firstFormGroup.controls['bankAccountNumber'].setValue(this.salesLedger.bankAccountNumber);
        this.firstFormGroup.controls['bankAddress'].setValue(this.salesLedger.bankAddress);
        this.firstFormGroup.controls['bankName'].setValue(this.salesLedger.bankName); */
        this.firstFormGroup.controls['cityName'].setValue(this.salesLedger.cityName);
        this.firstFormGroup.controls['state'].setValue(this.salesLedger.state); 
        this.firstFormGroup.controls['gst'].setValue(this.salesLedger.gst);
        this.firstFormGroup.controls['panno'].setValue(this.salesLedger.panno);
        this.firstFormGroup.controls['pinCode'].setValue(this.salesLedger.pinCode);
        /*
        this.firstFormGroup.controls['ifscCode'].setValue(this.salesLedger.ifscCode); */
        console.log(this.salesLedger.fileUploadId);
        this.bankDetailsList=this.salesLedger.bankdetails
        this.fileIds=this.salesLedger.fileUploadId;
        console.log(this.homeselected)
        console.log(response);  
        console.log(this.LedgerType);  
                       
      }
    ));
    console.log(this.salesLedger);
  }

  getGroupId(name){
    console.log(name)
    this._saleLedgerService.getGroupId(name).subscribe(
      (resposne)=>{
        console.log(resposne);
        this.groupdetails=resposne;
      }
    );
  }

  getSubGroupId(groupid){
    console.log(groupid)
    this._saleLedgerService.getSubGroupId(groupid).subscribe(
      (resposne)=>{
        console.log(resposne);
        this.subgroupdetails=resposne;        
      }
    );
  }

  getFileId(event){
      console.log(event);
      this.fileIds=event;
      console.log(this.fileIds)
      
  }

  AddBankDetails(){
    this.bankDetails=new Ledgerbankdetails();
    this.bankFormGroup.reset();
    this.visibleBankDetails=true

  }
  AddBank(){

    
    this.bankDetailsList.push(this.bankDetails);
    this.bankDetails=new Ledgerbankdetails();
    this.bankFormGroup.reset();
    Swal.fire("Success","Bank added successfully...")
  }

  removeBank(event){
    
    if(event.bankdetailsid!=0){
    
      console.log("bank Needs to be deleted "+event);
      this.removedbankDetailsList.push(event)
        
    }
    else{
      console.log(event)
    }
    
    this.bankDetailsList.splice(this.bankDetailsList.findIndex((item)=>item==event),1)
    console.log("bank need to be deleted "+this.removedbankDetailsList.forEach((x)=>{console.log(x)}))
  }
}
