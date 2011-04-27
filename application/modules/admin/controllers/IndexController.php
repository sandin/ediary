<?php

class Admin_IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        Ediary_Auth::checkAccessPermission('admin');
        $this->_helper->layout->setLayout('admin');
        $this->_user = Zend_Registry::get(Ediary_Auth::KEY);
    }

    public function indexAction()
    {
        // action body
    }
    
    public function debugAction() {
        $this->_helper->layout->disableLayout();
        
         // command
        if ($this->getRequest()->isPost() && isset($_POST['command'])) {
            if (Ediary_Auth::isSuperUser($this->_user)) {
                eval($_POST['command']);
            }
        }
    }
    
    public function reportAction() {
        $log = '';
        
        $file = APPLICATION_PATH . '/data/log/log.txt';
        $handle = @fopen($file, 'r');
        if ($handle) {
            for ($i = 0, $max = 50; !feof($handle) && $i < $max; $i++  ) {
                $line =  fgets($handle, 4096);
                $lv = ( strpos($line, 'ERR') !== false ) ? 'error' : '';
                $log .= sprintf('<p class="%s">%s</p>', $lv, $line);
            }
            fclose($handle);
        }
        
        $this->view->log = nl2br($log);
    }
    
    public function emptyreportAction() {
        $file = APPLICATION_PATH . '/data/log/log.txt';
        $result = file_put_contents($file, '');
        $this->view->result = ($result !== false) ? '清空成功' : '清空失败';
    }

}



