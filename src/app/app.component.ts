import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fnaclientv1';
  sideBarOpen=false;

  togglesidebar(){
    this.sideBarOpen=!this.sideBarOpen;
  }
}
