import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router'
import { Chart } from 'chart.js';
import { ChartType } from 'chart.js';
import { Device } from '../device';
import { Measurement } from '../measurement';
import { Subject } from 'rxjs/internal/Subject';
import { LocatorService } from '../locator.service';



@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
   host="http://localhost:8080"
  user:any;
  devices:any;
  chart:any;
  day:any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  device_search:any;
  device_searched=false;
  url1=this.host+"/user/"
  url13 =this.host+ "/device"
  constructor(private httpc:HttpClient,private router:Router,private lt: LocatorService) { this.dtOptions = {
   
    pagingType: 'full_numbers',
    pageLength: 5,
    processing: true


   }
   this.host=lt.getHost();
   this.url1=this.host+"/user/"
   this.url13 =this.host+ "/device"
  }

        remove_duplicates_devices(){
         
          
          
            var copy_dev=[];
            

           
            if(this.devices.length>1){

             copy_dev.push(this.devices[0])
                
               
         for(let i=1;i<this.devices.length;i++)
         {    
              var  d=this.devices[i];
             
                    
          
             var inside=false;
             
              for(let k=0;k< copy_dev.length;k++)
              {
                     if(copy_dev[k].id==d.id)
                       inside=true;

              }
              if(!inside)
              copy_dev.push(this.devices[i])
             
             
         }
        }

         
         this.devices=copy_dev;
      
      }
            

  sort(measure:[])
  {
    measure.sort( (a:any,b:any)=>{      
    var t1=a["time"]  ;
   var t2=b["time"]
   if(t1==t2)
    return 0;
    if(t1>t2)
    return 1;
    if(t1<t2)
    return -1;

    return 0;

   } )
      
  }

   make_Chart(devices:any,date:any)
   {



    console.log("deve:",devices," ",devices.length);


          let i=0;
          var canvas= document.getElementById("canvas");


     if(canvas && canvas instanceof HTMLCanvasElement)
     {

      var dataSet: any[]=[];
      var labels:any=[];
    // for(let device of devices )
    if(this.device_searched==true)
      {     
            var  device=this.device_search;
            var dataValues:any=[ ] 
            var label=device["name"]+ " kW/h"
            
           console.log("DEVICE:",i,device);
           i=i+1

          var dev:Device=device;


          var  measurements= dev.measurements

           this.sort(measurements);


          console.log("measurementD",measurements);

          for(let measure of measurements)
          {
             console.log(measure["date"],this.day);

            if(measure["date"]==this.day)
            {
              console.log("Yes")
             dataValues.push(measure["energyConsumption"])
             labels.push(measure["time"])
            }

          }

          console.log("table data",labels,dataValues);

           dataSet.push({data:dataValues,label:label});
        }
                 

        console.log("dataset:",dataSet);
        var ctx=canvas.getContext("2d")
        if(ctx){
                   
              if(this.chart)
              {
                this.chart.destroy()
                 this.chart=null
              }
            
              
          this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets:dataSet,
                      
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                    
                }
            }
        }
        );
        

        
      
              }
            
            
            
            
            }


             
    }
    

    
    

   


  change_title()
  {
    var title= document.getElementById("title");
    if(title)
     title.textContent=title.textContent+" "+this.user["name"];

  }

  setDate()
  {
    console.log("blurrr");
    var elem=document.getElementById("date");
    if(elem && elem instanceof HTMLInputElement)
    {

    this.day=elem.value;
    console.log(this.devices)
    this.make_Chart(this.devices,this.day);

    }


  }
  ngOnInit(): void {
   var ua= sessionStorage.getItem("type");
   if(ua=="USER")
   {

    console.log("este permis accesul");
   
      
             
      var idUser=sessionStorage.getItem("idUser");
      
        this.httpc.get(this.url1+idUser).subscribe(data=>{
          
          this.user=data;
          
          console.log("USER:",this.user);
          this.change_title();
           this.devices=this.user.devices;
           
           this.dtTrigger.next("2");
           this. remove_duplicates_devices()
           this.make_Chart(this.devices,this.day);







          
        });
      


   }
  else{
    console.log("nu este permis accesul");
    this.router.navigate(["/home"]);
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

  searchDeviceById(id: number) {
    this.httpc.get(this.url13 + "/" + id).subscribe(response => {
      this.device_search = response;
      this.device_searched=true;
      alert("Device: "+ this.device_search.name +" was found");
    },error=>alert("Couldn't find device"))
  }

}