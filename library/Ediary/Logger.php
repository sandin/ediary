<?php
class Ediary_Logger
{
    const LOGGER_TYPE_NULL 		= 'null';
    const LOGGER_TYPE_FILE 		= 'file';
    const LOGGER_TYPE_DATABASE	= 'database';
    const LOGGER_TYPE_FIREBUG	= 'firebug'; // Only Use this in your model, view and controller files
    
    private static $_config = null;

    /**
     * @var Zend_Log
     */
    private static $logger = null;
    
    /**
     * @var Ediary_Logger
     */
    private static $instance = null;
    
    private function __construct() {
    }
    
    public static function setConfig($config) {
        self::$_config = $config;
    }
    
    /**
     * @return Zend_Log
     */
    public static function getLogger() {
         self::initLogger();
         return self::$logger;
    }
    
    /**
     * @return Ediary_Looger
     */
    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * new Zend_Log and addWriter
     *
     * @param int $type defined in const field
     */
    private static function _setLogger($type = self::LOGGER_TYPE_FILE) {
        self::$logger = new Zend_Log();
        
        $write = null;
        switch ($type) {
            case self::LOGGER_TYPE_FIREBUG :
                $writer = new Zend_Log_Writer_Firebug();
                break;
            case self::LOGGER_TYPE_FILE :
                $writer = self::getStreamWriter();
                break;
            case self::LOGGER_TYPE_NULL:
            default:
                $writer = new Zend_Log_Writer_Null();
                break;
        }

        self::$logger->addWriter($writer);
    }

    /**
     * Create a new stream writer for Zend_Log
     *
     * Log file path defined in application config file
     * When config file is unwriteable, it's will create the log file into /tmp dir
     *
     * @return Zend_Log_Writer_Stream
     */
    private static function getStreamWriter() {
        $writer = null;
        $logfile = self::$_config['path'];

        if (! file_exists($logfile)) {
            // create the log file if has the premission
            @fclose(fopen($logfile, 'w'));
        }
        if (! is_writeable($logfile)) {
            // create a log file in /tmp
            $logfile = tempnam(sys_get_temp_dir(), 'Ediary_log_');
        }
        if (filesize($logfile) > 5*1073741824) { // > 5M
            // 文件过大, 清空日志
            @fclose(fopen($logfile, 'w'));
        }

        $writer = new Zend_Log_Writer_Stream($logfile);
        return $writer;
    }

    /**
     * Init the Logger
     */
    private static function initLogger() {
        if (null == self::$logger) {
            	
            $logType = self::LOGGER_TYPE_NULL; //default
            if (null != self::$_config && isset(self::$_config['type']) ) {
                $logType = self::$_config['type'];
            }
            self::_setLogger($logType);
        }
    }

    /**
     * Write a log
     *
     * @see Zend_Log#log
     *
     * @param String $message
     * @param int $priority [Zend_Log::INFO, ...]
     * @param mixed $extras
     * @deprecated use Ediary_Log::getLogger()
     */
    public static function log2($message,  $priority = Zend_Log::INFO, $extras = null) {
        self::initLogger();
        self::$logger->log($message, $priority, $extras);
    }
    
    /**
     * @deprecated use Ediary_Log::getLogger()
     */
    public function log($message,  $priority = Zend_Log::INFO, $extras = null) {
        self::initLogger();
        self::$logger->log($message, $priority, $extras);
    }
}