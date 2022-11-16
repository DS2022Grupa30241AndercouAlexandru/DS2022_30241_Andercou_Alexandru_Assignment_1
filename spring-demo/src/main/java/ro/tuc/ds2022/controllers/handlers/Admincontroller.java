package ro.tuc.ds2022.controllers.handlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2022.controllers.handlers.dto.MappingDto;
import ro.tuc.ds2022.services.MappingService;
import ro.tuc.ds2022.services.implementation.MappingServiceImplementation;

@RestController
@CrossOrigin(origins = "*",methods = { RequestMethod.GET ,RequestMethod.POST }, allowedHeaders = "*")
public class Admincontroller {
    @Autowired
    MappingService mappingService;

    @PostMapping("/addDeviceToUser")
    public void postmethod2(@RequestBody MappingDto md)
    {    System.out.println("mapping"+md);
         mappingService.addDeviceToUser(md.getUa(),md.getDev());


    }

    @PostMapping("/deleteDeviceFromUser")
    public void postmethod4(@RequestBody MappingDto md)
    {
        System.out.println("delete here");
        mappingService.deletedevice(md.getUa(),md.getDev());


    }


}
