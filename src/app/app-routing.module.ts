import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginresetComponent } from './components/loginreset/loginreset.component';


const routes: Routes = [

  {path:'', redirectTo: 'login', pathMatch: 'full'},
  
  { path: 'login', component: LoginComponent},
  { path: 'reset', component: LoginresetComponent},
  {path: 'userview', loadChildren: () => import('./userview/userview.module').then(m => m.UserviewModule) }


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
