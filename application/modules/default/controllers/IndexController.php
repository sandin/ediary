<?php

class IndexController extends Zend_Controller_Action
{
    private $_user;

    public function init()
    {
        /* Initialize action controller here */
        $this->_user = Ediary_Auth::getUser();
        $this->view->pageClass = "indexPage";
        
        //$this->_helper->cache(array('index'), array('allentries'));
    }

    public function indexAction()
    {
        $this->view->headTitle("宜日记 | 记录生活", 'SET'); // override
        
        // 已登录用户直接转入日志页
        if (null != $this->_user) {
            $this->_redirect('/diary');
        }
        
        // 首页独立布局/样式
        $this->_helper->layout->setLayout('frontpage');
        $this->_helper->viewRenderer->renderScript('frontpage.phtml');
    } 
    
    public function postDispatch() {
       Ediary_Debug::stopProfile();
    }

}

