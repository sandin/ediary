<?php
require_once 'PHPMailer/class.phpmailer.php';

class Ediary_Mail_Sendmail
{
    public function __construct() {
        
    }

    public function send($to, $subject, $body, $from, $fromName) {
        $mail = new phpmailer();
        $mail->IsSendmail();
        
        $mail->SetFrom($from, $fromName);
        $mail->AddAddress($to, "QQ");
        $mail->Subject = $subject;
        $mail->Body = $body;
        
        return $mail->Send();
        
        
    }

}