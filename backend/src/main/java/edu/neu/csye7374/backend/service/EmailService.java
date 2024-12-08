package edu.neu.csye7374.backend.service;


import org.springframework.stereotype.Component;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

import java.util.Properties;

@Component
public class EmailService {

    public static void sendEmail(String email, String messageBody, String body, Long orderId)
    {
        final String username = "rohit.panicker16@vit.edu"; // Change to sender's email ID
        final String password = "Welcometopune18@"; // Change to sender's password

        // Assuming you are sending email through Gmail
        String host = "smtp.gmail.com";

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", "587");

        // Create session with authenticator
        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {
            // Create a default MimeMessage object
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(username));
            message.setSubject("Order Update : DesignPatterns" );
            message.setContent(messageBody, "text/html; charset=utf-8");

            // Send the message
            Transport.send(message);

            System.out.println("Email sent successfully!");

        } catch (MessagingException e) {
            e.printStackTrace();
        }

    }


}
