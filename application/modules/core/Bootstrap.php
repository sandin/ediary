<?php

class Core_Bootstrap extends Zend_Application_Module_Bootstrap
{
    private $_path;
    
    protected function _initModule() { 
        $this->_path = Ediary_Core::getModulePath('core');
        
        $this->addThemes();
    }
    
    public function addThemes() {
        $listTemplate = $this->_path . "/views/templates/list.phtml";
        $themeManager = Ediary_Theme::register("Core", "list", $listTemplate);
    }
    
    public static function listTheme($items = array(), $attrs = array()) {
        $children = '';
        $default = array(
        	'title' => 'title',
          	'link'  => 'link',
           	'current' => false,
           	'attrs'  => array()
        );
        for ($i = 0, $l = count($items); $i < $l; $i++) {
            $item = array_merge($default, $items[$i]);
            if ($i === 0) {
                $item['attrs'] = Ediary_Dom::addClass('first', $item['attrs']);
            } else if ($i === $l - 1) {
                $item['attrs'] = Ediary_Dom::addClass('last', $item['attrs']);
            } 
            if ($item['current']) {
                $item['attrs'] = Ediary_Dom::addClass('current', $item['attrs']);
            }
            $a = Ediary_Dom::createElement('a', $item['title'], array('href' => $item['link']));
            $li = Ediary_Dom::createElement('li', $a, $item['attrs']);
            $children .= $li . "\n";
        }
        $ul = Ediary_Dom::createElement('ul', "\n" .$children. "\n", $attrs);
        return $ul;
    }
    

}