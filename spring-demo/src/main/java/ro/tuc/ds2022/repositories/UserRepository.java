package ro.tuc.ds2022.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ro.tuc.ds2022.entities.Role;
import ro.tuc.ds2022.entities.UserAccount;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<UserAccount,Long> {
    public Optional<UserAccount> findById(Long Id);
    public Optional<UserAccount> findByRole(Role role);
    public Optional<UserAccount> findByRoleUsername(String username);
}
