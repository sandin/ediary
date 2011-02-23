<?php

class Ediary_Config
{
	const KEY = 'Ediary_Config';
	
	private $config = null;
	
	/**
	 * Get Appliction Config
	 * 
	 * @param boolean $useCache use cache or not
	 * @return Zend_Config_Ini
	 */
	public static function getConfig($useCache = true) {
		
		$config = null;
		$key = md5(self::KEY . $_SERVER['SERVER_NAME']);
		
		if (! Zend_Registry::isRegistered($key) && $useCache) {
			$file = APPLICATION_PATH . '/configs/application.ini';
			
			if (file_exists($file)) {
				$config = new Zend_Config_Ini($file, APPLICATION_ENV);
				Zend_Registry::set($key, $config);
			} else {
				throw new Ediary_Exception('Config file is missing, It sure be in /configs/application.ini .');
			}
			
		} else {
			$config = Zend_Registry::get($key);
		}
		
		return $config;
	}
	
	public function __construct() {
		$this->config = self::getConfig();
	}
	
	/**
	 * Get Config about Database
	 * 
	 * @return stdClass {host, username, password, dbname}
	 */
	public function getDbConfig() {
		$db_config = $this->config->resources->db->params;
		
		return $db_config;
	}
	
	/**
	 * Get Database type defined in config file
	 */
	public function getDbType() {
		return $this->config->resources->db->adapter;
	}
	
}