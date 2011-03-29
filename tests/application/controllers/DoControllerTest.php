<?php

require_once 'PHPUnit/Framework/TestCase.php';

class DoControllerTest extends ControllerTestCase
{

    public function setUp()
    {
        /* Setup Routine */
         parent::setUp();
    }

    public function tearDown()
    {
        /* Tear Down Routine */
    }
    
    // 该测试必须开启 hack auth
    // 并且 hack auth 必须有至少 10篇以上的日记存在
    public function testUserDiaryAction() {
        
        $this->request->setMethod("POST")
                      ->setPost(array(
                          'count' => 1,
                          'page'  => 1
                      ));
        $this->dispatch("/diary/do/userdiarys");
        
        $this->assertModule('diary');
        $this->assertController('do');
        $this->assertAction('userdiarys');
        
        $this->assertResponseCode('200');
        $response = Zend_Json::decode($this->getResponse()->getBody()); // return array
        
        $this->assertEquals(count($response), 1); // count 1
        $this->assertNotNull($response[0]['id']);   // diary id is not null
        
        $this->resetRequest()
             ->resetResponse();
        /////////////////////////////////////////////////// 
        
        $this->request->setMethod("POST")
                      ->setPost(array(
                          'count' => 10,
                          'page'  => 1
                      ));
        $this->dispatch("/diary/do/userdiarys");
        $this->assertResponseCode('200');
        $response = Zend_Json::decode($this->getResponse()->getBody()); // return array
        
        $this->assertEquals(count($response), 10); // count 10
        
    } 


}

