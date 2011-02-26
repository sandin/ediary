<?php
require_once 'Zend/Application.php';
require_once 'Zend/Test/PHPUnit/ControllerTestCase.php';
require_once 'Zend/Db.php';

abstract class ControllerTestCase extends Zend_Test_PHPUnit_ControllerTestCase
{
    protected $application;

    protected function setUp()
    {
        $this->bootstrap = array($this, 'appBootstrap');

        $params = array ('host'     => '127.0.0.1',
                 'username' => 'lds',
                 'password' => '123',
                 'dbname'   => 'lds0019');
        $db = Zend_Db::factory('PDO_MYSQL', $params);
        Zend_Registry::set('db',$db);

        parent::setUp();
    }

    public function appBootstrap()
    {
        $this->application = new Zend_Application(APPLICATION_ENV,APPLICATION_PATH . '/configs/application.ini');
        $this->application->bootstrap();

        $bootstrap = $this->application->getBootstrap();
        $front = $bootstrap->getResource('FrontController');
        $front->setParam('bootstrap', $bootstrap);

    }




}
