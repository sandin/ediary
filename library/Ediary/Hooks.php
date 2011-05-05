<?php
/**
 * 全局钩子机制
 * 
 * @author lds
 */
class Ediary_Hooks {
    
    private static $_hooks = array();
    private static $_instance = null;
    private static $_debug = false;
    
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
     * @param String $event
     * @param mixed(String|Array) $fn The function to be called. 
     * 
     * @see call_user_func_array($fn, $param_arr)
     */
    public static function register($event, $fn) {
        self::getLogger()->info("[Hooks] Register " . $event);
        self::$_hooks[$event][] = $fn; 
    }
    
    /**
     * Notify All callback function of a particular event, if any
     * 
     * @param String $event
     * @param mixed(Array|String|Object) $params
     * @param mixed $params...
     * @return int how many functions have been called
     * 
     * @see call_user_func($function)
     * @see call_user_func_array($fn, $params);
     */
    public static function notify($event, $params = array()) {
        self::getLogger()->info("[Hooks] Notify " . $event);
        
        // 重载, 以适应 call_user_func() 风格参数
        if (! is_array($params)) {
            $params = func_get_args();
            array_shift($params); // strip arg 0
        }
        
        $count = 0;
        if (self::hasRegister($event)) {
            foreach (self::$_hooks[$event] as $fn) {
                if (self::$_debug) {
                    call_user_func_array($fn, $params);
                } else {
                    @call_user_func_array($fn, $params);
                }
                $count++;
            }
        }
        return $count;
    }
    
    /**
     * Whether a event has callback
     * 
     * @param String $event
     * @return boolean return ture when at last one callback
     */
    public static function hasRegister($event) {
        return ( isset(self::$_hooks[$event]) 
                && is_array(self::$_hooks[$event]) 
                && count(self::$_hooks[$event]) > 0 );
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
    public static function getLogger() {
        return Ediary_Logger::getLogger();
    }
    
    /**
     * 是否开启DEBUG, 默认为关闭, 此选项只应在开发插件时使用
     * <li>开启DEBUG模式下, 会抛出Hooks回调函数导致的错误/异常
     * <li>关闭DEBUG模式下, 会使用 @ 符号抑制它们.
     * 
     * @param boolean $isAbleDebug
     */
    public static function setDebug($isAbleDebug) {
        self::$_debug = $isAbleDebug;
    }
}