package ro.tuc.ds2022.controllers.handlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ro.tuc.ds2022.entities.Measurement;
import ro.tuc.ds2022.services.MeasurementService;
import ro.tuc.ds2022.services.implementation.MeasurementServiceImplementation;

import java.util.List;

@RestController
@CrossOrigin(origins = "*",methods = { RequestMethod.GET ,RequestMethod.POST }, allowedHeaders = "*")
public class MeasurementController {
    @Autowired
    MeasurementService measurementServiceImplementation;
    @GetMapping("/measurements")
    public List<Measurement> getmethod2()
    {

        return measurementServiceImplementation.readMeasurements();
    }



}
