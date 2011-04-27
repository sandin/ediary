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
        $this->view->sidebar =  self::getSidebar();
        $this->view->content = Ediary_Block::getBlock('Node', "node", array('about'));
        $this->render("contact-us");
    }
    
    public function contactUsAction() {
        $this->view->sidebar =  self::getSidebar();
        $this->view->content = Ediary_Block::getBlock('Node', "node", array('contactus'));
    }
    
     public static function getSidebar() {
         $items = array(
            array(
                'title' => '关于宜日记',
                'link'  => '/about',
                'current' => true
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

