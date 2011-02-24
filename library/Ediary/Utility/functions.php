<?php
function _t($message) {
	$translate = Zend_Registry::get('translate');
    return $translate->_($message);
}
