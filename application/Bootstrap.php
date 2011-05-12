<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
    const INSTALLING = 'installing';

    protected function _initAutoload() {
        // Plugin Loader Cache
        $classFileIncCache = APPLICATION_PATH . '/data/cache/pluginLoaderCache.php';
        if (file_exists($classFileIncCache)) {
            include_once $classFileIncCache;
        }
        Zend_Loader_PluginLoader::setIncludeFileCache($classFileIncCache);

        // AutoLoader
        $autoloader = Zend_Loader_Autoloader::getInstance();
        $autoloader->setFallbackAutoloader(true);
        $autoloader->registerNamespace('Ediary_');

        /*
        // Load all modules under moduleDirectory
        $config = $this->getOption('resources');
        $modulesDir = $config['frontController']['moduleDirectory'];
        $modules = Ediary_Utility_File::getSubDir($modulesDir);

        foreach ($modules as $module) {
            new Zend_Application_Module_Autoloader(array(
      			'namespace' => ucfirst($module),
      			'basePath'  => APPLICATION_PATH . '/modules/' . strtolower($module),
            ));
        }
        */
    }
    
    protected function _initFunctions() {
        // load funtions
        include 'Ediary/Utility/functions.php';
    }

    protected function _initEnvironment() {
        // 注意: 关闭魔法引号, 入库前一定注意数据安全性
        @set_magic_quotes_runtime( 0 );
        @ini_set('magic_quotes_runtime', 0);
        @ini_set('magic_quotes_sybase', 0 );
        ini_set("date.timezone", 'PRC');
        
        if (!defined('DS')) { define('DS', DIRECTORY_SEPARATOR); }
    }
    
    protected function _initConfig() 
    { 
         $config = new Zend_Config($this->getOptions()); 
         Zend_Registry::set('config', $config); 
         return $config;
    } 
    
    protected function _initLogger() {
        $config = $this->getOption('ediary');
        Ediary_Logger::setConfig($config['logger']);
    }

    protected function _initInstallChecker() {
        if ( !Ediary_App::isInstalled()) {
            Ediary_Core::gotoUrl("/install.php");
        }
    }

    protected function _initDatebase() {
        $resources = $this->getPluginResource('db');
        $dbAdapter = $resources->getDbAdapter();
        $config = $dbAdapter->getConfig();
        
        $db = Ediary_Db::getInstance()->setConnection($dbAdapter);
        $db->setPrefix($config['prefix']);
        $db->setCharset($config['charset']);

        Zend_Db_Table::setDefaultAdapter($dbAdapter);
    }
    
    protected function _initSession()
    {
        /* TODO: 安装之前不存在seesions表, 所以会报错 */
        if ( Ediary_App::isInstalling() ) {
            return; // no install yet
        }
        $db = Ediary_Db::getInstance();
        Zend_Db_Table_Abstract::setDefaultAdapter($db->getConnection());
        
        //配置SessionDB字段
        $config = array(
	  		'name'           => Ediary_Db::prefix('sessions'),
	  		'primary'        => 'id',
	  		'modifiedColumn' => 'modified',
	  		'dataColumn'     => 'data',
	  		'lifetimeColumn' => 'lifetime'
	    );
	    Zend_Session::setSaveHandler(new Zend_Session_SaveHandler_DbTable($config));
    }
    
    protected function _initAuth() {
        $user = Ediary_Auth::getIndentity();
        //var_dump($user);
        Zend_Registry::set(Ediary_Auth::KEY, $user);
    }
    
    protected function _initCache() {
        $manager = $this->getPluginResource('cachemanager')
                        ->getCacheManager();
        $dbCache = $manager->getCache('database');
        //var_dump($dbCache);
    }
    
    protected function _initHooks() {
        //Ediary_Hooks::notify("onAppBoot");
    }
    
    protected function _initPlugins() {
        //TODO : 注册插件只在后台管理插件时进行(一次)
        // 后台管理页面: 从文件系统从一一读取插件目录下的所有插件信息
        // 确认开启莫插件后进行注册(开启插件列表入库)
        // 平时插件列表使用cache数据, 不读库
        new Plugins_Guest_Plugin();
    }

    /*
    protected function _initTranslate() {
        $translate = Ediary_I18n::getTranslate(Ediary_I18n::ZH);
        Zend_Registry::set(Ediary_I18n::REGISTRY_KEY, $translate);
        Zend_Validate_Abstract::setDefaultTranslator($translate);
    }
    */

    protected function _initControllers() {
        $this->bootstrap('FrontController');
        $front = $this->frontController;

        // Response header
        $response = new Zend_Controller_Response_Http;
        $response->setHeader('Content-Type', 'text/html; charset=UTF-8', true);
        $front->setResponse($response);
        
        //Zend_Controller_Action_HelperBroker::removeHelper('viewRenderer');
        
        // Plugins
        $error_plugin = new Zend_Controller_Plugin_ErrorHandler();
        $error_plugin->setErrorHandlerModule('default')
                     ->setErrorHandlerController('error')
                     ->setErrorHandlerAction('error');
        	
        $front->throwExceptions(true); // 人工捕捉异常
        
        // Helper 
        $jsonHelper = new Ediary_Helper_JsonHelper();
        Zend_Controller_Action_HelperBroker::addHelper($jsonHelper);
    }

    protected function _initRoute() {
        $front = $this->frontController;
        $router = $front->getRouter();
        $router->addConfig(new Zend_Config($this->getOption('routes')));
        
		// REST-API
        $restRoute = new Zend_Rest_Route($front, array(), array(
    		'api' => array('diarys')
        ));
        $router->addRoute('rest', $restRoute);
        
        return $router;
    }

    protected function _initExceptionHandler() {
        $config = $this->getOption('ediary');
        if (! $config['debug']) {
            Ediary_Exception::handleException();
        }
    }

    protected function _initView() {
        Zend_Layout::startMvc();
        $view = Zend_Layout::getMvcInstance()->getView();

        // SETUP THE HEAD TITLE
        $view->headTitle(_t("宜日记"))
             ->setSeparator(' - ')
             ->setDefaultAttachOrder('PREPEND');
        
        $view->setEncoding('UTF-8');
        
        // 公共模板在 'views/script' 目录下
        $view->addBasePath(APPLICATION_PATH . '/views');
        
        // Register Helpers
        $view->addHelperPath(APPLICATION_PATH. '/../library/Ediary/View/Helper', 'Ediary_View_Helper');
        
        // vars in view
        $view->user = Zend_Registry::get('user');
        
        // user theme
        $themeId = (isset($view->user->theme)) ? $view->user->theme : 't0';
        $themeFile = PUBLIC_PATH . "/theme/" . $themeId . "/style.css";
        $theme = '';
        if ( file_exists($themeFile) ) {
            $css = file_get_contents($themeFile);
            if (false !== $css) {
                $theme = '<style id="theme-css" type="text/css">' . $css . '</style>';
            }
        }
        $view->themeStyle = $theme;
        
        return $view;
    }
    
    protected function no_initZFDebug() {
        if ('development' !== APPLICATION_ENV) return;
        
        $autoloader = Zend_Loader_Autoloader::getInstance();
        $autoloader->registerNamespace('ZFDebug');

        $options = array(
        'plugins' => array('Variables', 
                           'File' => array('base_path' => '/path/to/project'),
                           'Memory', 
                           'Time', 
                           'Registry', 
                           'Exception')
        );

        # Instantiate the database adapter and setup the plugin.
        # Alternatively just add the plugin like above and rely on the autodiscovery feature.
        if ($this->hasPluginResource('db')) {
            $this->bootstrap('db');
            $db = $this->getPluginResource('db')->getDbAdapter();
            $options['plugins']['Database']['adapter'] = $db;
        }

        # Setup the cache plugin
        if ($this->hasPluginResource('cachemanager')) {
            $manager = $this->getPluginResource('cachemanager')
                            ->getCacheManager();
            $cache = $manager->getCache('database');

            $options['plugins']['Cache']['backend'] = $cache->getBackend();
            
             # set up database meta data cache
            Zend_Db_Table_Abstract::setDefaultMetadataCache( $cache );
        }

        $debug = new ZFDebug_Controller_Plugin_Debug($options);

        $this->bootstrap('frontController');
        $frontController = $this->getResource('frontController');
        $frontController->registerPlugin($debug);
    }
}