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
        $diary_id = $this->_getParam('id');
        
        if (isset($diary_id) && is_numeric($diary_id)) {
            $diary = $this->_openDiary($diary_id);
        } else {
            $diary = Ediary_Diary::findByDate(Ediary_Db::today(), $this->_user->id);
            $diary = (null != $diary) ? $diary : Ediary_Diary::newDiary();
        }
        
        $this->view->diary = $diary->toArray(true);
        var_dump($this->view->diary);
    }
    
    private function _openDiary($id) {
        $diary = Ediary_Diary::find($id);
        if ($diary != null && $diary->user_id == $this->_user->id) {
            return $diary;
        } else {
            return Ediary_Core::exitApp(_t("该日记不存在, 或您没有权限访问"));
        }
    }
    
    private function _parsePost() {
        return array(
            'title' => $_POST['diary']['title'],
            'content' => $_POST['diary']['content']
        );
    }


}

