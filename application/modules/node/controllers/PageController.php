<?php 
class Node_PageController extends Zend_Controller_Action
{
    private $cache;

    public function init()
    {
        $this->_helper->cache(array('index', 'about', 'contact.us'), array('allentries'));
    }
    
    public function indexAction()
    {
        
    }
    
    public function aboutAction() {
        $this->view->headTitle("关于我们");
        
        $this->view->sidebar =  self::getSidebar();
        $this->view->content = Ediary_Block::getBlock('Node', "node", array('about'));
        $this->render("contact-us");
    }
    
    public function contactUsAction() {
        $this->view->headTitle("联系我们");
        
        $this->view->sidebar =  self::getSidebar();
        $this->view->content = Ediary_Block::getBlock('Node', "node", array('contactus'));
    }
    
    public function toolsAction() {
        $this->view->headTitle("发布工具");
    }
    
     public static function getSidebar() {
         $items = array(
            array(
                'title' => '关于宜日记',
                'link'  => '/about',
                'current' => true
            ),
            array(
                'title' => '功能介绍',
                'link'  => '/node/page/tools'
            ),
            array(
                'title' => '加入我们',
                'link'  => '/',
            )
        );
        return Ediary_Theme::theme("Core", 'list', array(
            'items' => $items, 'attrs' => array('class' => 'sideNav')));
    }
    
    
}

