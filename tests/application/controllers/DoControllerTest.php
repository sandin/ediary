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
        
        $this->assertEquals(count($response['diarys']), 1); // count 1
        $this->assertNotNull($response['diarys'][0]['id']);   // diary id is not null
        
        
        /////////////////////////////////////////////////// 
        $this->resetRequest()
             ->resetResponse();
        
        $this->request->setMethod("POST")
                      ->setPost(array(
                          'count' => 10,
                          'page'  => 1
                      ));
        $this->dispatch("/diary/do/userdiarys");
        $this->assertResponseCode('200');
        $response2 = Zend_Json::decode($this->getResponse()->getBody()); // return array
        
        $this->assertEquals(count($response2['diarys']), 10); // count 10
    } 
    
    public function testGetDiarysSince() {
        $diary = $this->_createDiary();
        
        $this->request->setMethod("POST")
                      ->setPost(array(
                          'count' => 1,
                          'page'  => 1,
                          'since' => '2011-03-29',
                          'max'   => '2011-03-29'
                      ));
        $this->dispatch("/diary/do/userdiarys");
        $this->assertResponseCode('200');
        
        $response = Zend_Json::decode($this->getResponse()->getBody()); // return array
        $this->assertEquals(count($response['diarys']), 1); // count 1
    }
    
    private function _createDiary() {
         $data = array(
        	'title' => 'title',
        	'content' => 'content',
        	'weather' => 'sunshine',
        	'mood' => 'normal',
    		'status' => Ediary_Diary::STATUS_PRIVATE,
        	'user_id' => '3',
        	'journal_id' => '1'
        );
        return Ediary_Diary::create($data);
    }
    
    public function testDeleteAction() {
        $diary = $this->_createDiary();
        $this->assertTrue($diary->id > 0);
        
        $this->request->setMethod("POST")
                      ->setPost(array(
                          'id' => $diary->id,
                      ));
        $this->dispatch("/diary/do/delete");
        
        $response = Zend_Json::decode($this->getResponse()->getBody());
        $this->assertTrue($response['result']);
        
        /////////////////////////////////////////////////// 
        $this->resetRequest()
             ->resetResponse();
        
        $this->request->setMethod("POST")
                      ->setPost(array(
                          'id'  => '13242342324423' // no exists
                      ));
        $this->dispatch("/diary/do/delete");
        $response = Zend_Json::decode($this->getResponse()->getBody());
        $this->assertNull($response['result']);  // cann't delete 
    }


}

