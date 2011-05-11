<?php
/**
 * 全局钩子机制
 * 
 * @author lds
 */
class Ediary_Hooks {
    const KEY_FN = 'function';
    const KEY_ARGS = 'acceptedArgs';
    
    protected static $_hooks = array();
    protected static $_instance = null;
    protected static $_debug = false;
    
    private function __construct() {
    }
    
    private function __clone() {}
    
    public static function getInstance() {
        if (self::$_instance === null) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    
    /**
     * Register a callback function to some event
     *
     * @param string $tag The name of the filter to hook the $fn to.
     * @param callback $fn The function to be called. 
     * @param int $priority optional. Used to specify the order in which the functions associated with a particular action are executed (default: 10). Lower numbers correspond with earlier execution, and functions with the same priority are executed in the order in which they were added to the action.
     * @param int $accepted_args optional. The number of arguments the function accept (default 1).
     * 
     * @see call_user_func_array()
     */
    public static function register($tag, $fn, $priority = 10, $acceptedArgs = 1) {
        self::getLogger()->info("[Hooks] Register " . $tag);
        $idx = self::buildUniqueId($tag, $fn, $priority);
        
        self::$_hooks[$tag][$priority][$idx] = array(
        	self::KEY_FN => $fn, self::KEY_ARGS => $acceptedArgs
        ); 
    }
    
    /**
     * Notify All callback function of a particular event, if any
     * 
     * @param String $tag
     * @param mixed(Array|String|Object) $params
     * @param mixed $params...
     * @return int how many functions have been called
     * 
     * @see call_user_func($function)
     * @see call_user_func_array($fn, $params);
     */
    public static function notify($tag, $params = array()) {
        self::getLogger()->info("[Hooks] Notify " . $tag);
        
        // 重载, 以适应 call_user_func() 风格参数
        if (! is_array($params) && func_num_args() >= 2) {
            $params = func_get_args();
            array_shift($params); // strip arg 0
        }
        
        $count = 0;
        if (! self::hasRegister($tag)) {
            return $count;
        }
        
        ksort(self::$_hooks[$tag]); // by priority

        foreach (self::$_hooks[$tag] as $priority => $hooks) {
            foreach ( (array) $hooks as $hook) {
                if ( !is_null($hook[self::KEY_FN]) ) {
                    call_user_func_array($hook[self::KEY_FN],
                        array_slice($params, 0, (int) $hook[self::KEY_ARGS]));
                    $count++;
                }
            }
        }
        
        return $count;
    }
    
    /**
     * Whether a event has callback
     * 
     * @param String $tag
     * @return boolean return ture when at last one callback
     */
    public static function hasRegister($tag) {
        return ( isset(self::$_hooks[$tag]) ); 
    }
    
    /**
     * Dump all hooks and reset instance 
     */
    public static function reset() {
        self::$_hooks = array();
        self::$_instance = null;
    }
    
    /**
     * @return Zend_Log
     */
    protected static function getLogger() {
        return Ediary_Logger::getLogger();
    }
    
    /**
     * 是否开启DEBUG, 默认为关闭, 此选项只应在开发插件时使用
     * <li>开启DEBUG模式下, 会抛出Hooks回调函数导致的错误/异常
     * <li>关闭DEBUG模式下, 会使用 @ 符号抑制它们.
     * 
     * @param boolean $debug able or not
     */
    public static function setDebug($debug) {
        self::$_debug = $debug;
    }
    
    public static function buildUniqueId($tag, $fn, $priority) {
        $idx = '';
        
        if ( is_string($fn) ) {
            $idx .= $fn;
        } else if ( is_array($fn) && count($fn) == 2) { // array($this, 'method)
            $obj = $fn[0];
            $method = $fn[1];
            if ( is_object($obj) ) { 
                if ( function_exists('spl_object_hash') ) {
                    $idx .= spl_object_hash($obj) . $method;
                } else {
                    $idx .= get_class($obj) . $method;
                }
            } else {
                $idx .= $obj . $method;
            }
	    } else {
	        $idx = microtime(true)*10000;
	    }
	    
	    return $idx;
    }
    
    /** for debug */
    public static function getHooks() {
        return self::$_hooks;
    }
}