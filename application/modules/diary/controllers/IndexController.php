<?php

class Diary_IndexController extends Zend_Controller_Action
{
    private $_user;

    public function init()
    {
        /* Initialize action controller here */
        $this->_user = Zend_Registry::get('user');
        if (!isset($this->_user)) {
			$this->_redirect('/login');
		};
    }

    public function indexAction()
    {
        // action body
        $diary = Ediary_Diary::findByDate(Ediary_Database_Db::today(), $this->_user->id);
        if ($diary != null) {
            // Writed alreay, Just display it
            $this->view->diary = $diary->toArray(true);
        } else {
            // Display Pad to write diary
            $this->view->diary = array(
            	'id' => '-1',
                'title' => 'today',
                'content' => ''
            );
        }
    }
    
    private function _parsePost() {
        return array(
            'title' => $_POST['diary']['title'],
            'content' => $_POST['diary']['content']
        );
    }


}

