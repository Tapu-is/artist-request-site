<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Artist's email (change this to your actual email)
    $to = "yourartistemail@gmail.com";
    
    // Collect form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'] ?? 'Not provided';
    $size = $_POST['size'];
    $type = $_POST['type'];
    $details = $_POST['details'];

    // Email subject
    $subject = "New Commission Request: $name";

    // Email body
    $message = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; }
            h2 { color: #6e45e2; }
            .detail { margin-bottom: 10px; }
        </style>
    </head>
    <body>
        <h2>New Commission Request</h2>
        
        <div class='detail'><strong>Client:</strong> $name</div>
        <div class='detail'><strong>Email:</strong> $email</div>
        <div class='detail'><strong>Phone:</strong> $phone</div>
        
        <h3>Art Details</h3>
        <div class='detail'><strong>Size:</strong> $size</div>
        <div class='detail'><strong>Type:</strong> $type</div>
        <div class='detail'><strong>Special Requests:</strong><br>$details</div>
        
        <p>You can reply directly to this email to contact the client.</p>
    </body>
    </html>
    ";

    // Headers
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send email
    if (mail($to, $subject, $message, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
} else {
    echo "invalid request";
}
?>
