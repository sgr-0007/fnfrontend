import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Lastlogin } from 'src/app/models/lastlogin';
import { Userdetails } from 'src/app/models/userdetails';
import { LastloginserviceService } from 'src/app/services/lastloginservice.service';
import { UsermasterService } from 'src/app/services/usermaster.service';
import { User } from 'src/app/user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe:EventEmitter<any>=new EventEmitter();
  user:User;
   _uID: string;
   current_date:Date;
   userdetails:Userdetails;
   lastlogindetails:Lastlogin=new Lastlogin();
   
  constructor(private _route:Router ,private lastlogin:LastloginserviceService,private userdetailsService:UsermasterService) { }

  
  ngOnInit(): void {
   
    this.getUserId();
  }
  getUserId(){

    this._uID =  sessionStorage.getItem('loginid');
    console.log(this._uID);
   this.userdetailsService.getUserRoleOffice(this._uID ).subscribe(
    (data)=>{
        console.log(data)
        this.userdetails=data;
        console.log("lastlogin"+this.userdetails)
    }
   );
   

   this.lastlogin.getLastLogin(this._uID).subscribe((response)=>{
    this.lastlogindetails=response;
    console.log(this.lastlogindetails)
    this.current_date=new Date(this.lastlogindetails.logindate);
    console.log(this.current_date)
   })
   
 }
  getData() {
    return sessionStorage.getItem("logedinusername");
  }
  logout(){
    console.log(sessionStorage.removeItem("logedinusername"));
    this._route.navigate(['/login']);
  }
  toggleSidebar(){
  this.toggleSideBarForMe.emit();
  }

  
}
