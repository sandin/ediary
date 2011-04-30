<?php
abstract class Ediary_Mail_Message
{
    private $_from = array();
    private $_recipients = array();
    private $_replyTo;
    private $_sentDate;
    private $_subject;
    
    public function __construct() {
    }
    
    public function setFrom($addresses) {
        $this->_from = $addresses;
    }
    
    public function getFrom() {
        return $this->_from;
    }
    
    public function addFrom($addresses) {
        $this->_from = array_merge($this->_from, $addresses);
    }
    
    public function setRecipient($recipients) {
        $this->_recipients = $recipients;
    }
    
    public function getRecipient() {
        return $this->_recipients;
    }
    
    public function addRecipients($recipients) {
        $this->_recipients = array_merge($this->_recipients, $addresses);
    }
    
    public function setSubject($subject) {
        $this->_subject = $subject;
    }
    
    public function getSubject() {
        return $this->_subject;
    }
    
    
}