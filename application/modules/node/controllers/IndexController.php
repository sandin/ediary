<?php

class Node_IndexController extends Zend_Controller_Action
{
    private $cache;

    public function init()
    {
        //$this->_helper->cache(array('index', 'page'), array('allentries'));
    }
    
    public function indexAction()
    {
        echo "no no a cache";
    }
    
}

