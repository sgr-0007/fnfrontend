import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { RegistrationService } from 'src/app/registration.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  


  isOpen:boolean=false;
  constructor(private regService: RegistrationService) { }

  ngOnInit(): void {


  }


  toggleSidebar() {
    console.log("Is Opened"+this.isOpen)
    if(this.isOpen==true)
    this.isOpen=false;
    this.toggleSideBarForMe.emit();
    
  } 

  checkuser(name: string): boolean {
    let status = true;
    const userMod = sessionStorage.getItem('usermodules');
    // console.log(userMod);
    if(userMod!=='null')
    {

    const userModules = JSON.parse(userMod);
    // console.log(userModules);
    (userModules).forEach((x) => {
      if (name === x.filemaodulename)
        status = false;

    })
    return status;

  }
  else
  {
    return status;
  }
  }

}
