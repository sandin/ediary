<?php

class Admin_PluginsController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        $input = new Zend_Filter_Input(array('name'=>'StringTrim'),
                                       array(), $_GET);
                                       
        if ($input->isValid()) {
            $this->view->content = $this->getPluginPageContent($input->name);
        }
    }
    
    private function getPluginPageContent($name) {
        $content = 'no content';
        $plugin = $this->getPlugin($name);
        if ($plugin != null) {
            $pages = $plugin->_initPages();
            $method = $pages[0]['callback']; // TODO: $pages[1], $pages[2]...
            if (method_exists($plugin, $method)) {
                //$result = @call_user_func(array(get_class($plugin), $method));
                $result = $plugin->$method();
                $content = ($result != false) ? $result : $content;
            }
        }
        return $content;
    }
    
    /**
     * Get Plugin class instance 
     * 
     * @param String $name plugin name
     * @return Ediary_Plugin or NULL
     */
    private function getPlugin($name) {
        $pluginClass = 'Plugins_' . ucfirst($name) . '_Plugin';
        if (class_exists($pluginClass, false)) {
            return new $pluginClass();
        }
    }
    
    private function getPlugins() {
    }


}

