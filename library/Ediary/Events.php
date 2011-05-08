<?php
/**
 * Hooks - Events
 * 
 * @see Ediary_Filter
 * @author lds
 */
class Ediary_Events extends Ediary_Hooks
{
    /**
     * @see Ediary_Hooks::register()
     */
    public static function addListener($tag, $fn, $priority = 10, $acceptedArgs = 0) {
        return parent::register($tag, $fn, $priority, $acceptedArgs);
    }
    
    /**
     * @see Ediary_Hooks::notify()
     */
    public static function callEvent($event, $params = array()) {
        return parent::notify($event, $params);
    }
    
    /**
     *  @deprecated 未使用
     */
    public static function magicCall($methodName) {
        preg_match("~^add(.*)Listener$~", $methodName, $matchs);
        if (count($matchs) >= 2) {
            return Ediary_Utility_String::lcfirst($matchs[1]);
        }
    }
}