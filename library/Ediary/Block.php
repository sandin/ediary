<?php
class Ediary_Block
{
    /**
     * @var Array list of blocks
     */
    private static $_blocks = array();
    
    private static $_instance = null;
    
    private function __construct() {
    }
    
    /**
     * @return Ediary_Block
     */
    public static function getInstance() {
        if (null === self::$_instance) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    
    private function __clone() {}
    
    /**
     * Get block content
     * 
     * @param String $namespace module name
     * @param String $name block name
     * @param Array $params callback params
     * @return mixed(String) block content
     */
    public static function getBlock($namespace, $name, $params = array()) {
        if (! is_array($params)) {
            throw new Ediary_Block_Exception(__CLASS__ . 'expects parameter 2 to be array');
        }
        $name = self::addPrefix($namespace, $name);
        if (isset(self::$_blocks[$name])) {
            return call_user_func_array(self::$_blocks[$name], $params);
        }
    }
    
    /**
     * Add block
     * 
     * @param String $namespace module name
     * @param String $name block name
     * @param mixed(String|Array) $callback callback function name
     */
    public static function addBlock($namespace, $name, $callback) {
        $name = self::addPrefix($namespace, $name);
        self::$_blocks[$name] = $callback;
    }
    
    public static function addPrefix($namespace, $name) {
        return $namespace . '_' . $name;
    }
}