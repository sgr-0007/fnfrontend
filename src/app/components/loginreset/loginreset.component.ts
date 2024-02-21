import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/registration.service';
import { User } from 'src/app/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loginreset',
  templateUrl: './loginreset.component.html',
  styleUrls: ['./loginreset.component.css']
})
export class LoginresetComponent implements OnInit {
  user:User;
  constructor(private _service : RegistrationService,private _route:Router) { }

  ngOnInit(): void {
  }

  changepass(login:NgForm){
    this.user=login.value;
    console.log(this.user);
    alert("Do you want to change")
    this._service.updtaePassword(this.user).subscribe((response)=>{
        console.log(response);
        Swal.fire("Succesfully Changed the password");
        this._route.navigate(["/login"]);
    });

  }
}
