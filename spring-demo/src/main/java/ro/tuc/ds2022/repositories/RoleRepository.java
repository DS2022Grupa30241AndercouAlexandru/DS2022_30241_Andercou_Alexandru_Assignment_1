package ro.tuc.ds2022.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ro.tuc.ds2022.entities.Role;

@Repository
public interface RoleRepository extends CrudRepository<Role,Long> {



}
