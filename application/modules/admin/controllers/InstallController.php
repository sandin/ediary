<?php

class Admin_InstallController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
        Ediary_Config::updateConfig('install', 'installed', 1);
    }


}

