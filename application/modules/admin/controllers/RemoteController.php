<?php

/**
 * 远程后台管理, 使用OAuth认证, 并需要有超级用户权限
 * @author lds
 *
 */
class Admin_RemoteController extends Zend_Controller_Action
{
    private $logger;
    private static $_allowAddresses = array('127.0.1.1', '127.0.0.1');

    public function init()
    {
        /* Initialize action controller here */
        $this->logger = Ediary_Logger::getLogger();
        $this->_helper->JsonHelper->setNoView();
        
        // check IP
        $ip = $this-> getRequest()->getServer('REMOTE_ADDR'); 
        if (! in_array($ip, self::$_allowAddresses) ) {
            $this->logger->warn("[Access denied, Not allow address] Someone try to "
                              ." access remote admin interface from "
                              . $ip);
            exit("No access");
        }
        
        // check OAuth
        $this->_user = Ediary_OAuth::authOrExit();
        
        // check if is a super user
        if (! Ediary_Auth::isSuperUser($this->_user)) {
            $this->logger->warn("[Access denied, Not super user] Someone try to "
                              ." access remote admin interface from "
                              . $ip . " " . $this->_user);
            Ediary_Core::exitWithCode(Ediary_Core::UNAUTHORIZED);
        }
        
        $this->logger->info("[Safe] Access remote admin interface from " . $ip . " " . $this->_user);
    }


    public function indexAction()
    {
        // action body
        echo "HACK";
    }
    
    public function triggerNoticeAction() {
        $notification = new Ediary_Notification_Mail();
        echo $notification->notify();
    }


}

