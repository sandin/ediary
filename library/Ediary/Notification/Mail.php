<?php
/**
 * 定时发送邮件任务
 * 
 * 利用外部工具触发
 * 确保间隔时间, 防止利用外部触发特性攻击
 * 
 * 注意: 该任务的间隔时间必须大于或等于一个小时, 否则会对同一用户进行重复提醒
 * 
 * @author lds
 *
 */
class Ediary_Notification_Mail extends Ediary_Notification_Abstract
                               implements Ediary_Notification_Interface,
                                          Ediary_CronJob
{
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

        $transport = Ediary_Mail::getTransport(Ediary_Mail::SMTP);
        Zend_Mail::setDefaultFrom(Ediary_Mail::getConfig("smtp")->config->username,
                                  self::FROM_NAME);
        
        foreach ($list as $uid => $email) {
            if (! Zend_Validate::is($email, "EmailAddress") )
                continue; // 邮箱地址不合法
            
            $mail = new Zend_Mail("utf-8");
            $mail->addTo($email, $email)
                 ->setBodyText(self::createMailBody($uid))
                 //->setBodyHtml(self::createMailBody($uid))
                 ->setSubject(Ediary_Date::dayAndWeek() . " - 今天过的怎么样?")
                 ->send($transport);
            self::$logger->info('Sending ' . Ediary_Mail::asString($mail));
        }
        
        self::$logger->info("Sent " . count($list) . " notice email");
        return count($list);
    }
    
    /**
     * Create email's body
     * @param String $user_id
     * @param boolean $isHtml need html message or not
     * @return string
     */
    public static function createMailBody($user_id, $isHtml = false) {
    	$msg = <<<MAIL
回复此邮件即可发布日记. 
{{diary}}
浏览最近日记: 
http://www.eriji.com/diarys
\n
取消邮件提醒:
http://www.eriji.com/user/settings/notice
MAIL;

    	// get last week's diary if any
    	$diary = Ediary_Diary::findByDate(Ediary_Date::lastWeek(), $user_id);
    	if (null != $diary) {
    	    $diary->content = strip_tags($diary->content);
    	    $replace = "\n还记得 7 天前你写了些什么吗?\n\n"
    	    		 . "-----------------------------\n"
    	    	     .  $diary->title . "\n\n"
    	    	     .  $diary->content . "\n"
    	    	     . "-----------------------------\n";
    	} else {
    	    $replace = "";
    	}
    	
    	$msg = str_replace("{{diary}}", $replace, $msg);
    	if ($isHtml) {
            return nl2br($$msg);
        }
        return $msg;
    }
}