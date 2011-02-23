<?php

class Ediary_Exception extends Exception {
	protected $message = '';
	
	public function __construct($message = '', $code = 0, $previous = null) {
		parent::__construct($message, $code, $previous);
	}
	
	public static function handleException() {
		set_exception_handler(array(__CLASS__, 'exceptionHandler'));
	}
	
	public static function exceptionHandler( $exception ) {
		
	}
	
}