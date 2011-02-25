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
	private $prefix = '';
	
	/**
	 * Database Connection
	 * 
	 * @var Zend_Db_Adapter_Abstracta
	 */
	private $conn = null;
	
	
	// Singleton 

	/**
	 * This instance
	 * 
	 * @var Ediary_Database_Db
	 */
	private static $instance;

    /**
     * PRIVATE, use Ediary_Database_Db::getInstance()
     */
    private function __construct() {
    	return;
    }
    
    /**
     * Get Database Instance
     * 
     * @return Ediary_Database_Db
     */
    public static function getInstance() {
    	if (! isset(self::$instance) ) {
    		self::$instance = new self();
    	}
    	
    	return self::$instance;
    }
    
    public function __clone() {
    	trigger_error("This Object Cann't be Clone, It's a Singleton Object.", E_USER_ERROR);
    }
    
    
    // METHODS
	
    /**
     * Set Tables prefix
     * 
     * @param String $prefix
     */
    public function setPrefix($prefix = null) {
    	if (NULL == $prefix) {
    		$db_config = Ediary_Config::getDbConfig();
    		
    		if (null != $db_config && isset($db_config->prefix)) {
	    		$this->_prefix = $db_config->prefix;
   			}
    	} else {
    		$this->_prefix = $prefix;
    	}
    }
    
    /**
     * Set Database Connection
     * 
     * @param  Zend_Db_Adapter_Abstracta $conn
     * @return Ediary_Database_Db
     */
    public function setConnection($conn) {
    	$this->conn = $conn;
    	return $this;
    }
    
    /**
     * Get the connection
     * 
     * @return Zend_Db_Adapter_Abstracta Database connection
     */
    public function getConnection() {
    	return $this->conn;
    }
    
    /**
     * Connect to the Database
     * 
     * @throws Ediary_Database_Exception When cann't connect to the database
     * 
     * @return boolean 
     */
    public function connect() {
    	try {
    		if (NULL !== $this->conn) {
    			$this->conn->getConnection();
    		} else {
    			return false;
    		}
    	} catch (Exception $e) {
    		throw new Ediary_Database_Exception($e->getMessage(), $e->getCode(), $e);
    	}
    	
    	return true;
    }
    
    public function test() {
    	
    }
    
    /**
     * Whether Database is installed or not
     * 
     * @return boolean
     */
    public function isInstalled() {
    	$result = $this->query("SHOW TABLES");
    	return ( $result->rowCount() > 0 );
    }
	
	/**
	 * CREATE TABLES
	 * 
	 * @param String $sql
	 * @throws Ediary_Database_Exception sql file is missing or Zend_Db_Exception 
	 * @return boolean Is succeed
	 */
	public function create($sql = null) {
		if (! $this->isInstalled() ) {
			
			// READ SQL QUERY IN THE FILE
			if (NULL == $sql) {
				$file =  APPLICATION_PATH . '/data/sql/install.sql';
				if (file_exists($file)) {
					$sql = file_get_contents($file);
				} else {
					$msg = 'Database Install FILE is missing : ' . $file;
					throw new Ediary_Database_Exception($msg);
				}
			} 
			
			// QUERY
			try {
				$result = $this->query($sql);
			} catch (Zend_Db_Exception $db_e) {
				throw new Ediary_Database_Exception(
					$db_e->getMessage(), $db_e->getCode(), $db_e);
			}
			
			return ( $result->rowCount() > 0 );
		}
		
		return false; // alreay installed
	}
	
	private function dump() {
		
	}
	
	public function upgrade() {
		if (! $this->isInstalled() ) {
			
		} 
	}
	
	/**
	 * Close the connection
	 * 
	 * @return boolean always true
	 */
	public function close() {
		if (null != $this->conn && $this->conn->isConnected()) {
			$this->conn->closeConnection();
		}
		return true;
	}
	
	/**
	 * Get database config, such as username, password, host, dbname
	 * 
	 * @return Zend_Config or NULL
	 */
	public function getConfig() {
		if (NULL !== $this->conn) {
			return $this->conn->getConfig();
		}
	}
	
	/**
	 * Call $this->connection->xxx instead
	 * 
	 * @see Zend_Db_Adapter_Abstract
	 * 
	 * @param String $method
	 * @param Array $args
	 * @throws Ediary_Database_Exception which case by Zend_Db_Apapter_Exception
	 * @throws Ediary_Exception which case by unknown reason
	 * 
	 * @return mixed
	 */
	public function __call($method, $args) {
		if (method_exists($this->conn, $method)) {
			try {
				return call_user_func_array(array($this->conn, $method), $args);
			} catch (Zend_Db_Adapter_Exception $db_e) {
				throw new Ediary_Database_Exception($db_e->getMessage(), $db_e->getCode(), $db_e);
			} catch (Exception $e) {
				throw new Ediary_Exception($e->getMessage(), $e->getCode(), $e);
			}
		}
	}
}
