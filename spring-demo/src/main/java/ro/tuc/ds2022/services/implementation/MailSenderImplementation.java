package ro.tuc.ds2022.services.implementation;


import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import ro.tuc.ds2022.services.MailSender;


@Service
public class MailSenderImplementation  implements MailSender {



    private JavaMailSender emailSender;

    public MailSenderImplementation(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    public void sendSimpleMessage(
            String  to, String subject, String text) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("sandu.andercou@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }
}