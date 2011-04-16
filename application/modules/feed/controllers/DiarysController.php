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
        $this->_helper->JsonHelper->setNoView();
        header('Content-Type: application/xml; charset=utf-8');
        header("Content-Disposition: attachment; filename=atom-" . date('Y-m-d') .".xml"); 
        
        $userId = $this->_getParam('user');
        // 因为隐私问题, 暂时只允许登录用户查看属于自己的RSS(私有RSS)
        if (null != $userId && is_numeric($userId) && $userId !== $this->_user->id) {
            $args = array(
                'user' => $userId
            );
            echo Ediary_Backup_RSS::export( $args );
        }
    }

}

