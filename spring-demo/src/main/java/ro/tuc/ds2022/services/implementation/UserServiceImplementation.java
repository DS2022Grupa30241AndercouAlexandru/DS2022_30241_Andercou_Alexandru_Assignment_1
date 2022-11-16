package ro.tuc.ds2022.services.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import ro.tuc.ds2022.controllers.handlers.dto.LoginDto;
import ro.tuc.ds2022.controllers.handlers.dto.ResetDto;
import ro.tuc.ds2022.entities.Device;
import ro.tuc.ds2022.entities.Role;
import ro.tuc.ds2022.entities.UserAccount;
import ro.tuc.ds2022.repositories.DeviceRepository;
import ro.tuc.ds2022.repositories.RoleRepository;
import ro.tuc.ds2022.repositories.UserRepository;
import ro.tuc.ds2022.services.UserAccountService;

import java.util.*;

@Service
public class UserServiceImplementation implements UserAccountService {
    @Autowired
    public UserRepository userRepository;
    @Autowired
    public RoleRepository roleRepository;

    @Autowired
    public DeviceRepository deviceRepository;
    @Autowired
    public JavaMailSender sender;

    List<UUID> Seeds=new ArrayList<UUID>();
    public UserAccount createUser(UserAccount ua)
    {
        System.out.println(ua.getRole());

        roleRepository.save(ua.getRole());
        return  userRepository.save(ua);

    }

    public UserAccount readFirstById(Long Id)
    {
        try {
            UserAccount ua = userRepository.findById(Id).get();
            System.out.println("ua:" + ua);
            return  ua;

        }catch(Exception e)
        {
            return null;

        }



    }
    public UserAccount readFirstByUsername(String username)
    {
        try {
            UserAccount ua = userRepository.findByRoleUsername(username).get();
            System.out.println("ua:" + ua);
            return ua;
        }catch(Exception e)
        {
            return null;
        }
    }
    public List<UserAccount> readAll()
    {

        return (List<UserAccount>)userRepository.findAll();
    }





    public void deleteUser(Long Id)
    {    System.out.println("id:"+Id);

        try {
            UserAccount user = userRepository.findById(Id).get();

            userRepository.delete(user);
            roleRepository.delete(user.getRole());
        }catch(Exception e)
        {


        }

    }
    public void deleteUserByUsername(String username)
    {
        try {
            UserAccount user = userRepository.findByRoleUsername(username).get();
            if (user != null) {
                roleRepository.delete(user.getRole());
                userRepository.delete(user);
            }
        }catch(Exception e)
        {

        }


    }
   public UserAccount login(LoginDto logindto)
   {
      UserAccount ua= userRepository.findByRoleUsername(logindto.getUsername()).get();
      if(ua!=null) {
          String password = ua.getRole().getPassword();

          if (password.equals(logindto.getPassword())) {
              System.out.println("login succesful");
              Long a;
              return ua;
          } else
          {
              System.out.println("login  failed");
              return null;
          }
      }
      return null;
   }
    public UserAccount  updateUser(UserAccount ua) {
        UserAccount ua1 = userRepository.findById(ua.getId()).get();
        if (ua1 != null) {
            if(ua.getName()!=null)
            ua1.setName(ua.getName());
            if(ua.getRole()!=null)
            {
                Role r=ua.getRole();
                 r.setId(ua.getRole().getId());
                if(r.getUsername()==null) {
                    r.setUsername(ua1.getRole().getUsername());}
                if(r.getPassword()==null) {
                    r.setPassword(ua1.getRole().getPassword());}
                    ua1.setRole(r);
                roleRepository.save(r);
            }


            return userRepository.save(ua1);
        }
        return null;
    }
    public List<Device> devicesForUser(Long Id)
    {
        List<Device> devices=(List<Device>) deviceRepository.findDevicesByOwner(Id);

        if (devices != null) {

            return devices;
        }
        return null;
    }

      public int SendRequestMail(String auth) {
          System.out.println("Trimit acum mesaj");
          try {
              MailSenderImplementation ms = new MailSenderImplementation(sender);
            UUID seed=new UUID((long)(Math.random()*255),(long)(Math.random()*255));

             Seeds.add(seed);
              ms.sendSimpleMessage(auth, "Reset Password for Energy Platform Utility ",
                      " To reset your account password, Please follow the link: http://localhost:4200/reset_password/"+seed);
          } catch (Exception e) {

              return -1;
          }
          return 0;
      }
    public int resetPassword(UUID seed, ResetDto reset) {
        System.out.println("Reset");
        if(Seeds.contains(seed))
        {    Seeds.remove(seed);
            UserAccount ua;
            try {
                ua = userRepository.findByRoleUsername(reset.getUsername()).get();
            }catch(NoSuchElementException e) {
                return -2;
            }

                ua.getRole().setPassword(reset.getNewPassword());
                roleRepository.save(ua.getRole());
                return 0;
        }
        else
        {

            return -1;
        }
    }
}
