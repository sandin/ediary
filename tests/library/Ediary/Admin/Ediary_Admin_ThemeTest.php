<?php
require_once 'PHPUnit/Framework.php';

/**
 * Test class for Ediary_User.
 * Generated by PHPUnit on 2011-02-26 at 14:23:54.
 */
class Ediary_Admin_ThemeTest extends ControllerTestCase
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
        $this->object = new Ediary_Admin_Theme();
        
    }

    /**
     * Tears down the fixture, for example, closes a network connection.
     * This method is called after a test is executed.
     */
    protected function tearDown()
    {
    }
    
    public function testUpdate() {
        $this->object->update();
    }
    

}