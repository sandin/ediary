<?php 
require_once realpath(dirname(__FILE__) . '/../Bootstrap.php');

class Node_IndexController extends Zend_Controller_Action
{
    private $cache;

    public function init()
    {
        new Node_Bootstrap();
        //$this->_helper->cache(array('index', 'page'), array('allentries'));
    }
    
    public function indexAction()
    {
    }
    
    public function nodeBlock() {
        $view = $this->view; // innerView
        $view->inner_sidebar = "sidebar";
        $view->inner_content = file_get_contents(PUBLIC_PATH . '/static/help.html');
        
        $this->view->sidebar = $view->render("/templates/sidebar.phtml");
        $this->view->content = $view->render("/templates/node.phtml");
        $this->view->sidebarTitle = "宜日记帮助";
        $this->view->contentTitle = "常见问题解答(FAQ)";
        
        echo $this->renderScript("templates/page.phtml");
    }
    
}

