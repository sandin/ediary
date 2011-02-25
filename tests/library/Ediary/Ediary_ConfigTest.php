<?php
require_once 'PHPUnit/Framework.php';


/**
 * Test class for Ediary_Config.
 * Generated by PHPUnit on 2011-02-23 at 17:27:03.
 */
class Ediary_ConfigTest extends ControllerTestCase
{
	
	private $config_from_file;
	
    /**
     * @var Ediary_Config
     */
    protected $object;

    /**
     * Sets up the fixture, for example, opens a network connection.
     * This method is called before a test is executed.
     */
    public function setUp()
    {
    	parent::setUp();
    	
    	$this->object = new Ediary_Config();
    	
    	// read config from file
    	$file = APPLICATION_PATH . '/configs/application.ini';
    	$this->assertTrue(file_exists($file));
    	
    	$this->config_from_file = new Zend_Config_ini($file, APPLICATION_ENV);
    	$this->assertNotNull($this->config_from_file);
    }

    /**
     * Tears down the fixture, for example, closes a network connection.
     * This method is called after a test is executed.
     */
    protected function tearDown()
    {
    	//Ediary_Config::flushCache(); // fluch cache, Case's section is [install] 
    }

    /**
     * @todo Implement testGetConfig().
     */
    public function testGetConfig()
    {
    	
    	$config = Ediary_Config::getConfig();
    	$this->assertTrue(Ediary_Config::hasCache()); // has cache now
    	$this->assertTrue(Ediary_Config::$useCache);
    	$this->assertNotNull($config); // config not null
    	$this->assertEquals($this->config_from_file->resources, $config->resources);
    	
    	// test flush cache 
    	Ediary_Config::flushCache();
    	$this->assertFalse(Ediary_Config::hasCache()); // no cache now
    	
    	// test get config's cache
    	$config = Ediary_Config::getConfig(false);
    	$this->assertFalse(Ediary_Config::$useCache); // did not use cache
    	
    	// Test section
    	$config = Ediary_Config::getConfig(false, 'install');
    	$this->assertFalse(Ediary_Config::hasCache()); // has cache now
    	$this->assertNotNull($config->ediary->config->installed);
    }
    
    public function testGetDbConfig() {
    	$db_config = $this->object->getDbConfig();
    	$expect_config = $this->config_from_file->resources->db->params;
    	
    	$this->assertEquals($expect_config->username,	$db_config->username);
    	$this->assertEquals($expect_config->host, 		$db_config->host);
    	$this->assertEquals($expect_config->password,	$db_config->password);
    	$this->assertEquals($expect_config->dbname,		$db_config->dbname);
    }
    
    public function testGetDbType() {
    	$expect_type = $this->config_from_file->resources->db->adapter;
    	$this->assertEquals($expect_type, $this->object->getDbType());
    }
    
    public function testUpdateConfig() {
    	$expected = rand(0, 1);
    	
    	Ediary_Config::updateConfig('install', 'installed', $expected);
    	$isInstalled = Ediary_Config::isInstalled();
    	
    	$this->assertEquals(( ($expected) ? true : false ), $isInstalled);
    }
    
    public function testSetInstalled() {
    	Ediary_Config::setInstalled(true);
    	$this->assertTrue(Ediary_Config::isInstalled());
    	
    	Ediary_Config::setInstalled(false);
    	$this->assertFalse(Ediary_Config::isInstalled());
    }
}
?>
