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
        //debug_print_backtrace();
        if (version_compare(PHP_VERSION, '5.3.0') >= 0) {
            parent::__construct($message, $code, $previous); //PHP 5.3.0 增加previous参数
        } else {
            parent::__construct($message, $code);
        }
    }

    /**
     * Handle All Exception
     *
     * IN DEBUG MODE : Just throw all exception, and show it on outputStream
     * IN OTHER MODE : Redirect to the error page, and show a message to user.
     */
    public static function handleException() {
        set_exception_handler(array('Ediary_Exception', 'exceptionHandler'));
    }

    /**
     * Exception Handler
     *
     * handle the exception and log it
     *
     * @param Exception $exception
     */
    public static function exceptionHandler( $exception ) {
        //$backtrace = print_r( $exception->getTrace(), true );
        Ediary_Logger::log2($exception->getMessage() . ' in ' 
                . $exception->file . ':' . $exception->line);
        
        $msg = '';
        if ($exception instanceof Ediary_Database_Connection_Exception) {
            $msg = _t('暂时无法连接数据库, 请稍后再试.');
        } else if ($exception instanceof Ediary_Database_Exception) {
            $msg = _t('数据库请求错误, 请返回.');
        } else {
            $msg = _t('网站遇到未知问题, 请稍后再试.');
        }
        
        Ediary_Core::exitApp($msg);

    }



}