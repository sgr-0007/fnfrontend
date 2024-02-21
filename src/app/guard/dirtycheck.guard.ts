import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from '../interface/component-can-deactivate';

@Injectable({
  providedIn: 'root'
})
export class DirtycheckGuard implements  CanDeactivate<ComponentCanDeactivate> {
  /* canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  } */
  canDeactivate(
    component: ComponentCanDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(component.canDeactivate()){
        return true;
      }
      else{
        return confirm("Data will be lost if you leave the page, are you sure?");
      }

    return component.canDeactivate();
  }
  
}
