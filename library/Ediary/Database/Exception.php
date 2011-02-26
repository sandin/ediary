<?php

class Ediary_Database_Exception extends Ediary_Exception {

    // TODO: log database exception
    public function __construct($message = '', $code = 0, $previous = null) {
        parent::__construct($message, $code, $previous);
    }

}