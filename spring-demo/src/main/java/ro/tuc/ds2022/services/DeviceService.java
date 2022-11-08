package ro.tuc.ds2022.services;

import ro.tuc.ds2022.entities.Device;
import ro.tuc.ds2022.entities.Measurement;

import java.util.List;

public interface DeviceService {
    public Device createDevice(Device dev);
    public void deleteDevice(Device dev);

    public Device updateDevice(Device dev);

    public Device readDevice(Long Id);

    public List<Device> readDevices();

    public void addMeasurement(Long dev, Measurement m);



}
