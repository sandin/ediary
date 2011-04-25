<?php
//var_dump(class_exists('finfo', false));
//var_dump(function_exists('mime_content_type'));
//var_dump( mkdir("/home/cenkee/domains/eriji.com/public_html/uploads/sub", 0777, true) );

function send_mail_text() {
    $Name = "宜日记"; //senders name
    $email = "cenkee@s8.vosent.com"; //senders e-mail adress
    $recipient = "172339248@qq.com"; //recipient
    $mail_body = "The text for the mail..."; //mail body
    $subject = "Subject for reviever"; //subject
    $header = "From: ". $Name . " <" . $email . ">\r\n"; //optional headerfields

    return mail($recipient, $subject, $mail_body, $header); //mail command :)
}

//$result = send_mail_text();
//var_dump($result);

phpinfo();

