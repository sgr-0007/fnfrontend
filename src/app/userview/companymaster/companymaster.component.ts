import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { City } from 'src/app/models/city';
import { Companymaster } from 'src/app/models/companymaster.model';
import { Companytype } from 'src/app/models/companytype.model';
import { State } from 'src/app/models/state';
import { CheckUniqueService } from 'src/app/services/checkunique.service';
import { CompanymasterService } from 'src/app/services/companymaster.service';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import FileSaver from 'file-saver';




@Component({
  selector: 'app-companymaster',
  templateUrl: './companymaster.component.html',
  styleUrls: ['./companymaster.component.css'],
  styles: [`
  :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
      position: -webkit-sticky;
      position: sticky;
      top: 1rem;
  }

  .layout-news-active :host ::ng-deep .p-datatable tr > th {
      top: 1rem;
  }
`]
})



export class CompanymasterComponent implements OnInit {
  isactive = [
    { label: "Active" , value :true},
    { label: "InActive" ,  value :false },
  ];
  isShown: boolean = false 
  // companytype = [
  //   { label: "HO" , value :1},
  //   { label: "RMO" ,  value :2 },
  //   { label: "Branch" ,  value :3 },
  //   { label: "DOA" ,  value :4 },
  // ];

  // regionaloffice = [
  //   { label: "RMO1" , value :1},
  //   { label: "RMO2" ,  value :2 },
  // ];

  // branch = [
  //   { label: "BANGALORE" , value :1},
  //   { label: "HYDERABAD" ,  value :2 },
  // ];

  companies : Companymaster[] = []
  cities:City[]=[]
  selectedCity!: City;
  states:State[]=[]
  selectedState! :State;
  selectedCompanyType!:Companytype;
  CompanyTypes:Companytype[]=[]
  displayDialog!: boolean;
  displayViewDialog!:boolean;
  groupForDialog!: Companymaster;
  SelectedCompany:Companymaster[]=[];
  stateName:State=new State();
  stateNames:State[]=new Array<State>();
 cityName:City=new City();
 //selectedCity:City=new City();
 cityNames:City[]=new Array<City>();
 selectedCityNames:City[]=new Array<City>();
  //isShown: boolean = false 
  div1:boolean=true;
  div2:boolean=true;
  div3:boolean = true;
  div4:boolean = true;
  div5:boolean = true;
  div6:boolean = true;
  selectedRO: Companymaster;

 first = 0;
 rows = 11;
 loading: boolean = true;
 compnameunique : boolean = true;
 submitted:boolean;
  compnameonedit: string;
  newMsg: string;
  groupForDialogEdit: { companyname?: string; tannumber?: string; companyaddress1?: string; companyaddress2?: string; cityid?: number; stateid?: number; pin?: string; website?: string; emailid?: string; gsttin?: string; pan?: string; phone?: string; mobile?: string; companytypeid?: number; regionaloffice?: string; branchid?: String; isactive?: boolean; companyid?: number; };
  rmoDdl: string;
 constructor(private companyservice : CompanymasterService , private checkuniqueservice : CheckUniqueService) { }
 exportColumns: any[];
 cols:any[];

 ngOnInit(): void {
  this.retrieveCompaines();
  
  this.retrieveStateddl();
  this.retrieveROddl();
  this.cols = [
    { field: "companyname", header: "Company Name" },
    { field: "tannumber", header: "Tan Number" },
    { field: "companyaddress1", header: "Company Address1" },
    { field: "companytypename", header: "Companytype Name" },
    { field: "statename", header: "State" },
    { field: "cityname", header: "City" },
    { field: "emailid", header: "Email Id" },
    { field: "isactive", header: "Status" }
  ];
  this.exportColumns = this.cols.map(col => ({
    title: col.header,
    dataKey: col.field
  }));

}

// selectedHandler(event:any)
// {
//   console.log(this.SelectedValue)
//   this.SelectedValue=event.target.value; 
// }
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
  return this.companies ? this.first === (this.companies.length - this.rows): true;
}

isFirstPage(): boolean {
  return this.companies ? this.first === 0 : true;
}
alertUpdate(){
  Swal.fire( {
  text: 'Company updated successfully!',
  icon: 'success'})
}
alertSave(){
  Swal.fire({
    text: 'Company saved successfully!',
    icon: 'success'})
}
onChange1(event: any) {
  console.log(event.value);
  this.retrieveCityddl(event.value);
  
}
//  RegionalOfficeMethod(ro:any) {
//   console.log("Hello " + ro);
// }
// passFromValue(ro:any){
//   var x = ro;
//   return x;  
// }
// passToValue() {
//   var y = passFromValue()
//   console.log(y);//15
// }
// timestart(that) 
// {
//     var x = Object;
//     that.value = x;
//     console.log(x)
	
