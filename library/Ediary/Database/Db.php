<?php

/**
 * Database 
 * 
 * @author lds
 *
 */
class Ediary_Database_Db {
	
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
	 * 
	 * Whether display Sql error
	 * 
	 * @var boolean 
	 */
	private $displayError = false;
	
	private $supportDbType = array('mysqli', 'pdo_mysql');
	
	/**
	 * Database Connection
	 * 
	 * @var Zend_Db_Adapter_Abstracta
	 */
	public $connection = null;
	
	// Singleton
	
	private static $instance;

    private function __construct() {
    	return;
    }
    
    public static function getInstance() {
    	if (! isset(self::$instance) ) {
    		self::$instance = new self();
    	}
    	
    	return self::$instance;
    }
    
    public function __clone() {
    	trigger_error("This Object Cann't be Clone, Singleton.", E_USER_ERROR);
    }
	
    // PUBLIC METHODS
	
	public function create() {
		
	}
	
	public function upgrade() {

	}

	/**
	 * Connect To The Database
	 * 
	 * @throws Ediary_Datebase_Exception
	 * @return void
	 */
	public function connect() {

		if (null == $this->connection) {
			$config = new Ediary_Config();
			$db_config = $config->getDbConfig();
			$db_type = $config->getDbType();
			
			$params = array(
				'host' 		=> $db_config->host,
				'username'	=> $db_config->username,
				'password'	=> $db_config->password,
				'dbname'	=> $db_config->dbname
			);

			if ( in_array($db_type, $this->supportDbType) ) {
				$this->connection = Zend_Db::factory($db_type, $params);
			} else {
				throw new Ediary_Datebase_Exception('Database Type : ' . $db_type . ' is not\'s support!');
			}
		}
	}
	
	public function close() {
		
	}
	
	/*
	 * Call $this->connection->xxx instead
	 * 
	 * @see Zend_Db_Adapter_Abstract
	 * 
	 * @param String $method
	 * @param Array $args
	 * @throws Ediary_Database_Exception which case by Zend_Db_Apapter_Exception
	 * @throws Ediary_Exception which case by unknown reason
	 * 
	 * @return void
	 */
	public function __call($method, $args) {
		if (method_exists($this->connection, $method)) {
			try {
				return call_user_func_array(array($this->connection, $method), $args);
			} catch (Zend_Db_Adapter_Exception $db_e) {
				throw new Ediary_Database_Exception($db_e->getMessage(), $db_e->getCode(), $db_e);
			} catch (Exception $e) {
				throw new Ediary_Exception($e->getMessage(), $e->getCode(), $e);
			}
		}
	}
	
	
}