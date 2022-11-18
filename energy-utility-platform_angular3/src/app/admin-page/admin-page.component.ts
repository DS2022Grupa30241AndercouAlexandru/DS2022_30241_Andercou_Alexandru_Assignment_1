import { HttpClient } from '@angular/common/http';
import { ElementSchemaRegistry, IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { Device } from '../device';
import { LocatorService } from '../locator.service';
import { MappingDeviceUser } from '../mapping-device-user';
import { MappingRow } from '../mapping-row';
import { Measurement } from '../measurement';
import { Role } from '../role';
import { User } from '../user';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  host="http://localhost:8080"
  url1 = this.host+"/insertUser"
  url2 =  this.host+"/insertDevice"
  url3 = this.host+"/addDeviceToUser"
  url4 = this.host+"/users"
  url5 = this.host+"/devices"
  url6 = this.host+"/measurements"
  url7 = this.host+"/insertMeasure"
  url8 =this.host+ "/deleteUser"
  url9 = this.host+"/deleteDevice"
  url10 = this.host+"/updateUser"
  url11 =this.host+ "/updateDevice"
  url12 =this.host+ "/user"
  url13 =this.host+ "/device"
  url14 =this.host+ "/device"
  url15 =this.host+ "/deleteDeviceFromUser"
  open_meniu = true;

  users: any;
  devices: any;
  measurements: any;
  mappings: any;
  user_search: any;
  device_search: any;
  map_search: any;

user_searched=false
device_searched=false
map_searched=false


  dtOptions: DataTables.Settings = {};
  posts: any;

  userHidden = true
  deviceHidden = true
  dtTrigger: Subject<any> = new Subject<any>();

  dtTrigger2: Subject<any> = new Subject<any>();

  dtTrigger3: Subject<any> = new Subject<any>();

  dtTrigger4: Subject<any> = new Subject<any>();
  measureHidden: boolean = true;



  constructor(private httpc: HttpClient, private router: Router,private ls:LocatorService) {

    this.host=ls.getHost();
    this.url1 = this.host+"/insertUser"
    this.url2 =  this.host+"/insertDevice"
    this.url3 = this.host+"/addDeviceToUser"
    this.url4 = this.host+"/users"
    this.url5 = this.host+"/devices"
    this.url6 = this.host+"/measurements"
    this.url7 = this.host+"/insertMeasure"
    this.url8 =this.host+ "/deleteUser"
    this.url9 = this.host+"/deleteDevice"
    this.url10 = this.host+"/updateUser"
    this.url11 =this.host+ "/updateDevice"
    this.url12 =this.host+ "/user"
    this.url13 =this.host+ "/device"
    this.url14 =this.host+ "/device"
    this.url15 =this.host+ "/deleteDeviceFromUser"

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.user_searched=false;
    this.device_searched=false;
    this.map_searched=false;

  }
  ngOnDestroy(): void {
    this.host=this.ls.getHost();
    this.dtTrigger.unsubscribe();
    this.dtTrigger2.unsubscribe();
    this.dtTrigger3.unsubscribe();
    this.dtTrigger4.unsubscribe();
  }

  ngOnInit() {
    
    this.host=this.ls.getHost();
    var ua = sessionStorage.getItem("type");
    if (ua == "ADMIN") {

         this.user_searched=false;
         this.device_searched=false;
         this.map_searched=false;


      var navi = document.getElementById("navi")
      console.log("este permis accesul");
      var well = document.getElementById("Welcome");
      if (well && well instanceof HTMLHeadingElement) {

        var id = sessionStorage.getItem("idUser");
        this.httpc.get(this.url12 + "/" + id).subscribe(data => {
          var d: any = data;
          if (well)
            well.textContent = well.textContent + " " + d["name"]
          var regex=/a\s/
          if(regex.test(d["name"]))
      {

      
         console.log("n1",navi);
         if(navi)
         navi.classList.add("girly");

         var thd= document.getElementsByTagName("thead");
         console.log("thd",thd);
          if(thd && thd instanceof HTMLCollection)
       for(let th=1;th< thd.length;th++)
       {
         console.log("thead",thd[th]);
        thd[th].classList.add("girly_tab"); 
       }


       var but= document.getElementsByTagName("button");
       console.log("but",but);
        if(but && but instanceof HTMLCollection)
        for(let bt=0;bt< but.length;bt++)
     {
       console.log("thead",but[bt]);
      but[bt].classList.add("girl"); 
     }


         

      }




        })




      }


      this.httpc.get(this.url6).subscribe(data => {



        this.measurements = data

        console.log("this measurements", this.measurements);
        console.log(this.measurements);


        this.dtTrigger4.next("2");



      })




      this.httpc.get(this.url4).subscribe(data => {
        setTimeout(() => {

          // Calling the DT trigger to manually render the table


          this.users = data

          console.log("users", this.users);

          var elem = document.getElementById("tbu");
          if (elem) {


          }

          this.mappings = [];

          for (let user of this.users)
            for (let device of user.devices) {

              var map: MappingRow = {
                userId: user.id,
                deviceId: device.id,
                userName: user.name,
                devicename: device.name,
                address: device.address


              }
              this.mappings.push(map);
              console.log("maps", this.mappings)


            }
          console.log("mapping", this.mappings)
          if (navi) {
            $("navi").hide();
            this.dtTrigger.next("1");
            this.dtTrigger3.next("1");
            $("navi").show();
          }
        }
        )
      })




      this.httpc.get(this.url5).subscribe(data => {



        this.devices = data

        console.log(this.devices);

        this.dtTrigger2.next("1");


      })






    }
    else {
      console.log("nu este permis accesul");
      this.router.navigate(["/home"]);
    }








  }

  addUser(userForm: any) {
    var name = userForm.controls["firstName"].value + " " + userForm.controls["lastName"].value;
    var rol = 0;
    if (userForm.controls["role"].value == 'Admin')
      rol = 0;
    else
      rol = 1;

    var user: User = {
      name: name,
      id: 0,
      devices: [],
      role: {
        username: userForm.controls["username"].value,
        password: userForm.controls["password"].value,
        type: rol

      }
    }
    console.log("user", user);
    this.httpc.post(this.url1, user).subscribe(response=>{
      alert("New user added  in database");
     document.location.reload()
   
   },error=>alert("Couldn't create  User"))

  }

  addDevice(deviceForm: any) {
    var name = deviceForm.controls["name"].value;


    var device: Device = {
      name: name,
      id: 0,
      measurements: [],
      description: deviceForm.controls["description"].value,
      address: deviceForm.controls["address"].value,
      maximumHourlyEnergyConsumption: deviceForm.controls["maxCon"].value,
    }
    console.log("device", device);
    this.httpc.post(this.url2, device).subscribe(response=>{
      alert("New device added  in database");
     document.location.reload()
   
   },error=>alert("Couldn't create  devivce"))

  }
  addMapping(mapForm: any) {

    var deviceuser: MappingDeviceUser = {
      dev: mapForm.controls["device"].value,
      ua: mapForm.controls["user"].value


    }
    console.log("device-user", deviceuser);
    this.httpc.post(this.url3, deviceuser).subscribe(response=>{
      alert("New mapping added  in database");
     document.location.reload()
   
   },error=>alert("Couldn't create  mapping"))
  }


  addMeasure(measureForm: any) {
    var timedate = measureForm.controls["date"].value + " " + measureForm.controls["hour"].value+":00";
    alert(timedate)
    var energy = Number(measureForm.controls["engCon"].value)
    var symbol = "KW/h"


    var body = { device_id: measureForm.controls["dev"].value,energyCon:energy, timestamp:timedate }
    console.log("device-user", body);
    console.log("body", body);


    this.httpc.post(this.url7, body).subscribe(response=>{
      alert("New measurement added  in database");
    document.location.reload()
   
   },error=>alert("Couldn't create measurement"))

  }







  show_hide_user_form() {

    var element = document.getElementById("userForm")
    if (element) {

      if (this.userHidden == true) {
        console.log("pressed")
        element.classList.remove("hidden");

      }

      else
        element.classList.add("hidden");
      this.userHidden = !this.userHidden

    }

  }
  show_hide_device_form() {
    var element = document.getElementById("deviceForm");
    if (element) {
      if (this.userHidden == true)
        element.classList.remove("hidden");
      else
        element.classList.add("hidden");
      this.userHidden = !this.userHidden

    }


  }

  show_hide_mapping_form() {

    var element = document.getElementById("mappingForm");
    if (element) {
      if (this.userHidden == true)
        element.classList.remove("hidden");
      else
        element.classList.add("hidden");
      this.userHidden = !this.userHidden

    }




  }
  show_hide_measure_form() {

    var element = document.getElementById("measureForm")
    if (element) {

      if (this.measureHidden == true) {
        console.log("pressed")
        element.classList.remove("hidden");

      }

      else
        element.classList.add("hidden");
      this.measureHidden = !this.measureHidden

    }

  }


  searchMap() {

    console.log("searching...");
    var val = document.getElementById("d2search");
    var val2 = document.getElementById("u2search");

    var T = document.getElementById("mtb");
    var T2 = document.getElementById("tbmid");
    if (T2)
      T2.classList.remove("hidden");


    if (T) {
      var childs = T.children;
      for (let i = childs.length - 1; i >= 0; i--) {
        T.removeChild(childs[i]);
      }
    }


    var bool1=false;
    for (let map of this.mappings) {
      console.log("map:", map)
    

      var row = document.createElement("tr");
      if (val instanceof HTMLInputElement && val2 instanceof HTMLInputElement)  
        {console.log("ids:", Number(val2.value), Number(val))
        if (map["userId"] == Number(val2.value) && map["deviceId"] == Number(val.value))
         
        {
          bool1=true;
          this.map_search=map;
          console.log("map search while search",map);
        for (let [key, value] of Object.entries(map)) {


            var elem = document.createElement("td");
            var input = document.createElement("input");
            if (value) {

              input.value = String(value);

            }
            elem.appendChild(input);
            row.appendChild(elem);

          }
      if (T)
        T.appendChild(row);
    }
  }


    }
    if(bool1==false)
       alert("Couldn't find mapping")
            else
            
            this.map_searched=true;
   

  }




  toUser() {
    var d = document.getElementsByName("user_section");
    d[0].scrollIntoView();

  }
  toDevice() {
    var d = document.getElementsByName("device_section");
    d[0].scrollIntoView();

  }
  toMap() {
    var d = document.getElementsByName("mapping_section");
    d[0].scrollIntoView();

  }
  toMeasure() {
    var d = document.getElementsByName("measurement_section");
    d[0].scrollIntoView();

  }


  renderUserAfterSearch(user: any) {
    var tb = document.getElementById("utb")
    var T = document.getElementById("tbuid")

    var nextElm;

    if (tb) {
      var childs = tb.children;
      for (let i = childs.length - 1; i >= 0; i--) {
        tb.removeChild(childs[i]);
      }
    }

    var row = document.createElement("tr");

    for (let [key, value] of Object.entries(user)) {

      var elem = document.createElement("td");
      var input = document.createElement("input");
        input.className="user_"+key;
      if(key=='id')
      {
        input.disabled=true;
      
      }

      if (value) {
        if (value instanceof Object && "type" in value && "username" in value) {
          console.log(value)
          nextElm = (value as any).username
          input.className="type";
          input.value = String((value as any).type)
        }
        else
          if (value instanceof Object) {
            input.value = String(nextElm);
            input.className="username";
          }
          else
          {
            input.value = String(value);
          }
           
      }

      elem.appendChild(input);
      row.appendChild(elem);

    }

    if (tb)
      tb.appendChild(row);
    if (T)
      T.classList.remove("hidden");




  }
  renderDeviceAfterSearch(user: any) {
    var tb = document.getElementById("dtb")

    var T = document.getElementById("tbduid")

    if (tb) {
      var childs = tb.children;
      for (let i = childs.length - 1; i >= 0; i--) {
        tb.removeChild(childs[i]);
      }
    }

    var row = document.createElement("tr");
  
    for (let [key, value] of Object.entries(user)) {

      var elem = document.createElement("td");
      var input = document.createElement("input");

          if(key=='id')
            {
              input.disabled=true;
        
            }



      if (value instanceof Array) {
        input.value = ""
      }
      else
      {
        input.value = String(value)
        input.className="device_"+key;
      }
        
      elem.appendChild(input);
      row.appendChild(elem);

    }

    if (tb)
      tb.appendChild(row);
    if (T)
      T.classList.remove("hidden");
  }

  //ruds
  updateUser() {
    if(this.user_searched==false)
    {
      alert("To update a user you need to search for it first!")
      return ;
    }

    var inp1,inp2,inp3,inp4
    inp1=document.getElementsByClassName("user_name")[0]
    if(inp1 && inp1 instanceof HTMLInputElement)
  this.user_search.name=inp1.value
  
  inp2=document.getElementsByClassName("username")[0]
  if(inp2 && inp2 instanceof HTMLInputElement)
  this.user_search.role.username=inp2.value
  
  inp3=document.getElementsByClassName("type")[0]
  if(inp3 && inp3 instanceof HTMLInputElement)
  this.user_search.role.type=inp3.value


         console.log("updated user",this.user_search);
   this.httpc.post(this.url10, this.user_search).subscribe(response=>{
    alert("User updated succesfully");
  document.location.reload()
 
 },error=>alert("Couldn't update  user"))
  





  }
  updateDevice() {

    if(this.device_searched==false)
    {
      alert("To update a device you need to search for it first!")
      return ;
    }


  var inp1,inp2,inp3,inp4
  inp1=document.getElementsByClassName("device_name")[0]
  if(inp1 && inp1 instanceof HTMLInputElement)
this.device_search.name=inp1.value

inp2=document.getElementsByClassName("device_description")[0]
if(inp2 && inp2 instanceof HTMLInputElement)
this.device_search.description=inp2.value

inp3=document.getElementsByClassName("device_address")[0]
if(inp3 && inp3 instanceof HTMLInputElement)
this.device_search.address=inp3.value

inp4=document.getElementsByClassName("MHS")[0]
if(inp4 && inp4 instanceof HTMLInputElement)
this.device_search.maximumHourlyEnergyConsumption=inp4.value;

    
console.log("updated device",this.device_search);
this.httpc.post(this.url11, this.device_search).subscribe(response=>{
   alert("Device updated succesfully");
   document.location.reload();

},error=>alert("Couldn't update Device"))



  }
  deleteUser() {

    if(this.user_searched==false)
    {
      alert("To delete a user you need to search for it first!")
      return ;
    }




    console.log("here tio delete", this.user_search)
    var data_to_send = { "id": this.user_search.id };
    console.log("data to send", data_to_send);

    this.httpc.post(this.url8, data_to_send).subscribe(response=>{
      alert("Deleted user succesfully");
     document.location.reload()
   
   },error=>alert("Couldn't delete  User"))
  }
  deleteDevice() {
    if(this.device_searched==false)
    {
      alert("To delete a device you need to search for it first!")
      return ;
    }


    console.log("here tio delete", this.device_search)
    var data_to_send = { "id": this.device_search.id };
    console.log("data to send", data_to_send);

    this.httpc.post(this.url9, data_to_send).subscribe(response=>{
      alert("Deleted device succesfully");
      document.location.reload()
   
   },error=>alert("Couldn't delete  device"))
  }

  deleteMap() {


    if(this.map_searched==false)
    {
      alert("To delete a mapping you need to search for it first!")
      return ;
    }

    console.log("here to delete map", this.map_search)

    var data_to_send = { "ua": this.map_search.userId,
  "dev":this.map_search.deviceId
  };
    console.log("data to send", data_to_send);

    this.httpc.post(this.url15, data_to_send).subscribe(response=>{
      alert("Mapping device succesfully");
     document.location.reload()
   
   },error=>alert("Couldn't delete  mapping"))
  }


  searchUser() {
    console.log("searching...");
    var val = document.getElementById("usearch");
    if (val && val instanceof HTMLInputElement) {
      console.log("field is input");

      this.searchUserById(Number(val.value))
    }



  }

  searchDevice() {
    console.log("searching...");
    var val = document.getElementById("dsearch");
    if (val && val instanceof HTMLInputElement) {
      console.log("field is input");

      this.searchDeviceById(Number(val.value))
    }



  }











  searchUserById(id: number) {
    this.httpc.get(this.url12 + "/" + id).subscribe(response => {
      this.user_search = response;
      this.renderUserAfterSearch(this.user_search);
      this.user_searched=true;
     

    },error=>alert("Couldn't find user"))
  }
  searchUserByName(id: number) {

  }
  searchUserByUsername(id: number) {

  }
  searchDeviceById(id: number) {
    this.httpc.get(this.url13 + "/" + id).subscribe(response => {
      this.device_search = response;
      this.renderDeviceAfterSearch(this.device_search);
      this.device_searched=true;
    },error=>alert("Couldn't find device"))
  }


  searchDeviceByName(id: number) {

  }
  searchDeviceByDescription(id: number) {

  }
  searchDeviceByMHEC(id: number) {

  }




  close_meniu() {
    console.log("close");

    if (this.open_meniu) {


      var mn = document.getElementById("main");
      if (mn) {
        console.log("si asta");
        mn.classList.remove("nav_open")
        var meniu = document.getElementById("navi");
        if (meniu)
          meniu.classList.add("nav_close");
        var icn = document.getElementById("icn");
        if (icn) {

          icn.classList.remove("fa-minus");
          icn.classList.add("fa-plus");
        }

      }
    }
    else {

      var mn = document.getElementById("main");
      if (mn) {
        console.log("si asta");
        mn.classList.add("nav_open")
        var meniu = document.getElementById("navi");
        if (meniu)
          meniu.classList.remove("nav_close");
        var icn = document.getElementById("icn");
        if (icn) {

          icn.classList.add("fa-minus");
          icn.classList.remove("fa-plus");
        }
      }
    }
    this.open_meniu=!this.open_meniu;
  }
}