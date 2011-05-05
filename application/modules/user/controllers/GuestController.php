<?php

class User_GuestController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }
    
    public function loginAction() {
        $result = Ediary_User::login('guest@eriji.com', 'guest', false);
        if ($result->result) {
	        Ediary_Hooks::notify("onUserLogin", array($result->user));
            $this->_redirect('diary');
        } else {
            $this->view->content = "抱歉, 游客功能暂时关闭.";
        }
    }

}

