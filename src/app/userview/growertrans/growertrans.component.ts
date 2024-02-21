import { Component, OnInit } from '@angular/core';
import { concatMap, tap } from 'rxjs';
import { Aucbuyer } from 'src/app/models/aucbuyer';
import { Aucgrower } from 'src/app/models/aucgrower';
import { Companymaster } from 'src/app/models/companymaster.model';
import { AucledgerService } from 'src/app/services/aucledger.service';
import { CompanymasterService } from 'src/app/services/companymaster.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-growertrans',
  templateUrl: './growertrans.component.html',
  styleUrls: ['./growertrans.component.css']
})
export class GrowertransComponent implements OnInit {

  constructor(private ledger: AucledgerService,private companyservice : CompanymasterService ) { 
    
    this.isRowSelectable = this.isRowSelectable.bind(this);
  }
  purchaseData: Aucgrower[] = [];
  selectedData:Aucgrower[]=[];
  loading:boolean;
  first = 0;
  companies : Companymaster[] = [];
  filteredbranchid:number;
  rows = 10;
  
  ngOnInit(): void {
   
    this.retrieveCompaines();
  }
  isRowSelectable(event) {
    
    console.log("is row selectable")
    console.log("outof staock for approve"+
    !this.isAlreadyApproved(event.data));
    return !this.isAlreadyApproved(event.data);
    
}
filterbybranch(){
  this.loading=true
    
  this.renderaucgrower();
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

renderaucgrower(){
  this.ledger.getAuctionGrowerledger(this.filteredbranchid).subscribe((response)=>{
    this.purchaseData=response;
    this.loading=false;
  });
}

approveSelectedLdger(){
  if(this.selectedData.length==0){
    Swal.fire("Warning","No ledger is been selected");  
  }else{
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.selectedData.forEach(
          (x)=>{
            console.log(x);
            x.status=1;
            this.selectedData.push(x);
          }
        )
        
      }
    })



    this.approveBuyers();
  /* Swal.fire({
    title: 'Are you sure you want to approve all the selected ledger',
    icon: 'info',
    confirmButtonText: 'Log in'
  }).then((result) => {
    if (result['isConfirmed']){
      console.log(this.selectedData);
  this.selectedData.forEach(
    (x)=>{
      console.log(x);
      x.approvalStatus=this.Vlaues[2].valueid;
      this.updateStatus(x)
    }
  )
    }
  }) */
}
}
  
  isApproved(data){
    if(data.status==1)
    return true;
    else
    return false;
  }

  isAlreadyApproved(data) {
    console.log("approvalstatus:"+data.status)
    return (data.status === 1);
      }

      approveBuyers(){
        this.loading=true;
        console.log(this.selectedData)
        this.ledger.approveGrowerledger(this.selectedData).pipe(
          tap(
            (res)=>{
              Swal.fire("Success","Approved!")
            }
          )
        ).subscribe((response)=>{
          Swal.fire("Success","Approved!");
          
          this.selectedData=[];
     
          this.renderaucgrower();

        })
      }

      approveBuyer(data){
        this.loading=true;
        this.selectedData.push(data);
        console.log(this.selectedData)
          this.ledger.approveGrowerledger(this.selectedData).pipe(
            tap(
              (res)=>{
                Swal.fire("Success","Approved!")
              }
            )
          ,concatMap(
           res=>
            this.ledger.createBuyerledger() 
          )  
          ).subscribe((response)=>{
            Swal.fire("Success","Approved!");
            this.selectedData=[];
            this.renderaucgrower();
          })    
        }

}
