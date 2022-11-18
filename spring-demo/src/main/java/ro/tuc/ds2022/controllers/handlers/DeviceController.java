package ro.tuc.ds2022.controllers.handlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2022.controllers.handlers.dto.DeviceMeasurementDto;
import ro.tuc.ds2022.controllers.handlers.dto.Devicedto;
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
    public void postmethod2(@RequestBody Devicedto device) {

        Device d=new Device();
        d.setId(device.getId());
        d.setName(device.getName());
        d.setAddress(device.getAddress());
        d.setDescription(device.getDescription());
        d.setMeasurements(device.getMeasurements());
        d.setMaximumHourlyEnergyConsumption(device.getMaximumHourlyEnergyConsumption());
        deviceServiceImplementation.createDevice(d);


    }

    @PostMapping("/deleteDevice")
    public void postmethod3(@RequestBody Devicedto device) {
        Device d=new Device();
        d.setId(device.getId());
        d.setName(device.getName());
        d.setAddress(device.getAddress());
        d.setDescription(device.getDescription());
        d.setMeasurements(device.getMeasurements());
        d.setMaximumHourlyEnergyConsumption(device.getMaximumHourlyEnergyConsumption());
        deviceServiceImplementation.deleteDevice(d);

    }

    @PostMapping("/updateDevice")
    public void postmethod4(@RequestBody Devicedto device) {
        Device d=new Device();
        d.setId(device.getId());
        d.setName(device.getName());
        d.setAddress(device.getAddress());
        d.setDescription(device.getDescription());
        d.setMeasurements(device.getMeasurements());
        d.setMaximumHourlyEnergyConsumption(device.getMaximumHourlyEnergyConsumption());
        deviceServiceImplementation.updateDevice(d);

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
           Float r=Float.valueOf(dm.getEnergyCon());
           m2.setEnergyConsumption(r);
           m2.setUnityOfMeasurement("kW/h");
           m2.setId(Long.valueOf(0));
           Timestamp t=Timestamp.valueOf(dm.getTimestamp());



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
           deviceServiceImplementation.addMeasurement(dm.getDevice_id(),m2);

    }
}