<?php

class Diary_IndexController extends Zend_Controller_Action
{
    private $_user;
    
    public function init()
    {
        /* Initialize action controller here */
        Ediary_Auth::authRedirect();
        $this->_user = Zend_Registry::get(Ediary_Auth::KEY);
    }

    public function indexAction()
    {
        $diary_id = $this->_getParam('id');
        
        if (isset($diary_id) && is_numeric($diary_id)) {
            // 提供ID, 则尝试打开该ID日记
            $diary = $this->_openDiary($diary_id);
        } else {
            // 打开今天的日记, 今天无日记则新建一篇
            $diary = Ediary_Diary::findByDate(Ediary_Db::today(), $this->_user->id);
            if (null == $diary) {
                $diary = Ediary_Diary::newDiary();
                $this->view->placeholder('message')->set("今日还没写日记");
            }  
        }
        
        $this->view->diary = $diary->toArray(true);
        //var_dump($this->view->diary);
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

