<?php
require_once 'Zend/Application.php';
require_once 'Zend/Test/PHPUnit/ControllerTestCase.php';
require_once 'Zend/Db.php';
require_once './Initialize.php';

abstract class ControllerTestCase extends Zend_Test_PHPUnit_ControllerTestCase
{
    protected $application;

    protected function setUp()
    {
        $this->bootstrap = array($this, 'appBootstrap');
        /*
        $this->bootstrap = new Zend_Application(
            'testing',
            APPLICATION_PATH . '/configs/application.ini'
        );
        */
        parent::setUp();
    }

    public function appBootstrap()
    {
        $this->application = new Zend_Application('testing' ,APPLICATION_PATH . '/configs/application.ini');
        $this->application->bootstrap();

        $bootstrap = $this->application->getBootstrap();
        $front = $bootstrap->getResource('FrontController');
        $front->setParam('bootstrap', $bootstrap);
        $front->throwExceptions(true);
    }
    
}
