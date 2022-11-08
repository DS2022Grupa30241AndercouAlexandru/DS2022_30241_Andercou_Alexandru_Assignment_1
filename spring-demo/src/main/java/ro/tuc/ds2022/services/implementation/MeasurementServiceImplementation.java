package ro.tuc.ds2022.services.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.tuc.ds2022.entities.Measurement;
import ro.tuc.ds2022.repositories.MeasurementRepository;
import ro.tuc.ds2022.services.MeasurementService;

import java.util.List;

@Service
public class MeasurementServiceImplementation implements MeasurementService {
    @Autowired
    public MeasurementRepository measurementRepository;

    public List<Measurement> readMeasurements()
    {

        return (List<Measurement> )measurementRepository.findAll();
    }
}
