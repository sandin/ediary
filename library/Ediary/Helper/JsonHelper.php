<?php
class Ediary_Helper_JsonHelper extends Zend_Controller_Action_Helper_Abstract
{
    public function init() {
        
    }
    
    /**
     * disable Layout and view
     */
    public function setNoView() {
        Zend_Controller_Action_HelperBroker::getExistingHelper('layout')->disableLayout();
        Zend_Controller_Action_HelperBroker::getExistingHelper('viewRenderer')->setNoRender();
    }
    
}