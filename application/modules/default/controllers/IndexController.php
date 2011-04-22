<?php

class IndexController extends Zend_Controller_Action
{
    private $_user;

    public function init()
    {
        /* Initialize action controller here */
        $this->_user = Ediary_Auth::getUser();
        $this->view->pageClass = "indexPage";
        $this->view->headTitle("首页");
    }

    public function indexAction()
    {
        // 已登录用户直接转入日志页
        if (null != $this->_user) {
            $this->_redirect('/diary');
        }
        
        // 首页独立布局/样式
        $this->_helper->layout->setLayout('frontpage');
        $this->_helper->viewRenderer->renderScript('frontpage.phtml');
        
    } 

}

