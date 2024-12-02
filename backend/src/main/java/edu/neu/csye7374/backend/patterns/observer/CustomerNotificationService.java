package com.neu.design.pattern.project.ECommercePlatform.patterns.observer;

import com.neu.design.pattern.project.ECommercePlatform.patterns.singleton.CartItem;
import com.neu.design.pattern.project.ECommercePlatform.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerNotificationService implements OrderObserver {

    EmailService emailService;

    @Autowired
    public CustomerNotificationService(EmailService emailService) {
        this.emailService = emailService;
    }

    @Override
    public void update(Order order) {
       // String emailBody = "Thank you for your order. Your has been successfully placed.";
        String emailBody = createEmailBody(order);
        List<CartItem> itemList = order.getItems();

        EmailService.sendEmail(" ", emailBody, emailBody, order.getId());
        System.out.println("Order confirmation email sent to");
    }

    public String createEmailBody(Order order) {
        StringBuilder emailBuilder = new StringBuilder();

        // Email header
        emailBuilder.append("<h1 style='color: #5D6975;'>Order Confirmation</h1>");
        emailBuilder.append("<p>Thank you for your order! Here are your order details:</p>");

        // Order Details
        emailBuilder.append("<h2 style='color: #5D6975;'>Order Details ").append("</h2>");
        emailBuilder.append("<ul>");
        for (CartItem item : order.getItems()) {
            emailBuilder.append("<li>")
                    .append(item.getProduct().getName())
                    .append(" - Quantity: ").append(item.getQuantity())
                    .append(", Price: $").append(String.format("%.2f", item.getProduct().getPrice()))
                    .append(", Subtotal: $").append(String.format("%.2f", item.getProduct().getPrice() * item.getQuantity()))
                    .append("</li>");
        }
        emailBuilder.append("</ul>");

        // Total calculation
        double total = order.getItems().stream()
                .mapToDouble(item -> item.getProduct().getPrice() * item.getQuantity())
                .sum();
        emailBuilder.append("<h3>Total Amount: $").append(String.format("%.2f", total)).append("</h3>");

        // Footer
        emailBuilder.append("<p>If you have any questions about your order, please contact us at <a href='mailto:rohit.panicker16@vit.edu'>support@rohit.com</a>.</p>");
        emailBuilder.append("<p>Thank you for shopping with us!</p>");

        return emailBuilder.toString();
    }

}

