<?php
class Ediary_View_Helper_Substr extends Zend_View_Helper_Abstract
{
    public function substr($str, $width) {
        
        return mb_strimwidth($str, 0, $width, "...", 'UTF-8');
    }
}
