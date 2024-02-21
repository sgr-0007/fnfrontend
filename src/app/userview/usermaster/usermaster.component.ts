import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Usermaster } from 'src/app/models/usermaster.model';
import { UsermasterService } from 'src/app/services/usermaster.service';
import { Department } from 'src/app/models/department.model';
import { Desgination } from 'src/app/models/desgination.model';
import { Post } from 'src/app/models/post.model'
import Swal from 'sweetalert2';
import { CheckUniqueService } from 'src/app/services/checkunique.service';
import { InputText } from 'primeng/inputtext';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { User } from 'src/app/user';
//import { DIR_DOCUMENT_FACTORY } from '@angular/cdk/bidi/dir-document-token';
import FileSaver from 'file-saver';

@Component({
  selector: 'app-usermaster',
  templateUrl: './usermaster.component.html',
  styleUrls: ['./usermaster.component.css'],
  styles: [`
        :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
            position: -webkit-sticky;
            position: sticky;
            top: 1rem;
        }

        .layout-news-active :host ::ng-deep .p-datatable tr > th {
            top: 2rem;
        }
    `]
})
export class UsermasterComponent implements OnInit {
  exportColumns: any[];

  first = 0;
  mobilenumberunique=false;
  displayViewDialog! : boolean;
  rows = 10;
  loading: boolean = true;
  usernameonedit: string;
  empidonedit: string;
  check: Boolean;
  constructor(private render:Renderer2, private datePipe: DatePipe,private usermasterservice: UsermasterService, private checkuniqueservice: CheckUniqueService) { }
  users: Usermaster[] = []
  ogdepartments: Department[] = []
  currentdepartments: Department[] = []
  desginations: Desgination[] = []
  posts: Post[] = []

  cols:any[];

