<?php

class Diary_ListController extends Zend_Controller_Action
{
    private $_user;

    public function init()
    {
        /* Initialize action controller here */
        $this->_user = Zend_Registry::get('user');

        //TODO: DELETE ME ********************************
        $hack = new stdClass();
        $hack->username = 'admin';
        $hack->id = 3;
        $hack->email = "admin@lds.com";
        $this->_user = $hack;
        //TODO: DELETE ME ********************************
        
        if (!isset($this->_user)) {
            $this->_redirect("/login");
        }
    }

    public function indexAction()
    {
        // action body
        $page = $this->_getParam('page');
        $page = is_numeric($page) ? $page : 1;
        $this->view->paginator = Ediary_Diary::getDiarysPaginator($this->_user->id, $page);
    }


}

