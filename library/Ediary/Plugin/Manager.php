<?php
class Ediary_Plugin_Manager
{
    /**
     * @var Array list of Plugins
     */
    private $_plugins = array();

    private static $_instance = null;

    private function __construct() {
    }

    /**
     * @return Ediary_Plugin_Manager
     */
    public static function getInstance() {
        if (null === self::$_instance) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    private function __clone() {}
    
    public function registerPlugin(Ediary_Plugin_Abstract $plugin) {
        if (false !== array_search($plugin, $this->_plugins, true)) {
            throw new Ediary_Plugin_Exception('Plugin already registered');
        }
        
        $this->_plugins[] = $plugin;
        
        return $this;
    }

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
        return $this;
    }
}