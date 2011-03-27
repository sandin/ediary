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
        $diary = null;
        $diary_id = $this->_getParam('id');
        
        if (isset($diary_id) && is_numeric($diary_id)) {
            // Open a particular diary
            $diary = Ediary_Diary::find($this->_getParam('id'));
            if (!isset($diary) || $diary->user_id != $this->_user->id) {
                //TODO: 
                echo _t("该日记不存在, 或您没有权限打开它.");
                exit();
            }
        } else {
            // Open today's diary
            $diary = Ediary_Diary::findByDate(Ediary_Database_Db::today(), $this->_user->id);
            if (null == $diary) {
                // Today did not write a diary, create a new one
                $diary = new Ediary_Diary(array(
               		'id' => '-1',
                    'title' => Ediary_Database_Db::today(),
                    'content' => ''
                ));
            }
        }
        
        var_dump($diary->toArray(true));
        
        $this->view->diary = $diary->toArray(true);
        
       
    }
    
    private function _parsePost() {
        return array(
            'title' => $_POST['diary']['title'],
            'content' => $_POST['diary']['content']
        );
    }


}

