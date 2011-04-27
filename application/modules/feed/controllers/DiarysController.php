<?php

class Feed_DiarysController extends Zend_Controller_Action
{
    private $_user;

    public function init()
    {
        /* Initialize action controller here */
        Ediary_Auth::authRedirect();
        $this->_user = Ediary_Auth::getUser();
    }

    public function indexAction()
    {
        if( !ini_get('safe_mode') ){ 
            set_time_limit(0); // it takes a long time
        }
        $this->_helper->JsonHelper->setNoView();
        
        $userId = $this->_getParam('user');
        // 因为隐私问题, 暂时只允许登录用户查看属于自己的RSS(私有RSS)
        if (null != $userId && is_numeric($userId) && $userId == $this->_user->id) {
            $this->_response->setRawHeader('Content-Type: application/xml; charset=utf-8');
            $this->_response->setRawHeader("Content-Disposition: attachment; filename=atom-" . date('Y-m-d') .".xml"); 
            
            $rss = new Ediary_Backup_RSS();
            echo $rss->export(array('user' => $userId, 'max'  => 100));
        } else {
            exit("no access");
        }
    }

}

