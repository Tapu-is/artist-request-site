<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Artist's email
    $to = "yourartistemail@gmail.com"; // CHANGE TO YOUR EMAIL
    
    // Collect form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $size = $_POST['size'];
    $type = $_POST['type'];
    $details = $_POST['details'];
    
    // Email subject
    $subject = "New Commission Request: $name";
    
    // Email body
    $message = "
    <html>
    <head>
        <title>New Commission Request</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
            h1 { color: #6e45e2; }
            .detail { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
        </style>
    </head>
    <body>
        <div class='container'>
            <h1>New Commission Request</h1>
            
            <div class='detail'><strong>Client:</strong> $name</div>
            <div class='detail'><strong>Email:</strong> $email</div>
            <div class='detail'><strong>Phone:</strong> $phone</div>
            <div class='detail'><strong>Size:</strong> $size</div>
            <div class='detail'><strong>Type:</strong> $type</div>
            <div class='detail'><strong>Details:</strong><br>$details</div>
            
            <p>You can reply directly to this email to contact the client.</p>
        </div>
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

