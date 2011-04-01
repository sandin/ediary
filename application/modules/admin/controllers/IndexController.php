<?php

class Admin_IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        $this->_user = Zend_Registry::get("user");
        if (!isset($this->_user) || $this->_user->id !== 3) {
            Ediary_Core::exitApp("没有权限访问该页面");
        }
    }

    public function indexAction()
    {
        // action body
    }
    
    public function debugAction() {
    }

}



