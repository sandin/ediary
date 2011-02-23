<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
        $db = Ediary_Database_Db::getInstance();
        $db->connect();
        
        var_dump($db->connection);
    }


}

