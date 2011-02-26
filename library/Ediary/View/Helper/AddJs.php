<?php
class Ediary_View_Helper_AddJs extends Zend_View_Helper_Abstract
{
    public function addJs($file) {
        return $this->headScript()->appendFile($file,'text/javascript');
    }
}
