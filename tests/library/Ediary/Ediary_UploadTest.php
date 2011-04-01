<?php
require_once 'PHPUnit/Framework.php';

/**
 * Test class for Ediary_User.
 * Generated by PHPUnit on 2011-02-26 at 14:23:54.
 */
class Ediary_UploadTest extends ControllerTestCase
{
    /**
     * @var Ediary_Diary
     */
    protected $object;
    
    /**
     * Sets up the fixture, for example, opens a network connection.
     * This method is called before a test is executed.
     */
    protected function setUp()
    {
        parent::setUp();
        
        $this->path = APPLICATION_PATH . '/../public/uploads';
        $this->object = new Ediary_Upload($this->path);
    }

    /**
     * Tears down the fixture, for example, closes a network connection.
     * This method is called after a test is executed.
     */
    protected function tearDown()
    {
    }
    
    public function testUpload() {
        $this->assertTrue(file_exists($this->path));
    }

}