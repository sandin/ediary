<?php
// Define path to application directory
defined('APPLICATION_PATH')
    || define('APPLICATION_PATH', realpath(dirname(__FILE__) . '/../application'));
    
// Define path to web public directory
defined('PUBLIC_PATH')
    || define('PUBLIC_PATH', realpath(dirname(__FILE__)));

// Define application environment
defined('APPLICATION_ENV')
    || define('APPLICATION_ENV', (getenv('APPLICATION_ENV') ? getenv('APPLICATION_ENV') : 'production'));

// Ensure library/ is on include_path
set_include_path(implode(PATH_SEPARATOR, array(
    realpath(APPLICATION_PATH . '/../library'),
    realpath(APPLICATION_PATH . '/../library/oauth-php/library'),
    get_include_path(),
)));

require_once 'Zend/Application.php';
require_once 'Ediary/Config.php';
require_once 'Ediary/Debug.php';
//Ediary_Debug::startProfile();

// Create application, bootstrap, and run
$application = new Zend_Application(
    APPLICATION_ENV,
    Ediary_Config::getAppConfig(APPLICATION_PATH . '/configs/application.ini')
);
$application->bootstrap()
            ->run();
            