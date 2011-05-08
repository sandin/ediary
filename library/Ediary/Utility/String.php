<?php
class Ediary_Utility_String {
    
    /**
     * lcfirst, Support PHP < 5.3
     * 
     * @param string $string
     * @return string
     */
    public static function lcfirst($string) {
        if (function_exists('lcfirst')) {
            return lcfirst($string);
        }
        
        // PHP < 5.3
        $string{0} = strtolower($string{0});
        return $string; // outputs camelCase
    }
}