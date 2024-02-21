import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Companymaster } from 'src/app/models/companymaster.model';
import { Lastlogin } from 'src/app/models/lastlogin';

import { RegistrationService } from 'src/app/registration.service';
import { CompanymasterService } from 'src/app/services/companymaster.service';
import { LastloginserviceService } from 'src/app/services/lastloginservice.service';
import { UsermasterService } from 'src/app/services/usermaster.service';
import { VoucherService } from 'src/app/services/voucher.service';

import { User } from 'src/app/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User();
  lastlogindetails:Lastlogin;
  msg='';
  userModules: User[];
  companies : Companymaster[] = []

 
  constructor(private lastlogin:LastloginserviceService,private companyservice : CompanymasterService,private voucherservice: VoucherService ,private _service : RegistrationService, private _router : Router,private _uservice : UsermasterService ) { }

  ngOnInit(): void {
    this.retrieveCompaines();
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
  
  loginuser(){
    this._service.loginUserFromRemote(this.user).subscribe(
      {
        next : (data) =>{      

          this.voucherservice.getCompaniesByUserCompany(data.userid,this.user.companyid)
          .subscribe({
            next: (cdata) => {  
              sessionStorage.setItem("companyidlogin",cdata.companyid);          
              console.log(cdata);
              console.log(this.user);
              this._router.navigate(['/userview'])
              console.log(data)
              this.user=data;
              this.lastlogin.saveLastLogin(this.user.userid).subscribe((reponse)=>{
                this.lastlogindetails=reponse; 
                console.log(this.lastlogindetails);
               });
              sessionStorage.setItem("logedinusername",this.user.userloginname)
              const uid = this.user.userid.toString();
              sessionStorage.setItem("loginid",uid);
              this._uservice.userModuleCheck(+uid).subscribe(
                data=>{
                  sessionStorage.setItem('usermodules',JSON.stringify(data));
                  console.log(JSON.stringify(data));
                   
                }
                
              )
            },
            error: (e) => {   console.error(e)
              this.msg="Invalid Company!";}
          }); 

      

        },
        error: (e) => {
          console.error(e)
          this.msg="Bad Credentials, please Enter valid username and password";
        }
      }
    )

  }

}
