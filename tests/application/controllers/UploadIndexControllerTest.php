<?php

require_once 'PHPUnit/Framework/TestCase.php';

class UploadIndexControllerTest extends ControllerTestCase
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
    
    /** @dataProvider dataProvider */
    public function testImageAction($fileData, $diaryData) {
        // create a diary and upload some file into it
        $diary = Ediary_Diary::create($diaryData);
        $fileData['diary_id'] = $diary->id;
        $file = new Ediary_File($fileData);
        $file->insert();
        $this->assertEquals($diary->id, $file->diary_id);
        
        // mock request 
        $this->request->setMethod("GET");
        $this->dispatch("/upload/?id=" . $diary->id);
        //var_dump($this->getResponse()->getBody());
        
        // 至少存在一张图片
        $this->assertQueryCountMin('ul>li img', 1);
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
                ),
                array(
        			'user_id' => '3',
        			'title' => 'title',
        			'content' => 'content',
        			'weather' => 'sunshine',
        			'mood' => 'normal',
    				'status' => 'private',
        			'journal_id' => '1'
                ),
            ),
        );
    }


}

