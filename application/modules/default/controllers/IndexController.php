<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        $this->view->pageClass = "indexPage";
        $this->view->headTitle("首页");
    }

    public function indexAction()
    {
        $this->view->loadJquery();
    } 

}

