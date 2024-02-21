import { Component, OnInit } from '@angular/core';
import {SafeResourceUrl , DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-groupreport',
  templateUrl: './groupreport.component.html',
  styleUrls: ['./groupreport.component.css']
})
export class GroupreportComponent implements OnInit {

reportUrl : SafeResourceUrl ;

uurlString : string = "http://localhost:52659/GroupReportViewer?balancesheetgroup=Liabilities";
  constructor(private _domsan  : DomSanitizer) {
    this.reportUrl = this._domsan.bypassSecurityTrustResourceUrl(this.uurlString);
   }

  ngOnInit(): void {
  }

}
