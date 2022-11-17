import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginInfo} from "src/app/login-info"
import { LocatorService } from '../locator.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { User } from '../user';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})


export class LoginPageComponent implements OnInit {
  public loginForm:FormGroup; // variable is created of type FormGroup is created
  
  host="http://localhost:8080"
  private url1=this.host+"/test"
  private url2=this.host+"/logIn"
  constructor( private httpc:HttpClient,private fb: FormBuilder,private router:Router,private ls:LocatorService) {
    // Form element defined below

    this.host=ls.getHost();
    this.url1=this.host+"/test"
    this.url2=this.host+"/logIn"
    this.loginForm = this.fb.group({
      username: '',
      password:""
    });
  }
 


  ngOnInit(): void {
    this.host=this.ls.getHost();
  }

  // saveData(){
  //   sessionStorage.setItem('role', 'Admin');
  //   sessionStorage.setItem('id', '1');
  // }
  // getData(){
  //   console.log(sessionStorage.getItem('role'))
  //   return sessionStorage.getItem('role');

  // }

  login()
  { 
     var  li:LoginInfo={"username":"","password":""}

      li.username=this.loginForm.get('username')?.value; 
      li.password=this.loginForm.get('password')?.value; 
      var msg=document.getElementById("message");
      var reg=/\s+/
      if(msg!=null && (li.password=="" ||  li.username==""  || reg.test(li.password) || reg.test(li.username))  )
{
   msg.textContent="The fields can't be empty"
   msg.classList.remove("hidden")
   msg.classList.add("invalid")
   return;
}


      
      console.log("li is",li);
      this.httpc.post(this.url2,li).subscribe(data=>{
        var usr:any=data;
        console.log(usr)
        sessionStorage.setItem("idUser",usr["id"])
        sessionStorage.setItem("type",usr["role"]["type"])
        var regex=/a\s/
        if(regex.test(usr["name"]))
        sessionStorage.setItem("gender","female")
        else
        sessionStorage.setItem("gender","male");
       // 

      
        var msg=document.getElementById("message");
        if(msg!=null)
        {
          
         msg.innerText="Log In Succesfull"
         
         alert("Login was succesfull");
         
         msg.classList.remove("hidden")


        

         if(usr["role"]["type"]=="ADMIN")
        this.router.navigate(["/admin"])
        else
        if(usr["role"]["type"]=="USER")
        this.router.navigate(["/user"])

         

        } 

      },
      error=>{
      var msg=document.getElementById("message");
      if(msg!=null)
      {
       msg.textContent="User not Found or Password wrong"
       msg.classList.remove("hidden")
      msg.classList.add("invalid")

      } 
    }
      )
    


  }

}
