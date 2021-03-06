<?php
require_once 'PHPUnit/Framework.php';

/**
 * Test class for Ediary_User.
 * Generated by PHPUnit on 2011-02-26 at 14:23:54.
 */
class Ediary_SendmailTest extends ControllerTestCase
{
    /**
     * @var Ediary_Journal
     */
    protected $object;
    
    protected $data = array();

    /**
     * Sets up the fixture, for example, opens a network connection.
     * This method is called before a test is executed.
     */
    protected function setUp()
    {
        parent::setUp();
    }

    public function dataProvider() {
        return array(
            array(
                array(
        			'user_id' => '3',
                    'diary_id' => '0000000000',
        			'filename' => 'testfile.jpg',
        			'filepath' => '/your/path/testfile.jpg',
        			'filemime' => 'image/jpg',
        			'filesize' => '12000',
                )
            ),
        );
    }

    /**
     * Tears down the fixture, for example, closes a network connection.
     * This method is called after a test is executed.
     */
    protected function tearDown()
    {
    }
    
    /** @dataProvider dataProvider 
    public function testSend($data) {
        $mail = new Ediary_Mail_Sendmail();
        
        $r = $mail->send("172339248@qq.com",
                    "from sendmail" . time(),
                    "sendmail body". time(),
                    "lds2012@gmail.com",
                    "SendMail localhost");
        var_dump($r);
    }*/
    
    /* 该测试会发送邮件
    public function testZendMail() {
        $email = '172339248@qq.com';
        $config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/mail.ini', APPLICATION_ENV);
        $transport = new Zend_Mail_Transport_Smtp($config->smtp->host, $config->smtp->config->toArray());
        Zend_Mail::setDefaultFrom("eriji01@163.com", "PHPUNIT WITH CONFIG");
        
        $mail = new Zend_Mail("utf-8");
        $mail->setBodyText('今天该写日记了.')
             ->addTo($email, $email)
             ->setSubject(Ediary_Date::getDateAndWeek());
        $mail->send($transport);

        echo Ediary_Mail::asString($mail);
    }*/
    
    /*
    public function testNotifyTemp() {
        $e = new Ediary_Notification_Mail();
        $e->notify();
    }
    */
    
    public function testA() {
        $this->assertNotNull(Ediary_Date::lastWeek());
        $this->assertNotNull(Ediary_Date::lastWeek("RPC"));
        
        $this->assertNotNull(Ediary_Notification_Mail::createMailBody(10000000));
    }
}