<?php

class Api_TestController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        $this->_helper->JsonHelper->setNoView();
    }

    public function indexAction()
    {
        // action body
        $this->_helper->json(array('ready' => true));
    }
}
