<?php
class Ediary_Plugin_Manager
{
    const ACTIVATE_PLUGINS = 'PM_activate_plugins';
    public $_path;
      
    /**
     * @var Array list of activeted Plugins
     */
    private $_plugins = array();
    private static $_instance = null;
    private $logger;

    /**
     * Construct
     * use getInstace()
     */
    private function __construct() {
        $this->logger = Ediary_Logger::getLogger();
        $this->_path = realpath(APPLICATION_PATH . '/../library/Plugins') . DS;
        $this->loadPlugins();
    }
    
    /**
     * Load activeted Plugins from database
     */
    public function loadPlugins() {
        $o = Ediary_Metadata_Options::getOption(self::ACTIVATE_PLUGINS, array());
        $this->_plugins = @unserialize($o);
        
        // in case some thing wrong with data from DB
        if ($this->_plugins === false) {
            $this->resetPlugins();
            $this->logger->error(__CLASS__ . ' ' . $e->getMessage());
        }
    }
    
    /**
     * Save activeted Plugins into database
     */
    public function savePlugins() {
        Ediary_Metadata_Options::setOption(self::ACTIVATE_PLUGINS,
                                         serialize($this->_plugins));
    }
    
    /**
     * Dump all activeted Plugins 
     */
    public function resetPlugins() {
        $this->_plugins = array();
        $this->savePlugins();
    }

    /**
     * Get Plugin Manager 
     * 
     * @return Ediary_Plugin_Manager
     */
    public static function getInstance() {
        if (null === self::$_instance) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    private function __clone() {}
    
    /**
     * Activate a plugin
     * 
     * @param String $plugin plugin name
     * @throws Ediary_Plugin_Exception
     * @return Ediary_Plugin_Manager
     */
    public function activatePlugin($plugin) {
        if (! self::is_a_plugin($plugin)) {
            throw new Ediary_Plugin_Exception(__METHOD__ .' arg #0 is not a Plugin');
        }
        if (false !== array_search($plugin, $this->_plugins, true)) {
            throw new Ediary_Plugin_Exception('Plugin already activated');
        }
        
        $this->_plugins[] = $plugin;
        $this->savePlugins();
        
        return $this;
    }
    
    /**
     * Activate multiple plugins
     * 
     * @param array $plugins list of plugins' name
     * @throws Ediary_Plugin_Exception
     * @return Ediary_Plugin_Manager
     */
    public function activatePlugins($plugins = array()) {
        if (! is_array($plugins)) {
            throw new Ediary_Plugin_Exception(__METHOD__ . " expect arg #0 is a array");
        }
        
        foreach ($plugins as $plugin) {
            $this->activatePlugin($plugin);
        }
        
        return $this;
    }

    /**
     * Unregister a plugin
     * 
     * @param String $plugin plugin name
     * @throws Ediary_Plugin_Exception
     * @return Ediary_Plugin_Manager
     */
    public function unregisterPlugin($plugin) {
         if ($plugin instanceof Ediary_Plugin_Abstract) {
            // Given a plugin object, find it in the array
            $key = array_search($plugin, $this->_plugins, true);
            if (false === $key) {
                throw new Ediary_Plugin_Exception('Plugin never registered.');
            }
            unset($this->_plugins[$key]);
        } elseif (is_string($plugin)) {
            // Given a plugin class, find all plugins of that class and unset them
            foreach ($this->_plugins as $key => $_plugin) {
                $type = get_class($_plugin);
                if ($plugin == $type) {
                    unset($this->_plugins[$key]);
                }
            }
        }
        $this->savePlugins();
        return $this;
    }
    
    /**
     * Get All plugins under the PLUGIN_DIR
     * For Admin plugins
     * 
     * @param boolean $detail get plugin's info data or not
     * @return array a list of plugins' class name
     */
    public function getPlugins($detail = false) {
        $plugins = array();
        foreach (get_declared_classes() as $class){
            $reflection = new ReflectionClass($class);
            if (! $reflection->isUserDefined() 
              || (! $reflection->isSubclassOf("Ediary_Plugin_Abstract")) )
            { continue; }
                
            //$filename = $reflection->getFileName();
            //$filename = str_replace($this->_path, "", $filename);
            if ($detail) {
                $info = self::getPluginData($reflection);
                $plugins[$class] = $info;
            } else {
                $plugins[] = $class;
            }
        }
        return $plugins;
    }
    
    /**
     * Get Activated plugins
     * 
     * @return array
     */
    public function getActivatedPlugins() {
        return $this->_plugins;
    }
    
    /**
     * Check if it's a Plugin
     * 
     * @param mixed(Object|String) $plugin plugin class name or plugin object
     * @return boolean
     */
    public static function is_a_plugin($plugin) {
         if ($plugin instanceof Ediary_Plugin_Abstract) {
             return true;
         }
        
         if (is_string($plugin)) {
            $reflection = new ReflectionClass($plugin);
            return ($reflection->isSubclassOf("Ediary_Plugin_Abstract"));
         }
         
         return false;
    }
    
    /**
     * Get active and valid plugins
     * 
     * @return array a list of plugins
     */
    public function getActiveAndValidPlugins() {
        // TODO: valid plugins 
        $plugins = $this->_plugins;
        
        return $plugins;
    }
    
    /**
     * Boot Plugins Helper
     * 
     * @return int how many plugins have been booted
     */
    public static function bootActivePlugins() {
        $manager = new Ediary_Plugin_Manager();
        $plugins = $manager->getActiveAndValidPlugins();
        $count = 0;
        foreach ($plugins as $plugin) {
            $r = self::bootPlugin($plugin);
            if ($r) $count++;
        }
        return $count;
    }
    
    /**
     * Boot a plugin
     * 
     * @param String $plugin plugin class name
     * @return boolean has been boot or not
     */
    public static function bootPlugin($plugin) {
        if (class_exists($plugin, false)) {
            $pluginObj = new $plugin();
            if ($pluginObj instanceof Ediary_Plugin_Abstract) {
                $pluginObj->bootPlugin(); // 抑制所有插件导致的错误或异常
                return true;
            }
        }
        return false;
    }
    
    public static function getPluginData(ReflectionClass $reflection) {
        $info = Ediary_Plugin_Abstract::$defaultInfo;
	    
	    foreach ($info as $constant => &$value) {
	        if ($reflection->hasConstant($constant)) {
	            $info[$constant] = $reflection->getConstant($constant);
	        }
	    }
        
        return $info;
    }
}