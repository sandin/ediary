<?php

class Help_Bootstrap extends Zend_Application_Module_Bootstrap
{
    protected function _initModule() { 
        $block = Ediary_Block::getInstance();
    }
    
}