<?php

class Help_IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        $this->_helper->cache(array('index'), array('allentries'));
    }

    public function indexAction()
    {
        $this->view->headTitle("帮助中心");
        
        $this->view->sidebar =  self::getSidebar();
        $this->view->sidebarTitle = _t("关于我们");

        $this->view->content = Ediary_Block::getBlock('Node', "node", array('help'));
    }

    public static function getSidebar() {
        $items = array(
            array(
                'title' => '常见问题解答',
                'link'  => '/help',
                'current' => true
            ),
            array(
                'title' => 'API 文档',
                'link'  => '/help/api',
            )
        );
        return Ediary_Theme::theme("Core", 'list', array(
            'items' => $items, 'attrs' => array('class' => 'sideNav')));
    }


}

