<?php
require_once 'PHPUnit/Framework.php';

/**
 * Test class for Ediary_User.
 * Generated by PHPUnit on 2011-02-26 at 14:23:54.
 */
class Ediary_UserMetadataTest extends ControllerTestCase
{
    /**
     * @var Ediary_Metadata_User
     */
    protected $obj;
    
    protected $data = array();
    
    private static $key = 'noticeMeAt';
    
    public function dataProvider() {
        $hour = date('H', time());
        $r = substr(microtime(), 3, 7); // random string
        return array(
            array('email10@gmail.com'.$r, self::$key, $hour),
            //array('email20@gmail.com'.$r, self::$key, $hour),
            //array('email30@gmail.com'.$r, self::$key, $hour),
            //array('email40@gmail.com'.$r, self::$key, $hour),
        );
    }

    /**
     * Sets up the fixture, for example, opens a network connection.
     * This method is called before a test is executed.
     */
    protected function setUp()
    {
        parent::setUp();
        $this->obj = new Ediary_Metadata_User(4);
    }

    /**
     * Tears down the fixture, for example, closes a network connection.
     * This method is called after a test is executed.
     */
    protected function tearDown()
    {
    }
    
    /**
     * @dataProvider dataProvider
     */
    public function testGetNoticeList($email, $key, $value) {
        
        $user = Ediary_User::create(array('email' =>  $email, 'password' => '321123123'));
        $this->assertTrue($user->id > 0);
        
        $uMeta = new Ediary_Metadata_User($user->id);
        $uMeta->delete($key); // preClean
        
        // 订阅提醒
        $row1 = $uMeta->set($key, $value);
        $this->assertEquals($row1, 1); // only one row affected
        
        // 得到订阅用户列表
        $list = Ediary_Notification_Mail::getNoticeList($value);
        $this->assertTrue(count($list) >= 1); // 至少有一个 
        //var_dump($list);
        
        // 发送提醒邮件
        $notification = new Ediary_Notification_Mail(); 
        $notification->notify();
        
        $uMeta->delete($key); // postClean
    }
    
    public function testSendWorker() {
       
    }
        
    public function testWhoHasWrittenDiary() {
        // create a user for this test
        $user = Ediary_User::create(array('email' =>  'lds'.time(), 'password' => '321123123'));
        $this->assertTrue($user->id > 0);
        
        // test data
        $endOfTheWorld = '3333-03-03';
        // cleanup 
        $db = Ediary_Db::getInstance();
        $db->query("DELETE FROM " . Ediary_Db::prefix('diarys') 
                 . " WHERE created_date = '" . $endOfTheWorld . "'");
        
        // create a diary for this test
        $diary = Ediary_Diary::create(array(
            'user_id' => $user->id,
            'content' => 'The last diary of human being.',
            'title' => 'End of The World'
        ));
        $diary->created_date = $endOfTheWorld;
        $diary->update();
        $this->assertTrue($diary->id > 0);
        $this->assertEquals($endOfTheWorld, $diary->created_date);
        
        // 今天已经写了日记的所有用户列表
        $hasWritten = Ediary_Notification_Mail::getWhoHasWrittenDiary($endOfTheWorld);
        $this->assertEquals(1, count($hasWritten)); // just me
        
        // 模拟订阅提醒
        $umate = new Ediary_Metadata_User($user->id);
        $umate->set(Ediary_Metadata_User::NOTICE, 23);
        
        // 得到23点需要通知的用户列表
        $orderList =  Ediary_Notification_Mail::getNoticeList(23);
        $orderIdList = array_keys($orderList);
        $this->assertTrue(count($orderIdList) > 0);
        
        $needToNotice = array_diff($orderIdList, $hasWritten);
        //var_dump($needToNotice);
        
        // 总订阅人数 - 已写日记人数 = 真正需要通知的人数
        $this->assertEquals(count($orderList) - count($hasWritten),
                            count($needToNotice));
        
         // cleanup
        $umate->delete(Ediary_Metadata_User::NOTICE);
        $diary->delete();
        $user->delete();
    }
    
}