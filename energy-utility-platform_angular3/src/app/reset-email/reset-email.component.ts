import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs';
import { LocatorService } from '../locator.service';

@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.component.html',
  styleUrls: ['./reset-email.component.css']
})
export class ResetEmailComponent implements OnInit {

  host="http://localhost:8080"
  url1=this.host+"/ResetPasswordRequest"
  constructor(private httpc: HttpClient,private lt:LocatorService) {
    this.host=lt.getHost();
    this.url1=this.host+"/ResetPasswordRequest";



   }

  ngOnInit(): void {
    this.host=this.lt.getHost();
    this.url1=this.host+"/ResetPasswordRequest";
  }
  reset_email()
  {
  var inp=document.getElementById("email");
  if(inp && inp instanceof HTMLInputElement)
    this.httpc.post(this.url1,inp.value).subscribe(response=>{
    console.log(response);
    var msg=document.getElementById("msg");
    if(msg)
    msg.innerText="Mesaj trimis cu succes"
  

    },
    error=>{
      
      
      console.log(error);
      var msg=document.getElementById("msg");
      if(msg)
      msg.innerText="Eroare nu se poate trmite email, probabil email invalid("+error+")"
    });
  }
    
  

}
