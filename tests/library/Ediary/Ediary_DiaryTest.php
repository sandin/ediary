<?php
require_once 'PHPUnit/Framework.php';

/**
 * Test class for Ediary_User.
 * Generated by PHPUnit on 2011-02-26 at 14:23:54.
 */
class Ediary_DiaryTest extends ControllerTestCase
{
    /**
     * @var Ediary_Diary
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
        
        $this->data = array(
        'title' => 'title',
        'content' => 'content',
        'weather' => 'sunshine',
        'mood' => 'normal',
    	'status' => Ediary_Diary::STATUS_PRIVATE,
        'user_id' => '3',
        'journal_id' => '1'
        );
        
        $this->object = new Ediary_Diary($this->data);
    }

    /**
     * Tears down the fixture, for example, closes a network connection.
     * This method is called after a test is executed.
     */
    protected function tearDown()
    {
    }
    
    public function testInsert() {
        // insert
        $diary = $this->object;
        
        
        //$result = $diary->insert();
        //$this->assertTrue( $result );
        
    }
    
    public function testCreate() {
        // create 
        $diary = Ediary_Diary::create( $this->data ) ;
        $this->assertEquals($this->data['title'], $diary->title);
        $this->assertEquals($this->data['content'], $diary->content);
        $this->assertEquals($this->data['user_id'], $diary->user_id);
    }
    
    public function testDeleteById() {
        $diary = Ediary_Diary::create( $this->data );
        $this->assertTrue($diary->id > 0);
        
        // delete
        $result = $diary->delete();
        $this->assertTrue($result);
    }
    
    public function testUpdate() {
        // create a new diary for this test
        $newDiary = Ediary_Diary::create( $this->data );
        
        // find the diary
        $diary = Ediary_Diary::find($newDiary->id);
        $this->assertEquals($this->data['content'], $diary->content);
        
        $old_saved_at = $diary->saved_at;
        sleep(1); // wait for update saved_at time
        
        // set new values
        $newContent = 'new content new content';
        $diary->content = $newContent;
        $diary->update();
        
        $this->assertEquals($newContent , $diary->content);
        $this->assertNotEquals($old_saved_at, $diary->saved_at); // has been touched
    }
    
    public function testFind() {
        $diary = Ediary_Diary::create( $this->data );
        $diaryId = $diary->id;
        
        $diaryFined = Ediary_Diary::find($diaryId);
        $this->assertEquals($diaryId, $diaryFined->id);
    }
    
    public function testFindByDate() {
        $diary = Ediary_Diary::create( $this->data );
        $diaryId = $diary->id;
        $today = Ediary_Database_Db::today();
        
        var_dump($this->data['user_id']);
        
//        $start = xdebug_time_index();
        $diaryFined = Ediary_Diary::findByDate($today, $this->data['user_id']);
//        $end = xdebug_time_index();
//        var_dump($end - $start);

        $this->assertNotNull($diaryFined);
        $this->assertEquals($diaryId, $diaryFined->id);
    }
}
?>
