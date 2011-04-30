<?php
/**
 * 定时发送邮件任务
 * 
 * 利用外部工具触发
 * 确保间隔时间, 防止利用外部触发特性攻击
 * 
 * @author lds
 *
 */
class Ediary_Notification_Mail extends Ediary_Notification_Abstract
                               implements Ediary_Notification_Interface,
                                          Ediary_CronJob
{
    const FROM = 'notice@eriji.com';
    const FROM_NAME = '宜日记';
    const LAST_RUN_TIME_KEY = 'Notification_Mail#lastRunTime';
    
    private static $logger;
    
    public function __construct() {
        parent::__construct();
        
        $writer = new Zend_Log_Writer_Stream(APPLICATION_PATH 
                               . '/data/log/email-notice-log.txt');
        //$writer = new Zend_Log_Writer_Stream("php://output");
        self::$logger = new Zend_Log($writer); // 独立日志
    }
    
    /**
     * @see Ediary_CronJob::run()
     */
    public function run() {
        self::$logger->info(__CLASS__ . " run once");
        $this->notify();
    }
    
    /**
     * 立即发送邮件通知所有订阅该整点提醒的用户
     * 
     * @see Ediary_Notification_Interface::notify()
     * @return int 通知用户数
     */
    public function notify() {
        $result = array();
        $list = $this->getSendList();
        //var_dump($list);
        
        foreach ($list as $uid => $email) {
            $mail = new Zend_Mail("utf-8");
            $mail->setBodyText('该写日记了.')
                 ->setFrom(self::FROM, self::FROM_NAME)
                 ->addTo($email, $email)
                 ->setSubject('该写日记了' . time());
            //$result[] = $mail->send();
            
            self::$logger->info('Sending ' . self::mailToString($mail));
        }
        
        self::$logger->info("Sent " . count($list) . " notice email");
        return count($list);
    }
    
    /**
     * Convert Zend_Mail to String
     * @param Zend_Mail $mail
     */
    public static function mailToString($mail) {
        $to = $mail->getRecipients();
        return 'Mail [ From :'  . $mail->getFrom() 
                . ', To :'  . $to[0] 
                . ']';
    }
    
    
}