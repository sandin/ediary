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
     * Whether use Cache or not in Last time
     *
     * @var boolean
     */
    public static $useCache = false;

    /**
     * Construct
     */
    public function __construct() {
        $this->config = self::getConfig();
    }

    /**
     * Get Appliction Config
     *
     * @param boolean $useCache use cache or not
     * @param String section if you want set this, then $useCache must be FALSE
     * @return Zend_Config_Ini
     */
    public static function getConfig($useCache = true, $section = APPLICATION_ENV) {

        $config = null;

        if ($useCache && Zend_Registry::isRegistered(self::KEY)) {
            // read config from cache
            self::$useCache = true;
            $config = Zend_Registry::get(self::KEY);
        } else {
            // Read config from file
            self::$useCache = false;
            $file = APPLICATION_PATH . '/configs/application.ini';
            	
            if (file_exists($file)) {
                $config = new Zend_Config_Ini($file, $section);
                Zend_Registry::set(self::KEY, $config);
            } else {
                throw new Ediary_Exception('Config file is missing, '
                . 'It sure be in /appliction/configs/application.ini .');
            }
        }

        if ($section !== APPLICATION_ENV) {
            self::flushCache();
        }

        //var_dump($config);
        return $config;
    }

    /**
     * Has Cache or not
     *
     * @return boolean
     */
    public static function hasCache() {
        return Zend_Registry::isRegistered(self::KEY);
    }

    /**
     * Flush the Config cache in Zend_Registry
     */
    public static function flushCache() {
        if (self::hasCache()) {
            Zend_Registry::getInstance()->offsetUnset(self::KEY);
        }
    }

    /**
     * The Application Has been Installed or not
     *
     * @return boolean
     */
    public static function isInstalled() {
        $config = self::getConfig(false, 'install');
        //var_dump(($config->ediary->config->installed) ? true : false);
        if (null != $config && isset($config->ediary->config)) {
            return ($config->ediary->config->installed) ? true :false;
        }
        return true; // default
    }

    /**
     * Set app isInstalled value
     *
     * @param boolean $isInstalled
     */
    public static function setInstalled($isInstalled) {
        $isInstalled = ($isInstalled) ? 1 : 0;
        self::updateConfig('install', 'installed', $isInstalled);
    }

    /**
     * Is Installing or not
     *
     * @return boolean
     */
    public static function isInstalling() {
        $appSession = new Zend_Session_Namespace(Ediary_Application::SESSION_APP);
        return ( (isset($appSession->{Ediary_Application::INSTALLING}))
        ? $appSession->{Ediary_Application::INSTALLING} : false );
    }

    /**
     * Installing...
     *
     * @param unknown_type $isIntalling
     */
    public static function setInstalling($isIntalling) {
        $appSession = new Zend_Session_Namespace(Ediary_Application::SESSION_APP);
        $appSession->{Ediary_Application::INSTALLING} = $isIntalling;
    }

    public static function getPerfix() {
        $perfix = '';
        $db_config = Ediary_Config::getDbConfig();

        if (null != $db_config && isset($db_config->prefix)) {
            $perfix = $db_config->prefix;
        }
        return $perfix;
    }

    /**
     * Update a config value
     *
     * @param String $section section of config
     * @param String $key key
     * @param String $value new value
     * @param String $type  0, update ediary.config |
     * 				 		1, update resources.db.params
     *
     */
    public static function updateConfig($section, $key, $value, $type = 0) {
        $file = APPLICATION_PATH . '/configs/application.ini';
        $config = self::getWriteableConfig($file);

        // Modify a value
        if (NULL != $config) {
            	
            if (0 == $type) {
                if (isset($config->$section->ediary->config))
                $config->$section->ediary->config->$key = $value;
            } else {
                if (isset($config->$section->resources->db->params))
                $config->$section->resources->db->params->$key = $value;
            }
            self::writeConfigToFile($config, $file);
        }

        // flush the cache
        self::flushCache();
    }

    /**
     * Get a writeable config resource
     *
     * @param String $file config file
     * @return Zend_Config_Ini
     */
    public static function getWriteableConfig($file) {
        if (file_exists($file)) {
            return $config = new Zend_Config_Ini($file, null, array(
					'skipExtends' => true,
					'allowModifications' => true));
        }
    }

    /**
     * Write a config into the file
     *
     * @param Zend_Config $config
     * @param String $file
     */
    public static function writeConfigToFile($config, $file) {
        // Write the config file
        $writer = new Zend_Config_Writer_Ini(array(
					'config' => $config, 'filename' => $file));
        $writer->write();
    }



    /**
     * Get Config about Database
     *
     * @throws Ediary_Exception
     * @return Zend_Config {host, username, password, dbname}
     */
    public static function getDbConfig() {
        $config = self::getConfig();
        if (null != $config && isset($config->resources->db)) {
            return $config->resources->db->params;
        } else {
            throw new Ediary_Exception('Cann\'t get DbConfig : ediary.config .');
        }
    }

    /**
     * Get ediary.config section
     *
     * @throws Ediary_Exception
     * @return Zend_Config appConfig
     */
    public static function getAppConfig() {
        $config = self::getConfig();
        if (null != $config && isset($config->ediary)) {
            return $config->ediary->config;
        } else {
            throw new Ediary_Exception('Cann\'t get appConfig : ediary.config .');
        }
    }

    /**
     * Get Database type defined in config file
     */
    public function getDbType() {
        return $this->config->resources->db->adapter;
    }

    /**
     * Get resources->frontController->moduleDirectory
     *
     * @throws Ediary_Exception
     */
    public static function getModuleDirectory() {
        $config = Ediary_Config::getConfig();

        if (NULL !== $config && isset($config->resources->frontController)) {
            return $config->resources->frontController->moduleDirectory;
        } else {
            throw new Ediary_Exception('Cann\'t get moduleDirectory in config.');
        }
    }

}