<?php

class RedirectController extends Zend_Controller_Action
{
    public function init() {
        $this->view->loadJquery();
    }
    
    public function indexAction() {
        $this->view->second = 5;
        $this->view->message = urldecode($this->_getParam('msg'));
        $this->view->redirectTo = urldecode($this->_getParam('goto'));
        $this->view->redirectPage = urldecode($this->_getParam('title'));
    }

}

