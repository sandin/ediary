<?php
/**
 * @author lds
 *
 */
class Admin_CronController extends Zend_Controller_Action
{
    private $logger;
    private static $_allowAddresses = array('127.0.1.1', '127.0.0.1');

    public function init()
    {
        $this->_helper->JsonHelper->setNoView();
        $this->_ip = $this->getRequest()->getServer('REMOTE_ADDR');
    }

    /**
     * 使用外部触发(如crontab), 定时运行计划任务
     */
    public function indexAction()
    {
        ignore_user_abort(true);
        set_time_limit(0);
        
        $crontab = new Ediary_Crontab();
        if (! $crontab->hasTasks()) { // only at first time
            $crontab->schedule(new Ediary_Notification_Mail(), 1, 5*60);
        }
        echo $crontab->trigger($this->_ip);
        //exit(0);
    }

}

