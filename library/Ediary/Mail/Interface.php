<?php
interface Ediary_Mail_Interface
{
    function send($to, $subject, $body, $from);
}