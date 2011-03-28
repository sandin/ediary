<?php

class Diary_ListController extends Zend_Controller_Action
{
    private $_user;

    public function init()
    {
        /* Initialize action controller here */
        $this->_user = Zend_Registry::get('user');
        if (!isset($this->_user)) {
            $this->_redirect("/login");
        }
    }

    public function indexAction()
    {
        // action body
        $page = $this->_getPage();
        $this->view->paginator = Ediary_Diary::getDiarysPaginator($this->_user->id, $page);
    }
    
    public function getAction()
    {
        // AJAX MODE, JUST NEED partial html
        $this->_helper->layout->disableLayout();
        
        $page = $this->_getPage();
        $this->view->paginator = Ediary_Diary::getDiarysPaginator($this->_user->id, $page);
    }
    
    private function _getPage() {
        $page = $this->_getParam('page');
        return is_numeric($page) ? $page : 1;
    }


}

