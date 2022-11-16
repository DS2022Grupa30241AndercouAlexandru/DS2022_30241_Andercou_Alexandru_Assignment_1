package ro.tuc.ds2022.services;

import ro.tuc.ds2022.controllers.handlers.dto.LoginDto;
import ro.tuc.ds2022.controllers.handlers.dto.ResetDto;
import ro.tuc.ds2022.entities.Device;
import ro.tuc.ds2022.entities.UserAccount;

import java.util.List;
import java.util.UUID;

public interface UserAccountService {
    public UserAccount readFirstById(Long Id);
    public UserAccount createUser(UserAccount ua);
    public UserAccount readFirstByUsername(String username);
    public List<UserAccount> readAll();
    public void deleteUser(Long Id);
    public void deleteUserByUsername(String username);
    public UserAccount  updateUser(UserAccount ua);
    public UserAccount login(LoginDto logindto);
    public List<Device> devicesForUser(Long Id);
    public int SendRequestMail(String auth);
    public int resetPassword(UUID seed, ResetDto reset);

}
