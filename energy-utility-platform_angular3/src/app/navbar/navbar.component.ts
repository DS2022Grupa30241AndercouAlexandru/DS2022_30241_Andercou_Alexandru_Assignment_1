import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if(sessionStorage.getItem("type"))
    {

       




     var type=sessionStorage.getItem("type");
      if(type=="ADMIN")
      {
      
        var admin=document.getElementById("admin")
        if(admin)
         admin.classList.remove("hidden")
        
      }else
      if(type=="USER")
      {

        var user=document.getElementById("user")
       if(user)
         user.classList.remove("hidden")
       
        


      }
      var buttonLogOut=document.getElementById("lo")
      if(buttonLogOut)
      buttonLogOut.classList.remove("hidden")


      var navb=document.getElementsByTagName("nav")[0];
      console.log("gender:",sessionStorage.getItem("gender"));
      if(navb && sessionStorage.getItem("gender")=="female")
      {
        navb.classList.add("girl");
       var but= document.getElementsByTagName("button");
       console.log("but",but);
        if(but && but instanceof HTMLCollection)
        for(let bt=0;bt< but.length;bt++)
     {
       console.log("thead",but[bt]);
      but[bt].classList.add("girl"); 
     }
     var frm= document.getElementsByTagName("form");
     console.log("form",frm);
      
     for(let fr=0;fr< frm.length;fr++)
    {
     
      frm[fr].classList.add("girl"); 
     }

      

      }


    }
    else
      {
        var buttonLogOut=document.getElementById("lo")
        if(buttonLogOut)
        buttonLogOut.classList.add("hidden")
          
      }
  }
  logoff()
  {
    sessionStorage.clear();
   document.location.reload();
  }

}
