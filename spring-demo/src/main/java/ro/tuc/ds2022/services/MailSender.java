package ro.tuc.ds2022.services;

public interface MailSender {
    public void sendSimpleMessage(
            String  to, String subject, String text);
}
