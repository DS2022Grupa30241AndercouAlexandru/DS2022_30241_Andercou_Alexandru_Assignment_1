package ro.tuc.ds2022.services.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.tuc.ds2022.entities.Device;
import ro.tuc.ds2022.entities.Measurement;
import ro.tuc.ds2022.repositories.DeviceRepository;
import ro.tuc.ds2022.repositories.MeasurementRepository;
import ro.tuc.ds2022.services.DeviceService;

import java.util.List;

@Service
public class DeviceServiceImplementation implements DeviceService {
    @Autowired
    public DeviceRepository deviceRepository;
    @Autowired
    public MeasurementRepository measurementRepository;
    public Device createDevice(Device dev)
    {

        return  deviceRepository.save(dev);
    }
    public void deleteDevice(Device dev)
    {
        deviceRepository.delete(dev);
    }
    public Device updateDevice(Device dev)
    {
        Device dev1 = deviceRepository.findById(dev.getId()).get();
        if (dev1 != null) {
            if (dev.getName() != null)
                dev1.setName(dev.getName());
            if (dev.getDescription() != null)
                dev1.setDescription(dev.getDescription());
            if (dev.getAddress() != null)
                dev1.setAddress(dev.getAddress());
            if (dev.getMaximumHourlyEnergyConsumption() != null)
                dev1.setMaximumHourlyEnergyConsumption(dev.getMaximumHourlyEnergyConsumption());

            return deviceRepository.save(dev1);
        }
        return null;
    }
    public Device readDevice(Long Id)
    {
        return deviceRepository.findById(Id).get();


    }
    public List<Device> readDevices()
    {
        return (List<Device>)deviceRepository.findAll();


    }



    public void addMeasurement(Long dev,Measurement m)
    {
        Device d=deviceRepository.findById(dev).get();
        
        System.out.println(m.getDate());
        Measurement m2= measurementRepository.save(m);
        System.out.println("from m2 "+ m2.getDate() +" "+m2.getTime());
        d.getMeasurements().add(m2);
        deviceRepository.save(d);


    }
}
