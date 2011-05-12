<?php
// DEBUG profile
if (extension_loaded('xhprof')) {
    xhprof_enable();
    
    function __shutdown_function() {
        require_once 'Ediary/Debug.php';
        Ediary_Debug::stopProfile();
    }
    register_shutdown_function('__shutdown_function');
}

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

// Application.ini.inc cache file
defined('CONFIG_INC')
    || define('CONFIG_INC', APPLICATION_PATH . '/data/cache/application.ini.inc');

// We use default config if no cache
$configFile = CONFIG_INC;
$noConfigCache = false;
if (false == is_file(CONFIG_INC)) {
    $configFile = APPLICATION_PATH . '/configs/application.ini';
    $noConfigCache = true;
}


/** Zend_Application */
require_once 'Zend/Application.php';

// Create application, bootstrap, and run
$application = new Zend_Application(
    APPLICATION_ENV,
    $configFile
);
$application->bootstrap()
            ->run();
            
// Create the cache of config if no
// Only for production
if ($noConfigCache /*&& ('production' == APPLICATION_ENV)*/ ) {
    $configs = '<?php' . PHP_EOL
             . 'return '
             . var_export($application->getOptions(), true) . PHP_EOL
             . '?>';
    file_put_contents(CONFIG_INC, $configs);
}
