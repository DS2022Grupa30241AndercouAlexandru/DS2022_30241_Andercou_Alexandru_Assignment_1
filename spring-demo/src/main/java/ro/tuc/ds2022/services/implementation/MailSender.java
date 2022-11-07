package ro.tuc.ds2022.services.implementation;


import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class MailSender {



    private JavaMailSender emailSender;

    public MailSender(JavaMailSender emailSender) {
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