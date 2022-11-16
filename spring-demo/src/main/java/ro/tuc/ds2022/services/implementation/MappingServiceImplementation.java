package ro.tuc.ds2022.services.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.tuc.ds2022.entities.Device;
import ro.tuc.ds2022.entities.UserAccount;
import ro.tuc.ds2022.repositories.DeviceRepository;
import ro.tuc.ds2022.repositories.UserRepository;
import ro.tuc.ds2022.services.MappingService;

@Service


public class MappingServiceImplementation implements MappingService {
     @Autowired
    public UserRepository userRepository;

    @Autowired
    public DeviceRepository deviceRepository;


    public void addDeviceToUser(Long userId, Long deviceId) {
        UserAccount ua1= userRepository.findById(userId).get();
        {
            Device dev=deviceRepository.findById(deviceId).get();
            ua1.getDevices().add(dev);
            userRepository.save(ua1);
        }
    }
    public void deletedevice(Long ua, Long dev) {

        UserAccount ua1=null;
        try {
             ua1 = userRepository.findById(ua).get();








        }catch(Exception e) {

        }
        Device dev1 = deviceRepository.findById(dev).get();

        {

            System.out.println(ua1.getDevices());
            System.out.println(dev1);
           for(int i=0;i< ua1.getDevices().size();i++)
           {
               Device dev2=ua1.getDevices().get(i);
               if(dev2.getId()==dev1.getId()) {
                   ua1.getDevices().remove(dev2);
                   i--;
               }
                          ;}

            userRepository.save(ua1);
        }
    }

}
