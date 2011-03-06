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
    
    public function saveAction() 
    {
        if (isset($_POST['diary']['id'])) {
            $this->_forward('update');
        } else {
            //$this->_forward('create');
        }
    }
    
    public function createAction() {
        $params = $this->_parsePost();
        $diary = Ediary_Diary::create($params);
        Ediary_Response::send($diary->toArray());
    }
    
    public function updateAction() {
        $params = $this->_parsePost();
        $diary = Ediary_Diary::update($params);
        Ediary_Response::send($diary->toArray());
    }
    
    private function _parsePost() {
        return array(
            'title' => $_POST['diary']['title'],
            'content' => $_POST['diary']['content']
        );
    }


}

