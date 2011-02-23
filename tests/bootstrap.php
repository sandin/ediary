<?php 
error_reporting( E_ALL | E_STRICT );

define('BASE_PATH', realpath(dirname(__FILE__) . '/../'));
define('APPLICATION_PATH', BASE_PATH . '/application');


// Include path
set_include_path(
    '.'
    . PATH_SEPARATOR . BASE_PATH . '/library'
    . PATH_SEPARATOR . get_include_path()
);

defined('BOOT_PATH')
    || define('BOOT_PATH', realpath(dirname(__FILE__) . '/../'));

defined('PUBLIC_URL')
    || define('PUBLIC_URL', 'http://' ); 

// Define application environment
define('APPLICATION_ENV', 'testing');

$_SERVER['SERVER_NAME'] = 'http://localhost';


/** Zend_Application */
require_once 'Zend/Application.php';  

// Create application, bootstrap, and run
            
require_once 'ControllerTestCase.php';



