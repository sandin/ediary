<?php

/**
 * Database 
 * 
 * @author lds
 *
 */
class Ediary_Database_Db
{
	
	/**
	 * Database version
	 * 
	 * @var int
	 */
	private $version = 0;
	
	/**
	 * Database prefix
	 * 
	 * @var String
	 */
	private $prefix = 'eriji_';
	
	/**
	 * Database Connection
	 * 
	 * @var Zend_Db_Adapter_Abstracta
	 */
	public static $conn = null;

    public function __construct($conn = null) {
    	$db_config = Ediary_Config::getDbConfig();
    	
    	if (null != $db_config && isset($db_config->prefix)) {
	    	$this->_prefix = $db_config->prefix;
   		}
    	
    	if (null !== $conn) {
    		self::$conn = $conn;
    	}
    }
    
    public function setConnection($conn) {
    	self::$conn = $conn;
    	return this;
    }
    
    /**
     * Try to connect the database and return the connection
     * 
     * @throws Ediary_Database_Exception When cann't connect to the database
     * @return Zend_Db_Adapter_Abstracta Database connection
     */
    public static function getConnection() {
     	try {
    		self::$conn->getConnection();
    	} catch (Exception $e) {
    		throw new Ediary_Database_Exception($e->getMessage(), $e->getCode(), $e);
    	}
    	
    	return self::$conn;
    }
    
    /**
     * 
     * Alias of self::getConnection()
     * 
     * @return Zend_Db_Adapter_Abstracta Database connection
     */
    public static function getDb() {
    	return self::getConnection();
    }
    
    public function isInstalled() {
    	return false;
    }
	
	public function create() {
		if (! isInstalled() ) {
			
		}
	}
	
	public function upgrade() {
		if (! isInstalled() ) {
			
		}
	}
	
	public function close() {
		if (null != $this->conn && $this->conn->isConnected()) {
			$this->conn->closeConnection();
		}
	}
	
}