// }
 func2(msg:any){
  console.log(msg);
  return msg;
  
}


  onChange(companytypeid: any) {
  console.log('event :' +companytypeid);

  if(companytypeid==1)
  {
    this.divFunction3()
  }
  if(companytypeid==2)
  {
    this.divFunction1()
  }
  if(companytypeid==3)
  {
    this.divFunction2()
    this.companyservice.getBranchByCompanyTypeid(2).subscribe((response)=>{
      console.log(response)
      this.SelectedCompany = response;
    })
  }
  if(companytypeid==4)
  {
    this.divFunction3()
  }
  
}
divFunction3(){
  this.div1=false;
  this.div2=false;
  this.div3=false;
  this.div4=false;
  this.div5 = false;
  this.div6 = false;
}
divFunction1(){
  this.div1=false;
  this.div2=false; 
  this.div3 =true;
  this.div4 = false;
  this.div5 = true;
  this.div6 =false;
}
divFunction2(){
  this.div1=true;
  this.div2=false;
  this.div3 =true;
  this.div4=true;
  this.div5 = false;
  this.div6 = true;
}
retrieveCompaines(): void {
  this.companyservice.getNative()
    .subscribe({
      next: (data) => {
        console.log(data)
        this.companies = data;
         this.loading = false;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
  retrieveCityddl(stateid): void {
    this.companyservice.getCities(stateid)
      .subscribe({
        next: (data) => {
          this.cities = data;
           this.loading = false;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
    }
    retrieveStateddl(): void {
      this.companyservice.getState()
        .subscribe({
          next: (data) => {
            this.states = data;
             this.loading = false;
            console.log(data);
          },
          error: (e) => console.error(e)
        });
      }
      retrieveROddl(): void {
        this.companyservice.getCompanyType()
          .subscribe({
            next: (data) => {
              this.CompanyTypes = data.filter(x=>x.companytype!=4);
               this.loading = false;
              console.log(data);
            },
            error: (e) => console.error(e)
          });
        }
        ResetComponent()
        {
          this.groupForDialog = {
        
            companyname: null!,tannumber: null!,companyaddress1: null!,companyaddress2: null!,cityid: null!,stateid: null!,pin: null!,website: null!,emailid: null!,gsttin: null!,pan: null!,mobile: null!,phoneama: null!,phoneas: null!,companytypeid: null!,regionaloffice: null!,branchid: null!,isactive: null!
            //gsttin: null!, groupdescription: null!, isactive: null!
        };
        
          this.displayDialog = true;
          this.selectedRO = null;
        this.rmoDdl = null;
          this.submitted =false;
      }
    clonedCompanies: { [s: string]: Companymaster; } = {};

    onRowEditInit(company: Companymaster) {
      console.log('Row edit initialized');
      this.groupForDialog = { ...company };
      this.retrieveCityddl(this.groupForDialog.stateid);
      console.log(this.groupForDialog);
      if(this.groupForDialog.companytypeid==1)
      {
        this.divFunction3()
      }
      if(this.groupForDialog.companytypeid==2)
      {
        this.divFunction1()
      }
      if(this.groupForDialog.companytypeid==3)
      {
        this.divFunction2()
        this.companyservice.getBranchByCompanyTypeid(2).subscribe((response)=>{
          console.log(response)
          this.SelectedCompany = response;
          this.selectedRO = this.SelectedCompany.find(x=>x.regionaloffice==this.groupForDialog.regionaloffice);
        console.log(this.selectedRO);
        })
      }
      if(this.groupForDialog.companytypeid==4)
      {
        this.divFunction3()
      }



      this.displayDialog = true;

    }
    onRowView(company1: Companymaster){
      this.groupForDialog = { ...company1 };
      console.log(this.groupForDialog)
      this.displayViewDialog=true;
    }

    onRowEditSave(id : number ,company: Companymaster) {
      console.log('Row edit saved');
      this.checkuniqueservice.checkUnique(id,company.companyname.trim(),'checkcompanyuniqueonedit').subscribe({
      next:(uniquedata)=> { 
        if(uniquedata == false) { 
          this.ngOnInit();
          this.alertUniqueError(); 
        }  
        else{
          this.rmoDdl= (this.selectedRO==null)?'':this.selectedRO.regionaloffice;
          if(this.rmoDdl=='')
          {
   
            company.regionaloffice =  company.regionaloffice;
          }
          else
          {
            company.regionaloffice = this.selectedRO.regionaloffice;
          }

        this.companyservice.update(id,company)
        .subscribe( data => {
          this.ngOnInit();
          this.alertUpdate();
          this.displayDialog = false;

        });
      }
      },
  
      error :(e) =>console.error(e)
  
      });
    }
    alertUniqueError(){
      Swal.fire({
        text: 'Company name should be unique!',
        icon: 'warning'})
    }
    onRowEditCancel(company: Companymaster, index: number) {
      console.log('Row edit cancelled');
      this.companies[index] = this.clonedCompanies[company.companyname!];
      delete this.clonedCompanies[company.companyname!];
    }
  
    onCompanyAdd(){
      this.groupForDialog = {
        companyname: null!, tannumber: null!, companyaddress1: null!, companyaddress2: null!,cityid: null!,stateid: null!,pin: null!,website: null!,emailid: null!,gsttin:null!,pan: null!,phoneama: null!,phoneas: null!,mobile:null!,companytypeid:null!,regionaloffice:null!,branchid:null!,isactive:null!
    };
      this.displayDialog = true;
      this.selectedRO = null;
      this.rmoDdl = null;
    }
    toggleShow() {

      this.isShown = this.isShown;
      
      }
    saveComponent(){
if(this.groupForDialog.companyid !=null ||this.groupForDialog.companyid !=undefined){
  this.submitted = true;
  let uniquekey= this.groupForDialog.companyname.replace(/\s/g, "").toLowerCase()
  for (let index = 0; index < this.companies.length; index++) {
    if((this.companies[index].companyname.replace(/\s/g, "").toLowerCase() == uniquekey)){
      continue;
    }else
    if (this.companies[index].companyname.replace(/\s/g, "").toLowerCase() == this.groupForDialog.companyname.replace(/\s/g, "").toLowerCase())
    {
      console.log(this.companies[index].companyname)
      console.log(this.groupForDialog.companyname)
      this.compnameunique = false;
      break;
    }
    else{
      this.compnameunique = true;
    }      
  }

   if(this.compnameunique)
  {
  this.onRowEditSave(this.groupForDialog.companyid,this.groupForDialog);
  }
}
      else
      {
      console.log('Company Saved');
      this.submitted = true;
      console.log(this.groupForDialog);
      for (let index = 0; index < this.companies.length; index++) {
        if (this.companies[index].companyname.replace(/\s/g, "").toLowerCase() == this.groupForDialog.companyname.replace(/\s/g, "").toLowerCase())
        {
          console.log(this.companies[index].companyname)
          console.log(this.groupForDialog.companyname)
          this.compnameunique = false;
          break;
        }
        else{
          this.compnameunique = true;
        }      
      }
    
       if(this.compnameunique)
      {
      // this.groupForDialog.stateid = this.stateName.stateid;
      // this.groupForDialog.cityid = this.cityName.cityid;
      // this.groupForDialog.companytypeid = this.selectedCompanyType.companytype;
      //var x =passFromValue();
      // var msg1 = this.func2(msg1); 
       this.rmoDdl= (this.selectedRO==null)?'':this.selectedRO.regionaloffice;
       if(this.rmoDdl=='')
       {

        this.groupForDialog.regionaloffice = this.groupForDialog.regionaloffice;
       }
       else
       {
        this.groupForDialog.regionaloffice = this.selectedRO.regionaloffice;
       }
        
      console.log(this.groupForDialog);
      this.companyservice.create(this.groupForDialog)
      
      .subscribe( data => {
        this.ngOnInit();
        this.alertSave();
      });
      this.displayDialog = false;
    }
  }
    }
  
  clear(table: Table) {
    table.clear();
  }
  
  exportPdf() {
    const companies=[];
    this.companies.forEach(elm => {
      const temp = [ elm.companyname, elm.tannumber, elm.companyaddress1, elm.companytypename, elm.statename, elm.cityname, elm.emailid, elm.isactive];
      companies.push(temp);
      console.log('Companymaster', companies); // showing all data
    });
    let doc = new jsPDF();
    autoTable(doc,{
      columns:this.exportColumns,
      body:companies
    });
    doc.save('Branch.pdf');
    
    
  }
  exportExcel() {
    let companysort:Companymaster[];
    console.log(this.companies.map((x)=>{Branchname:x.companyname}));
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.companies); // Sale Data
        const workbook = { Sheets: { 'branch': worksheet }, SheetNames: ['branch'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "branch");
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
   
  }

  }

