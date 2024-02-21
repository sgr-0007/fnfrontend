import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { forkJoin, Observable } from 'rxjs';
import { FileUploadsInfo } from 'src/app/models/file.model';
import { Fileuploadlist } from 'src/app/models/fileuploadlist';
import { VoucherService } from 'src/app/services/voucher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-filesupload',
  templateUrl: './filesupload.component.html',
  styleUrls: ['./filesupload.component.css'],
  providers: [MessageService]
})
export class FilesuploadComponent implements OnInit,OnChanges {

  @Input() title: string
  @Input() ivid: string
  @Input() imoduleType: number
  @Input() ledgerid:number
  @Input() displayedId:Array<number>=[];
  @Output() source: EventEmitter<any> = new EventEmitter()
  
  constructor(private voucherservice: VoucherService, private route: ActivatedRoute,private message:MessageService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.getfilesByModuleid();
    console.log(this.filelistentry)
    console.log(this.selectFile);
    
  }
  progresspercentage:number;
  vid!: string | null;
  selectFile:Array<File>=[];
  fileinfo:Fileuploadlist;
  filekey:number[]=[];
  fileId:Array<Fileuploadlist>=[];
  filelistentry:Array<Fileuploadlist>=[];
  ngOnInit(): void {
    
    this.vid = this.ivid;
    if(this.ledgerid!=0){
      this.getExistingFile();
    }
  }
  
  fileSelected(event,form){
      console.log(event)
      for(let files of event.files){
        console.log(files)
          this.selectFile.push(files);
      console.log(this.selectFile)
          
      }
      for(let files of this.selectFile){
        console.log(files)
          
      }
      for(let filelist of this.selectFile)
      {
        
      this.voucherservice.uploadFile(filelist,'26').subscribe(
        (events)=>{
          if(events.type===HttpEventType.UploadProgress){
             this.progresspercentage= (Math.round(events.loaded/events.total*100));
          }
          else if (events.type==HttpEventType.Response) {
                  this.fileinfo=JSON.parse(JSON.stringify(events.body));
                
                this.message.add({severity: 'success', summary: 'File Uploaded', detail: ''});
               form.clear(); 
               this.selectFile=[];
          }
          
        },
        (error)=>{
          console.log(error);
        },
        ()=>{
          this.fileId.push(this.fileinfo)
          
            console.log(this.fileinfo.fileuploadid)
            this.filekey.push(this.fileinfo.fileuploadid);
            
          console.log("completed")
          console.log(this.fileinfo)
          console.log(this.filekey)
          
        }
        
      );
      
      }
      
        this.source.emit(this.filekey);
  } 
  

  getExistingFile(){
    console.log(this.ledgerid)
    this.voucherservice.getFiles(this.ledgerid).subscribe(
      (response)=>{
        console.log(response);
        if(response!=null)
        this.fileId=response;
      }
    )
  }

 

  onClear(){
    
    this.selectFile=[];
  }

  checkProgress(){

  }
  getfilesByModuleid(){
    if(this.displayedId==undefined||this.filelistentry==undefined){return}
    for(let i of this.displayedId){
      
      this.voucherservice.getFiles(i).subscribe((resp)=>{
          this.filelistentry.push(resp);

      });
    }

  }

  OnDeleteFile(filename: any,fileid:Fileuploadlist) {
    this.voucherservice.deleteFile(filename)
    .subscribe({
      next: () => {
        Swal.fire("Success!","removed")
        this.fileId.forEach((value,index)=>{
          if(value==fileid)
          this.fileId.splice(index,1);
        })
      },
      error: (e) => console.error(e)
    }); 
    
    
  }
}
