package ro.tuc.ds2022.controllers.handlers;

import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2022.controllers.handlers.dto.IdDto;
import ro.tuc.ds2022.controllers.handlers.dto.LoginDto;
import ro.tuc.ds2022.controllers.handlers.dto.ResetDto;
import ro.tuc.ds2022.entities.Device;
import ro.tuc.ds2022.entities.UserAccount;
import ro.tuc.ds2022.services.UserAccountService;
import ro.tuc.ds2022.services.implementation.UserServiceImplementation;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*",methods = { RequestMethod.GET ,RequestMethod.POST }, allowedHeaders = "*")
public class UserAccountController {
    @Autowired
    public UserAccountService userServiceImplementation;

    @PostMapping("/insertUser")
    public void postmethod(@RequestBody UserAccount ua)
    {
        System.out.println(ua);
        ResponseEntity.status(HttpStatus.OK).body(userServiceImplementation.createUser(ua));
    }
    @PostMapping("/updateUser")
    public void postmethod2(@RequestBody UserAccount ua)
    {
        ResponseEntity.status(HttpStatus.OK).body(userServiceImplementation.updateUser(ua));
    }




    @GetMapping("/user/{id}")
    public UserAccount getmethod(@PathVariable(value="id") Long Id)
    {

        UserAccount  ua=userServiceImplementation.readFirstById(Id);
        System.out.println("ua controller ua"+ua);

        return ua;

    }

    @GetMapping("/userByUsername/{username}")
    public UserAccount getmethod(@PathVariable(value="username") String username)
    {

        return userServiceImplementation.readFirstByUsername(username);
    }
    @GetMapping("/users")
    public List<UserAccount> getmethod2()
    {

        return userServiceImplementation.readAll();
    }





    @GetMapping("/test")
    public  JSONObject  test() throws ParseException {
       System.out.println("cerere acum");
        String string="{\"msg\":\"Hello Lume\"}";
        JSONParser parser = new JSONParser();
        JSONObject json = (JSONObject) parser.parse(string);

        return json;
    }





    @PostMapping("/logIn")
    public ResponseEntity postmethod3(@RequestBody LoginDto loginDto)
    {
        System.out.println("requested log in");

        UserAccount ua=userServiceImplementation.login(loginDto);
         if(ua==null)
         {  System.out.println("here");
             return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("could not log in");
         }

         else{
             return  ResponseEntity.status(HttpStatus.OK).body(ua);
         }

    }

    @PostMapping("/deleteUser")
    public void  postmethod4(@RequestBody IdDto id)
    {
        System.out.println("id is"+id);
        userServiceImplementation.deleteUser(id.getId());

    }
    @GetMapping("/devicesOfuser/{id}")
    public List<Device> postmethod5(@RequestBody Long Id)
    {
        return  userServiceImplementation.devicesForUser(Id);

    }

    @PostMapping("/ResetPasswordRequest")
    public ResponseEntity resetPassword(@RequestBody String auth)
    {
        int result=userServiceImplementation.SendRequestMail(auth);
        if(result==-1)
         return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unable to send Email");
         else
         return ResponseEntity.status(HttpStatus.OK).body(null);

    }
    @PostMapping("/SendPasswordReset/{id}")
    public  ResponseEntity resetPassword(@PathVariable("id") UUID id ,@RequestBody ResetDto reset)
    {  System.out.print("reseting password");
        int dec=userServiceImplementation.resetPassword(id,reset);
        if(dec==-1)
        return  ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("You are not allowed to change password, wrong seed");
         else
          if(dec==-2)
              return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("We couldn;t find user based on username given");
          else
        return ResponseEntity.status(HttpStatus.OK).body(null);


    }

}
