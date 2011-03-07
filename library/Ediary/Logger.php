<?php
class Ediary_Logger
{
    const LOGGER_TYPE_FILE 		= 'file';
    const LOGGER_TYPE_DATABASE	= 'database';
    const LOGGER_TYPE_FIREBUG	= 'firebug'; // Only Use this in your model, view and controller files

    private static $logger = null;

    /**
     * new Zend_Log and addWriter
     *
     * @param int $type defined in const field
     */
    private static function getLogger($type = self::LOGGER_TYPE_FILE) {
        self::$logger = new Zend_Log();
        $write = null;

        switch ($type) {
            case self::LOGGER_TYPE_FIREBUG :
                $writer = new Zend_Log_Writer_Firebug();
                break;
            case self::LOGGER_TYPE_FILE :
            default:
                $writer = self::getStreamWriter();
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
        $logfile = Ediary_Config::getAppConfig()->logger->path;

        if (! file_exists($logfile)) {
            // create the log file if has the premission
            @fclose(fopen($logfile, 'w'));
        }
        if (! is_writeable($logfile)) {
            // create a log file in /tmp
            $logfile = tempnam(sys_get_temp_dir(), 'Ediary_log_');
        }

        $writer = new Zend_Log_Writer_Stream($logfile);
        return $writer;
    }

    /**
     * Init the Logger
     */
    private static function initLogger() {
        if (null == self::$logger) {
            $config = Ediary_Config::getAppConfig();
            	
            $logType = self::LOGGER_TYPE_FILE; //default
            if (NULL != $config && isset($config->logger->type) ) {
                $logType = $config->logger->type;
            }
            self::getLogger($logType);
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
     */
    public static function log($message,  $priority = Zend_Log::INFO, $extras = null) {
        self::initLogger();
        self::$logger->log($message, $priority, $extras);
    }
}