import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ROUTER_CONFIGURATION } from '@angular/router';
import { LocatorService } from '../locator.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  seed=0;
  host="http://localhost:8080/"
  url1=this.host+"SendPasswordReset/"
  constructor(private route: ActivatedRoute,private httpc:HttpClient,private lt:LocatorService) {
    this.host=lt.getHost();
    this.url1=this.host+"/SendPasswordReset/"


   }

  ngOnInit(): void {
    this.host=this.lt.getHost();
    this.url1=this.host+"/SendPasswordReset/"

    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      this.seed=params["id"];
      console.log("id",params['id']) //log the value of id

  });

}

reset_password()
{
  console.log("enter here");
var user=document.getElementById("username");
var pass=document.getElementById("pass");
if(user && pass && user instanceof HTMLInputElement && pass instanceof HTMLInputElement)
{

  var obj={"username":user.value,"newPassword":pass.value}
  console.log("send info",this.url1+this.seed,obj);
   this.httpc.post(this.url1+this.seed,obj)
   .subscribe(
    
    response=>{console.log(response);
      var msg=document.getElementById("msg");
      if(msg)
      msg.innerText="Parola schimbata cu succes,you can go back to Login"
   },
   
   
   error=>{console.log(error);
    var msg=document.getElementById("msg");
    if(msg)
    msg.innerText="Nu s-a putut schiumba parola eroare("+error.error+")"
    
   })

}
}





}
