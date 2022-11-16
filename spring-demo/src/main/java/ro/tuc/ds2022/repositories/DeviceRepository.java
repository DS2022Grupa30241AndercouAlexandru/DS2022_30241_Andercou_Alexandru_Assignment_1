package ro.tuc.ds2022.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ro.tuc.ds2022.entities.Device;

import java.util.List;
import java.util.Optional;
@Repository
public interface DeviceRepository   extends CrudRepository<Device,Long>
{  public Optional<Device> findById(Long Id);
   public Iterable<Device> findDevicesByOwner(Long Id);


}
