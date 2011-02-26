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
