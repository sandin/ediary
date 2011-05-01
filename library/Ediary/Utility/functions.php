<?php

if (! function_exists('_t')) {
    /**
     * Shortcut for $translate
     *
     * @see Zend_Translate#_();
     * @param String $str
     * @return String translated string
     */
    function _t($str) {
        if (Zend_Registry::isRegistered(Ediary_Application::TRANSLATE)) {
            $translate = Zend_Registry::get(Ediary_Application::TRANSLATE);
            return $translate->_($str);
        }
        return $str;
    }
}

if (! function_exists('ediary_substr')) {
    /**
     * wrapper substr()
     * @param String $string
     * @param Int $start
     * @param Int $length
     * @return string
     */
    function ediary_substr($string, $start, $length = null) {
        if (function_exists('mb_substr')) {
            return mb_substr($string, $start, $length, "UTF-8");
        }
        return substr($string, $start, $length);
    }

}
