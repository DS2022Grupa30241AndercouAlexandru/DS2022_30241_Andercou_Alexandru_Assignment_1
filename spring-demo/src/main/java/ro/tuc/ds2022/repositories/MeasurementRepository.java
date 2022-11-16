package ro.tuc.ds2022.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ro.tuc.ds2022.entities.Measurement;

import java.util.Optional;

@Repository
public interface MeasurementRepository extends CrudRepository<Measurement,Long> {
    public Optional<Measurement> findById(Long Id);
}
