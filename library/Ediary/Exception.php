<?php

class Ediary_Exception extends Exception {
	
	const ERROR_UNKNOWN = 000;
	const ERROR_SQL 	= 001;

	protected $message = '';

	/**
	 * Ediary Appliction Exception
	 *
	 * @param String $message
	 * @param int $code
	 * @param Exception $previous
	 */
	public function __construct($message = '', $code = 0, $previous = null) {
		parent::__construct($message, $code, $previous);
	}

	/**
	 * Handle All Exception
	 * 
	 * IN DEBUG MODE : Just throw all exception, and show it on outputStream
	 * IN OTHER MODE : Redirect to the error page, and show a message to user.
	 */
	public static function handleException() {
		if (! Ediary_Config::getConfig()->ediary->app->debug) {
			set_exception_handler(array(__CLASS__, 'exceptionHandler'));
		}
	}

	/**
	 * Exception Handler
	 *
	 * handle the exception and log it
	 *
	 * @param Exception $exception
	 */
	public static function exceptionHandler( $exception ) {

		if (Ediary_Config::getConfig()->ediary->logger->enable) {
			Ediary_Logger::log($message);
		}
		
		if ($exception instanceof Ediary_Database_Exception) {
			echo _t('主页');
			echo _t('HOME');
		} else {
			echo 'Other ERROR';
		}

		//Ediary_Core::exitApp($exception->getMessage());
	}



}