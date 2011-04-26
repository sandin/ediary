<?php

class Node_Bootstrap extends Zend_Application_Module_Bootstrap
{
    private $_path;
    
    protected function _initModule() { 
        $this->_path = Ediary_Core::getModulePath('node');
        
        $block = Ediary_Block::getInstance();
        $block->addBlock('Node', 'node', array($this, 'nodeBlock'));
        
        $this->addThemes();
    }
    
    public function addThemes() {
        $sidebarTemplate = $this->_path . "/views/scripts/templates/sidebar.phtml";
        Ediary_Theme::register("Node", "sidebar", $sidebarTemplate);
        
        $nodeTemplate = $this->_path . "/views/scripts/templates/node.phtml";
        Ediary_Theme::register("Node", "node", $nodeTemplate);
    }
    
    public function nodeBlock($node) {
        // TODO: 将内容使用数据库作为持久层支持。
        $file = $this->_path . '/data/' . urlencode($node) . '.php';
        if (! file_exists($file)) {
            Ediary_Core::notFound();
        }
        /* node = */ include $file;
        
        return Ediary_Theme::theme('Node', 'node', array('node' => $node));
    }

}