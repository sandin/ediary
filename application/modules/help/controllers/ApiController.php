<?php

class Help_ApiController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        $this->_helper->cache(array('index', 'oauth', 'sdk'), array('allentries'));
        $this->view->headTitle("API 文档");
    }

    public function indexAction()
    {
        $this->view->sidebar =  self::getSidebar();
        $this->view->content = Ediary_Block::getBlock('Node', "node", array('apidoc'));
    }
    
    public function oauthAction()
    {
        $this->view->sidebar =  self::getSidebar();
        $this->view->content = Ediary_Block::getBlock('Node', "node", array('oauth'));
    }
    
    public function sdkAction()
    {
        $this->view->sidebar =  self::getSidebar();
        $this->view->content = Ediary_Block::getBlock('Node', "node", array('sdk'));
    }
    
    public static function getSidebar() {
        $items = array(
            array(
                'title' => 'API 参考手册',
                'link'  => '/help/api',
                'current' => true
            ),
            array(
                'title' => 'OAuth认证',
                'link'  => '/help/api/oauth',
            ),
            array(
                'title' => '常用语言 SDK',
                'link'  => '/help/api/sdk',
            ),
            array(
                'title' => '申请API KEY',
                'link'  => '/oauth/register',
            ),
            array(
                'title' => '返回帮助中心',
                'link'  => '/help',
            ),
            
        );
        return Ediary_Theme::theme("Core", 'list', array(
            'items' => $items, 'attrs' => array('class' => 'sideNav')));
    }


}

