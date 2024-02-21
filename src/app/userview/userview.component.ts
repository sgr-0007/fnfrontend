import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit {

  title = 'fnaclientv1';
 sideBarOpen=false;
  constructor(public router: Router) { }

  ngOnInit(): void {
   
    
  }
  togglesidebar(){
    this.sideBarOpen=!this.sideBarOpen;
  }


}
