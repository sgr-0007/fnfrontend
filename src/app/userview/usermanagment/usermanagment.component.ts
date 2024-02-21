import { Component, OnInit } from '@angular/core';
import { Companymaster } from 'src/app/models/companymaster.model';
import { Dofficebyrole } from 'src/app/models/dofficebyrole';
import { Modulebyrole } from 'src/app/models/modulebyrole';
import { Moduletype } from 'src/app/models/moduletype';
import { Officebyrole } from 'src/app/models/officebyrole';
import { Role } from 'src/app/models/role.model';
import { Userrolemodule } from 'src/app/models/userrolemodule';
import { RegistrationService } from 'src/app/registration.service';
import { CompanymasterService } from 'src/app/services/companymaster.service';
import { ModuleService } from 'src/app/services/module.service';
import { RoleService } from 'src/app/services/role.service';
import { User } from 'src/app/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usermanagment',
  templateUrl: './usermanagment.component.html',
  styleUrls: ['./usermanagment.component.css']
})
export class UsermanagmentComponent implements OnInit {
  companies : Companymaster[] = [];
  usermappingexist:boolean=false;
  user:User[]=[];
  roles : Role[] = [];
  moduletype:Moduletype[]=[];
  checkbox:boolean=false;
  selectedUser:User;
  selectedRole:Role;
  modulebyrole:Modulebyrole;
  selectedOfficies:Companymaster[];
  selectedModules:Array<Moduletype>=new Array();
  defaultModules:Dofficebyrole[];
  userrolemodule:Userrolemodule=new Userrolemodule();
  retrieveduserrolemodule:Array<Userrolemodule>=[];
  officebyrole:Officebyrole=new Officebyrole();
  retrieveofficebyuser:Array<Officebyrole>=[];
  constructor(private companyservice : CompanymasterService,
    private _service : RegistrationService,
    private roleservice : RoleService,
    private _module:ModuleService) { }
      
  ngOnInit(): void {
    this.retrieveCompaines();
    this.retrieveUser();
    this.retrieveRoles();
    this.retrieveModules();
  }

  retrieveModulesByRole(role:number){
    this._module.getModulesByRole(role).subscribe((response)=>{
      this.modulebyrole=response;
    })
  }

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
    retrieveUser(): void {
      this._service.getUserDetails()
        .subscribe({
          next: (data) => {
            this.user = data;
             
            console.log(data);
          },
          error: (e) => console.error(e)
        });
      }
      retrieveRoles(): void {
        this.roleservice.getAll()
          .subscribe({
            next: (data) => {
              this.roles = data.filter(x=>x.roleid!=9);
               
              console.log(data);
            },
            error: (e) => console.error(e)
          });
      }
      retrieveModules(): void {
        this._module.getModules()
          .subscribe({
            next: (data) => {
              this.moduletype = data;
               
              console.log(data);
            },
            error: (e) => console.error(e)
          });
      }

      getDefaultModule(){
        
        this.selectedModules=[];
        this.checkbox=true;
        console.log(this.selectedRole)
        this._service.getOfficeByRole(this.selectedRole.roleid).subscribe((response)=>{
          console.log("resposne"+response)
          this.defaultModules=response;
          this.defaultModules.forEach((x)=>{
            this.moduletype.forEach((y)=>{
              if(x.moduleid===y.filemoduletypeid)
              {
                console.log(x)
                console.log(y)
                this.selectedModules.push(y)
                console.log(this.selectedModules)
                this.checkbox=true;
                
              }
            }
            
            )
            this.selectedModules=[...this.selectedModules]  
          })
        });
        
      }

      checkUserExistOrnot(){
        this.selectedUser
          this._service.getModuleRoleByUser(this.selectedUser.userid).subscribe((response)=>{
            console.log(response);
            this.retrieveduserrolemodule=response;

            
            console.log(this.retrieveduserrolemodule)
         
            if(this.retrieveduserrolemodule.length){
              this.usermappingexist=true;
            this.roles.find((x)=>{
              if(this.retrieveduserrolemodule[0].roleid==x.roleid){
                this.selectedRole=x;
                console.log("Role for usermodulerole"+this.selectedRole)
                
              }
            })
            this.selectedModules=[];

            this.retrieveduserrolemodule.forEach((x)=>{
              this.moduletype.forEach((y)=>{
                if(x.moduleid==y.filemoduletypeid){
                  this.selectedModules.push(y)
                      
                }
                
              })
              
             })

             console.log(this.selectedModules)
             this.checkbox=true;
             this.selectedModules=[...this.selectedModules]  
          
            }
            })

          this.selectedOfficies=[];
           this._service.getOfficeByUser(this.selectedUser.userid).subscribe((resposne)=>
           {
              this.retrieveofficebyuser=resposne;
              console.log(this.retrieveofficebyuser);
              this.retrieveofficebyuser.forEach((x)=>{
                this.companies.forEach((y)=>{
                if(x.officeid==y.companyid){
                  console.log("select"+y)
                  this.selectedOfficies.push(y)
                }
                }
                )
              })
             
           this.selectedOfficies=[...this.selectedOfficies]
           console.log("officeby user"+this.selectedOfficies)
           
           })
        
      }
      
      assign(){
        console.log(this.selectedUser)
        console.log(this.selectedRole)
        console.log(this.selectedOfficies)
        console.log(this.selectedModules.map((x)=>x.filemoduletypeid));
        this.userrolemodule.userid=this.officebyrole.userid=this.selectedUser.userid;
        this.userrolemodule.roleid=this.selectedRole.roleid;
        this.userrolemodule.modulelist=   this.selectedModules.map((x)=>x.filemoduletypeid); 
      this.officebyrole.officelist=this.selectedOfficies.map((x)=>x.companyid);
        console.log(this.userrolemodule);
        console.log(this.officebyrole);
        this.submit(this.userrolemodule,this.officebyrole)

      }

submit(userrole,officerole){ 

  this._module.assignUserRoleModule(userrole).subscribe((response)=>{ 
  });
  this._module.assignOfficeByRole(officerole).subscribe((response)=>{
    Swal.fire("Success!","Assigned Successfuly");
    this.reset();
  },(error)=>{
    Swal.fire("Error !","Error Occured")
  
  })

}

reset(){
  this.selectedModules=[];
  this.selectedOfficies=[];
  this.selectedRole=null;
  this.selectedUser=null;
  this.ngOnInit();
}

}
