import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css']
})
export class SigninPageComponent implements OnInit {


 host="http://localhost:8080"
  url1=this.host+"/insertUser"
  constructor(private httpc:HttpClient) { }

  ngOnInit(): void {
  }

  onFormSubmit(userForm:any)
  {

  var name=   userForm.controls["firstName"].value+" "+ userForm.controls["lastName"].value;
  var rol=0;
if( userForm.controls["role"].value=='Admin')
       rol=0;
       else
       rol=1;

    var user:User={
        name:name,
        id:0,
        devices:[],
        role:{username:userForm.controls["username"].value,
            password:userForm.controls["password"].value,
           type: rol
          
          } }
    console.log("user",user);
    var reg=/^s*$/ 
    if(user.role.username=="" || reg.test(user.role.username))
    if(user.role.password=="" || reg.test(user.role.password))
    if(user.name=="" || reg.test(user.name))
       {
        alert("No field is allowed to  be empty")
        var err= document.getElementById("errors");
        var vld= document.getElementById("valid");
        if(err && err instanceof HTMLParagraphElement &&  vld)
        {
         
         err.textContent="No field is allowed to  be empty"
         vld.textContent=""
        }
        return;
       }






     this.httpc.post(this.url1,user).subscribe((response)=>{console.log(response)
      var err= document.getElementById("errors");
      var vld= document.getElementById("valid");


     if(err && err instanceof HTMLParagraphElement &&  vld)
     {
      vld.textContent="Person was signed in succesfully"
      err.textContent=""
     }
    
    },errors=>
{    
     var err= document.getElementById("errors");
     var vld= document.getElementById("valid");
     if(err && err instanceof HTMLParagraphElement &&  vld)
     {
      
      err.textContent="Erroare the sign in was not succesful"
      vld.textContent=""
     }

});

  }
}
