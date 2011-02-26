<?php
class Ediary_View_Helper_LoadJquery extends Zend_View_Helper_Abstract
{
    public function loadJquery() {
        $jquery = $this->view->baseUrl('/js/jquery-1.5.min.js');
        $this->view->headScript()->appendFile($jquery, 'text/javascript');
    }
}
