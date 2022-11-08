package ro.tuc.ds2022.controllers.handlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2022.controllers.handlers.dto.DeviceMeasurementDto;
import ro.tuc.ds2022.entities.Device;
import ro.tuc.ds2022.entities.Measurement;
import ro.tuc.ds2022.services.DeviceService;
import ro.tuc.ds2022.services.implementation.DeviceServiceImplementation;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;

@RestController
@CrossOrigin(origins = "*",methods = { RequestMethod.GET ,RequestMethod.POST }, allowedHeaders = "*")
public class DeviceController {
    @Autowired
    public DeviceService deviceServiceImplementation;


    @PostMapping("/insertDevice")
    public void postmethod2(@RequestBody Device device) {
        deviceServiceImplementation.createDevice(device);


    }

    @PostMapping("/deleteDevice")
    public void postmethod3(@RequestBody Device device) {
        deviceServiceImplementation.deleteDevice(device);

    }

    @PostMapping("/updateDevice")
    public void postmethod4(@RequestBody Device device) {
        deviceServiceImplementation.updateDevice(device);

    }

    @GetMapping("/device/{id}")
    public Device readDevice(@PathVariable(value = "id") Long Id) {
        return deviceServiceImplementation.readDevice(Id);

    }

    @GetMapping("/devices")
    public List<Device> readDevice() {
        return deviceServiceImplementation.readDevices();

    }


    @PostMapping("/insertMeasure")
    public void postmethod4(@RequestBody DeviceMeasurementDto dm) {


           Measurement m2=new Measurement();
           Float r=Float.valueOf(dm.getM().getEnergyCon());
           m2.setEnergyConsumption(r);
           m2.setUnityOfMeasurement(dm.getM().getUnityOfM());
           m2.setId(dm.getM().getId());


           Timestamp t=Timestamp.valueOf(dm.getM().getTimestamp()+":00");



        System.out.println("timestamp"+t);
        System.out.println("date: d:"+t.getDate()+" m:"+t.getMonth()+" y:"+t.getYear());
           Time tim=new Time(0,0,0);
           tim.setHours(t.getHours());
           tim.setMinutes(t.getMinutes());
           tim.setSeconds(t.getSeconds());
           m2.setTime(tim);
           Date dat=new Date(0,0,0);
           dat.setDate(t.getDate());
           dat.setMonth(t.getMonth());
           dat.setYear(t.getYear());
           m2.setDate(dat);

           System.out.println("measurement:"+m2.getTime()+" "+m2.getDate());
           deviceServiceImplementation.addMeasurement(dm.getD(),m2);

    }
}