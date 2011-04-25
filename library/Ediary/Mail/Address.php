<?php
class Ediary_Mail_Address {
    protected $address;
    protected $encodedPersonal;
    protected $personal;
    
    public function __construct($address, $personal) {
        $this->address = $address;
        $this->personal = $personal;
    } 
    
}