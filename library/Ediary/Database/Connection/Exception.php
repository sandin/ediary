<?php

class Ediary_Database_Connection_Exception extends Ediary_Database_Exception {

    // TODO: log database exception
    public function __construct($message = '', $code = 0, $previous = null) {
        parent::__construct($message, $code, $previous);
    }

}