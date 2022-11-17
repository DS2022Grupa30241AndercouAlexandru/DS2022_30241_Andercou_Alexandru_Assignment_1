import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css']
})
export class SigninPageComponent implements OnInit {


 host="http://localhost:8080"
  url1=this.host+"/insertUser"
  constructor(private httpc:HttpClient,private router:Router) { }

  ngOnInit(): void {
  }

  onFormSubmit(userForm:any)
  {

  var name=   userForm.controls["firstName"].value+" "+ userForm.controls["lastName"].value;
  var rol=0;

  var reg= /^\s+$/
  if( userForm.controls["firstName"].value=="" || reg.test( userForm.controls["firstName"].value))
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

  if( userForm.controls["lastName"].value=="" || reg.test( userForm.controls["lastName"].value))
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
   
    if(user.role.username=="" || reg.test(user.role.username))
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




    if(user.role.password=="" || reg.test(user.role.password))
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

     this.router.navigate(["/login"])
    
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
