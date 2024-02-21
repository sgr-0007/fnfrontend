import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';

import { map, Observable } from 'rxjs';
import { Userpath } from '../models/userpath';
import { UsermasterService } from '../services/usermaster.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  loginuid: number = +sessionStorage.getItem("loginid");
  userpath:Userpath=new Userpath();
  constructor(private user:UsermasterService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("RouteURL"+route.url);
      console.log("RouteURL"+route.url.toString);
      console.log("State Route"+state.url)
      console.log("user"+this.loginuid)
      this.userpath.path=state.url;
      this.userpath.userid=this.loginuid;
     return new Promise((resolve)=>this.user.checkModuleByUser(this.userpath).subscribe(
      (response)=>{
          console.log(response);
          let am:boolean=response;
          if(am)
          resolve(true);
          else
          resolve(false);
      }
     ));
     
    
  }
  
}
