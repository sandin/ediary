<?php

require_once 'PHPUnit/Framework/TestCase.php';

class CronControllerTest extends ControllerTestCase
{

    public function setUp()
    {
         parent::setUp();
    }

    public function tearDown()
    {
    }

    /**
     * NOTE: 此测试会清空所有数据库中的计划任务
     */
    public function testUserDiaryAction() {
        //set_time_limit(0);
        $delay = 6; //秒
        
        $crontab = new Ediary_Crontab();
        $crontab->resetTasks();
        $crontab->schedule(new Ediary_Notification_Mail(), 0, $delay);
        //var_dump($crontab->getTasks());
        
        $response = $this->_trigger(); // 初始检查
        //var_dump($response);
        $this->assertEquals(0, $response); // 时间未到
        $this->resetRequest()->resetResponse();
        
        sleep($delay/2); // 中程检查
        $response = $this->_trigger(); 
        //var_dump($response);
        $this->assertEquals(0, $response); // 时间未到
        $this->resetRequest()->resetResponse();
        
        sleep($delay); // 末了检查
        $response = $this->_trigger();
        //var_dump($response);
        $this->assertEquals(1, $response); // 时间已到, 任务被触发
        $this->resetRequest()->resetResponse();
        $this->assertTrue(true);
        
    } 
    
    private function _trigger() {
        $this->request->setMethod("GET");
        $this->dispatch("/admin/cron");
        return intval($this->getResponse()->getBody());
    }
    

}