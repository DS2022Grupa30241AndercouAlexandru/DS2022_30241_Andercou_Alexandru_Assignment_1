package ro.tuc.ds2022.services;

public interface MappingService {
    public void addDeviceToUser(Long userId, Long deviceId);
    public void deletedevice(Long ua, Long dev);


}
