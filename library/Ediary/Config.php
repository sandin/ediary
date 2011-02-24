<?php

class Ediary_Config
{
	/**
	 * Cache key of Zend_Registry
	 * 
	 * @var String
	 */
	const KEY = 'Ediary_Config';
	
	/**
	 * Config 
	 * 
	 * @var Zend_Config
	 */
	private $config = null;
	
	/**
	 * Get Appliction Config
	 * 
	 * @param boolean $useCache use cache or not
	 * @return Zend_Config_Ini
	 */
	public static function getConfig($section = APPLICATION_ENV, $useCache = true) {
		
		$config = null;
		$key = md5(self::KEY);
		
		if (! $useCache  || ! Zend_Registry::isRegistered($key) ) {
			$file = APPLICATION_PATH . '/configs/application.ini';
			
			if (file_exists($file)) {
				$config = new Zend_Config_Ini($file, $section);
				$useCache || Zend_Registry::set($key, $config);
			} else {
				throw new Ediary_Exception('Config file is missing, '
					. 'It sure be in /configs/application.ini .');
			}
			
		} else {
			$config = Zend_Registry::get($key);
		}
		
		return $config;
	}
	
	/**
	 * Flush the Config cache in Zend_Registry
	 */
	public static function flushCache() {
		if (Zend_Registry::isRegistered(self::KEY)) {
			Zend_Registry::set(self::KEY, null);
		}
	}
	
	/**
	 * The Application is Installed or not
	 * 
	 * @return boolean installed or not
	 */
	public static function isInstalled() {
		$config = self::getConfig('install', false);
		if (null != $config) {
			return $config->ediary->config->installed;
		}
		return false;
	}

	/**
	 * Update a config value
	 * 
	 * @param String $section section of config
	 * @param String $key key
	 * @param String $value new value 
	 */
	public static function updateConfig($section, $key, $value) {
		$file = APPLICATION_PATH . '/configs/application.ini';
		
		if (file_exists($file)) {
			$config = new Zend_Config_Ini($file, null, array(
					'skipExtends' => true,
					'allowModifications' => true));
			
			// Modify a value
			$config->$section->ediary->config->$key = $value;
			
			// Write the config file
			$writer = new Zend_Config_Writer_Ini(array(
					'config' => $config, 'filename' => $file));
			$writer->write();
		}

		// flush the cache
		self::flushCache();
	}
	
	public function __construct() {
		$this->config = self::getConfig();
	}
	
	/**
	 * Get Config about Database
	 * 
	 * @return stdClass {host, username, password, dbname} or null
	 */
	public static function getDbConfig() {
		$config = self::getConfig();
		if (null != $config) {
			var_dump($config->resources);
			return $config->resources->db->params;
		}
	}
	
	/**
	 * Get ediary.config section
	 */
	public static function getAppConfig() {
		$config = self::getConfig();
		if (null != $config) {
			return $config->ediary->config;
		}
	}
	
	/**
	 * Get Database type defined in config file
	 */
	public function getDbType() {
		return $this->config->resources->db->adapter;
	}
	
}