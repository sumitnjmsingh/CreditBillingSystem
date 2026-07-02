package service;

import javax.mail.*;
import javax.mail.internet.*;
import java.util.Properties;

import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;

public class EmailService {
    Config config = ConfigFactory.load();

    String username = config.getString("mail.username");
    String password = config.getString("mail.password");

    public void sendResetEmail(String to, String resetLink) throws Exception {

        Properties props = new Properties();

        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new Authenticator() {

            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        Message message = new MimeMessage(session);

        message.setFrom(new InternetAddress(username));

        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));

        message.setSubject("Reset Your Password");

        String body = "Hello,\n\n" + "Click the link below to reset your password.\n\n" + resetLink + "\n\n" + "This link expires in 15 minutes.";

        message.setText(body);

        Transport.send(message);
    }

    public void sendWelcomeMessage(String to) throws Exception {

        Properties props = new Properties();

        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new Authenticator() {

            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        Message message = new MimeMessage(session);

        message.setFrom(new InternetAddress(username));

        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));

        message.setSubject(" Welcome to Credit Card Management System");

        String body = "<html>" + "<body style='font-family: Arial, sans-serif; background-color:#f4f4f4; padding:20px;'>" +

                "<div style='max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:10px;'>" +

                "<h2 style='color:#1976D2;'>Welcome to Credit Card Management System</h2>" +

                "<p>Dear Customer,</p>" +

                "<p>Thank you for registering with us. Your account has been created successfully.</p>" +

                "<p>You can now enjoy the following features:</p>" +

                "<ul>" + "<li> Manage your credit cards</li>" + "<li> View monthly billing statements</li>" + "<li> Track spending and available credit</li>" + "<li> View transaction history</li>" + "<li> Secure account management</li>" + "</ul>" +

                "<p>We're committed to providing you with a secure and seamless banking experience.</p>" +

                "<hr>" +

                "<p><b>Credit Card Management Team</b></p>" + "<p>Email: support@creditcard.com</p>" +

                "</div>" +

                "</body>" + "</html>";

        message.setContent(body, "text/html");

        Transport.send(message);
    }

    public void sendTransactionSuccessEmail(
            String to,
            String cardHolderName,
            String merchantName,
            Double amount,
            String currency,
            String referenceNumber,
            Double remainingLimit
    ) throws Exception {

        Properties props = new Properties();

        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new Authenticator() {

            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }

        });

        Message message = new MimeMessage(session);

        message.setFrom(new InternetAddress(username));

        message.setRecipients(
                Message.RecipientType.TO,
                InternetAddress.parse(to)
        );

        message.setSubject("Transaction Alert - Credit Card");

        String body =
                "<html>" +
                        "<body style='font-family:Arial;background:#f4f4f4;padding:30px;'>"

                        + "<div style='max-width:650px;margin:auto;background:#fff;padding:30px;border-radius:10px;'>"

                        + "<h2 style='color:#1E88E5;'>Transaction Successful</h2>"

                        + "<p>Dear <b>" + cardHolderName + "</b>,</p>"

                        + "<p>Your credit card has been successfully used for a purchase.</p>"

                        + "<table style='border-collapse:collapse;width:100%;'>"

                        + "<tr>"
                        + "<td><b>Merchant</b></td>"
                        + "<td>" + merchantName + "</td>"
                        + "</tr>"

                        + "<tr>"
                        + "<td><b>Amount</b></td>"
                        + "<td>"
                        + currency
                        + " "
                        + amount
                        + "</td>"
                        + "</tr>"

                        + "<tr>"
                        + "<td><b>Reference Number</b></td>"
                        + "<td>"
                        + referenceNumber
                        + "</td>"
                        + "</tr>"

                        + "<tr>"
                        + "<td><b>Remaining Credit Limit</b></td>"
                        + "<td>INR"
                        + remainingLimit
                        + "</td>"
                        + "</tr>"

                        + "<tr>"
                        + "<td><b>Transaction Time</b></td>"
                        + "<td>"
                        + java.time.LocalDateTime.now()
                        + "</td>"
                        + "</tr>"

                        + "</table>"

                        + "<br><br>"

                        + "<p>If you did not perform this transaction, please contact customer support immediately.</p>"

                        + "<hr>"

                        + "<p><b>Credit Billing System</b></p>"

                        + "</div>"

                        + "</body>"
                        + "</html>";

        message.setContent(body, "text/html");

        Transport.send(message);

    }
}