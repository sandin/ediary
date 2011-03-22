<?php

class Diary_IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }
    
    
    private function _parsePost() {
        return array(
            'title' => $_POST['diary']['title'],
            'content' => $_POST['diary']['content']
        );
    }


}