  SelectedUser!: Usermaster;
  SelectedDepartment!: Department;
  SelectedDepartmentCurrent!: Department;
  selectedReportingmanager:Usermaster=new Usermaster();
  SelectedDesignation!: Desgination;
  SelectedPost!: Post;
  displayDialog!: boolean;
  displayDialogView = false;
  groupForDialog!: Usermaster;
  usernameunique!: boolean;
  emloyeeidunique!: boolean;
  selectedmodileno:string;
  submitted!: boolean;
  dateTime = new Date();
  changedempid:boolean=false;
  changedusername:boolean=false;
  @ViewChild('fullNameControl',{static:false}) textInput:ElementRef<any>|undefined;
  ngOnInit(): void {
    this.retrieveUsers();
    this.retrieveDepartmentddl();
    this.retrieveDepartmentddlcurrent();
    this.retrieveDesignationddl();
    //this.retrievePosts();
    this.dateTime.setDate(this.dateTime.getDate());
    this.cols = [
      { field: "employeeId", header: "Employee Id" },
      { field: "userfirstname", header: "First Name" },
      { field: "mobilenumber", header: "" },
      { field: "designationname", header: "User Name" },
      { field: "officename", header: "Email Id" },
      { field: "sectionname", header: "Mobile #" }
    ];
    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));

  }

  checkusername(){
    this.changedusername=true;
  }

  checkEmployeeId(employeeid) {

    this.usermasterservice.checkemployeeid(employeeid).subscribe((response) => {
      this.emloyeeidunique = !response;
      console.log(this.emloyeeidunique)

    })
  }

  retrievePosts(): void {
    this.usermasterservice.getPosts()
      .subscribe({
        next: (data) => {
          this.posts = data;
          this.loading = false;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  retrieveDesignationddl(): void {
    this.usermasterservice.getDesignations()
      .subscribe({
        next: (data) => {
          this.desginations = data;
          this.loading = false;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  retrieveDepartmentddl(): void {
    this.usermasterservice.getDepartments()
      .subscribe({
        next: (data) => {
          this.ogdepartments = data;
          this.loading = false;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  retrieveDepartmentddlcurrent(): void {
    this.usermasterservice.getDepartmentsSections()
      .subscribe({
        next: (data) => {
          this.currentdepartments = data;
          this.loading = false;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  checkmanager(event){
    console.log(event.value)
    
   console.log(this.selectedReportingmanager=this.users.find((x)=>x.userid==event.value))
    console.log(this.selectedReportingmanager)
  }
  checkempid(){
    
    if(event!=null){
    const result =confirm("employee Id would be changed");
    if(result){
      console.log(this.textInput)
      document.getElementById('fullNameControl').focus()
      
    }else{

    }
  }
  }
  changestatus(event) {
    console.log(event.value)
    this.checkEmployeeId(event.value)
    this.changedempid=true;
    
  }
  retrieveUsers(): void {
    this.usermasterservice.getAllUsers()
      .subscribe({
        next: (data) => {
          this.users = data;
          console.log(this.users[0].dob);
           
           this.users.forEach((x)=>{
           
            if(x.dob!=null)
            {
            console.log(x.dob)
            console.log(this.datePipe.transform( new Date(x.dob), 'yyyy-mm-dd'))
            x.dob=new Date(this.datePipe.transform( new Date(x.dob), 'yyyy-MM-dd'))}
        }) 
          this.loading = false;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  clonedUsers: { [s: string]: Usermaster; } = {};


  onRowEditInit(user: Usermaster) {
    console.log('Row edit initialized');
    this.mobilenumberunique=false;
    this.selectedmodileno=user.mobilenumber;
    this.groupForDialog = { ...user };
    // const localtimestring = this.groupForDialog.dob.toLocaleDateString();
    console.log(this.groupForDialog);
    this.displayDialog = true;
    this.changedusername=false;
   this.changedempid=false;


  }
  chekuniqueMobileNumber(){
    console.log("selected mobileno"+this.selectedmodileno);
    if(this.selectedmodileno==this.groupForDialog.mobilenumber)
    {
      this.mobilenumberunique=false;
    }else{

    
    console.log(this.groupForDialog.mobilenumber);
   this.usermasterservice.checkUniqueMobileNumber(this.groupForDialog.mobilenumber).subscribe((response)=>{
    this.check=response;
    console.log(response);
    if(response==true){
      this.mobilenumberunique=true;
    }
    else{
      this.mobilenumberunique=false;
    }
  })
}
  /* console.log("Check booeal"+this.check)
    if(this.groupForDialog.mobilenumber==this.selectedmodileno){
      return false;
    } */
   /*  if(this.groupForDialog.mobilenumber!=null){
    (this.users.find((x)=>{if(x.mobilenumber===this.groupForDialog.mobilenumber) console.log(x)}))
    
    if(this.users.find((x)=>x.mobilenumber==this.groupForDialog.mobilenumber))
    {
        this.mobilenumberunique=true;
        console.log("Mobile Number Unique"+this.mobilenumberunique)
      return true;

    }
  } *//* 
  this.mobilenumberunique=false;
  console.log("Mobile Number Unique"+this.mobilenumberunique)
    return false; */
  }

  onRowView(user1: Usermaster){
    this.groupForDialog = { ...user1 };
    this.displayViewDialog=true;
  }
  onRowEditSave(id: number, user: Usermaster) {
    console.log('Row edit saved');
    console.log(user);

    this.checkuniqueservice.checkUniqueEid(id, user.employeeId.trim(), 'checkeiduniqueonedit').subscribe({
      next: (uniquedata) => {


        if (uniquedata == false) {
          this.ngOnInit();
          this.alertUniqueError();
        }
        else {
          this.usermasterservice.update(id, user)
            .subscribe(data => {
              this.ngOnInit();
              this.alertUpdate();
              this.displayDialog = false;
              this.changedusername=false;
              this.changedempid=false;
            });
        }
      },

      error: (e) => console.error(e)

    });

  }
  onRowEditCancel(user: Usermaster, index: number) {
    console.log('Row edit cancelled');
    this.users[index] = this.clonedUsers[user.userfirstname!];
    delete this.clonedUsers[user.userfirstname!];
  }


  onUserAdd() {
    this.groupForDialog = {
      userfirstname: null!, usermiddlename: null!, userlastname: null!, userloginname: null!, emailid: null!, mobilenumber: null!, dob: null!, reportingmanager: null!, designationid: null!, originaldepartment: null!, currentdepartment: null!, post: null!, password: null!
      ,rmdesigntion:null!
    };
    this.displayDialog = true;
    this.changedusername=false;
   this.changedempid=false;
   this.selectedReportingmanager.designationname=null;
      


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
    return this.users ? this.first === (this.users.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.users ? this.first === 0 : true;
  }
  alertUpdate() {
    Swal.fire({
      text: 'User updated successfully!',
      icon: 'success'
    })
  }
  alertSave() {
    Swal.fire({
      text: 'User saved successfully!',
      icon: 'success'
    })
  }
  alertUniqueError() {
    Swal.fire({
      text: 'EmployeeID should be unique!',
      icon: 'warning'
    })
  }
  saveUser(form) {

    if (this.groupForDialog.userid!=null || this.groupForDialog.userid!=undefined)
    {
      console.log("username"+this.changedusername)
      console.log("emp"+this.changedempid)
      if( this.changedempid || this.changedusername || this.mobilenumberunique){
        const result=confirm("Do you want to change Employee Id or Username")
        if(result){
          console.log(this.groupForDialog.userid)
      this.groupForDialog.designation = this.groupForDialog.designationid;
      this.groupForDialog.originaldepartment = this.groupForDialog.officenameid;
      this.groupForDialog.currentdepartment = this.groupForDialog.sectionnameid;
      this.groupForDialog.reportingmanager = (this.groupForDialog.reportingmanager == null)?0:this.groupForDialog.reportingmanager;
      console.log("date String"+this.groupForDialog.dob);
      //this.groupForDialog.dob=new Date(this.datePipe.transform(this.groupForDialog.dob,'dd/mm/yyyy'))
      /* this.groupForDialog.dob =new Date(this.datePipe.transform( new Date(this.groupForDialog.dob), 'dd/mm/yy')); */
      console.log("date Object"+this.groupForDialog.dob);
      this.onRowEditSave(this.groupForDialog.userid,this.groupForDialog);

        }
      }else{
        console.log(this.groupForDialog.userid)
      this.groupForDialog.designation = this.groupForDialog.designationid;
      this.groupForDialog.originaldepartment = this.groupForDialog.officenameid;
      this.groupForDialog.currentdepartment = this.groupForDialog.sectionnameid;
      
      console.log("date String"+this.groupForDialog.dob);
      
      /* this.groupForDialog.dob =new Date(this.datePipe.transform( new Date(this.groupForDialog.dob), 'dd/mm/yy')); */
      console.log("date Object"+this.groupForDialog.dob);
      this.groupForDialog.reportingmanager = (this.groupForDialog.reportingmanager == null)?0:this.groupForDialog.reportingmanager;
      console.log(this.groupForDialog.reportingmanager);
      this.onRowEditSave(this.groupForDialog.userid,this.groupForDialog);
          
      }
      
    }
    else {
      console.log(this.groupForDialog.userid)

      this.submitted = true;

      for (let index = 0; index < this.users.length; index++) {
        console.log('users');
        if (this.users[index].userloginname == this.groupForDialog.userloginname) {
          console.log(this.users[index].userloginname)

          console.log(this.groupForDialog.userloginname)

          this.usernameunique = false;

          break;
        }
        else {
          this.usernameunique = true;
        }
      }
      if (this.usernameunique && this.emloyeeidunique) {
        console.log('User Saved');
        this.groupForDialog.designation = this.groupForDialog.designationid;
        this.groupForDialog.originaldepartment = this.groupForDialog.officenameid;
        this.groupForDialog.currentdepartment = this.groupForDialog.sectionnameid;
        this.groupForDialog.reportingmanager=(this.selectedReportingmanager.userid==null)?0 :this.selectedReportingmanager.userid;
        console.log(this.groupForDialog);
        this.usermasterservice.create(this.groupForDialog)

          .subscribe(data => {
            this.ngOnInit();
            this.alertSave();
            form.clear();
          });
        this.displayDialog = false;

      }
    }

  }

  exportPdf() {
    const rows=[];
    this.users.forEach(elm => {
      const temp = [ elm.employeeId, elm.userfirstname, elm.usermiddlename, elm.userloginname, elm.emailid, elm.mobilenumber, elm.dob, elm.designation, elm.officename, elm.sectionname, elm.post, elm.password];
      rows.push(temp);
      console.log('Rows', rows); // showing all data
    });
    let doc = new jsPDF();
    autoTable(doc,{
      columns:this.exportColumns,
      body:rows
    });
    doc.save('User.pdf');
    
    
  }
  exportExcel() {
    let usersort:User[];
    console.log(this.users.map((x)=>{Userfirstname:x.userfirstname}));
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.users); // Sale Data
        const workbook = { Sheets: { 'user': worksheet }, SheetNames: ['user'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "user");
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



