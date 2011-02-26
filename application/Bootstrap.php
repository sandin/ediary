<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
	const INSTALLING = 'installing';
	
	protected function _initAutoload() {
		Zend_Loader_Autoloader::getInstance()->setFallbackAutoloader(true);
		
		// Load all modules under moduleDirectory
		$modulesDir = Ediary_Config::getModuleDirectory();
		$modules = Ediary_Utility_File::getSubDir($modulesDir);

		foreach ($modules as $module) {
			new Zend_Application_Module_Autoloader(array(
      			'namespace' => ucfirst($module),
      			'basePath'  => APPLICATION_PATH . '/modules/' . strtolower($module),
			));
		}
		
		// load funtions
		include 'Ediary/Utility/functions.php';
	}
	
	protected function _initEnvironment() {
		// 注意: 关闭魔法引号, 入库前一定注意数据安全性
		@set_magic_quotes_runtime( 0 );
		@ini_set('magic_quotes_runtime', 0);
		@ini_set( 'magic_quotes_sybase', 0 );
		
		if ( function_exists( 'date_default_timezone_set' ) )
			date_default_timezone_set( 'UTC' );
			
	}
	
	protected function _initInstallChecker() {
		$isInstalled =  Ediary_Config::isInstalled();
		
		if ( !$isInstalled ) {
			Ediary_Config::setInstalling(true);
			Ediary_Config::setInstalled(true);
			Ediary_Core::gotoUrl('/admin/install');
			//exit;
		}
	}
	
	protected function _initDatebase() {
		$resources = $this->getPluginResource('db');
		$conn = $resources->getDbAdapter();
		$db = Ediary_Database_Db::getInstance()->setConnection($conn); 
		$db->setPrefix(Ediary_Config::getPerfix());
	}
	
	protected function _initTranslate() {
		
		// Support Languages
		$i18n = array(
			array( 'adapter' => 'gettext', 
			 	   'locale'  => 'zh',
			 	   'content' => APPLICATION_PATH . '/data/languages/zh.mo' ),
			array( 'adpater' => 'gettext', 
				   'locale'  => 'en',
				   'content' => APPLICATION_PATH . '/data/languages/en.mo')
		);
		
		$translate = null;
		
		for ($i = 0, $l = count($i18n); $i < $l; $i++) {
			$lang = $i18n[$i];
			
			if (file_exists($lang['content'])) {
				if (0 == $i) {
					$translate = new Zend_Translate($lang);
				} else {
					$translate->addTranslation($lang);
				}
			} else {
				Ediary_Logger::log($lang['locale'] . ' translation file is missing : '. $lang['content']);
			}
		}
		
		$translate->setLocale('zh'); // unsafe, zh would be null
		Zend_Registry::set(Ediary_Application::TRANSLATE, $translate);
		
		Zend_Validate_Abstract::setDefaultTranslator($translate);
	}
	
	protected function _initSession() {
	}
	
	protected function _initControllers() {
		$this->bootstrap('FrontController');
		$front = $this->frontController;
		
		// Plugins
		
		$error_plugin = new Zend_Controller_Plugin_ErrorHandler();
		$error_plugin->setErrorHandlerModule('default')
					 ->setErrorHandlerController('error')
					 ->setErrorHandlerAction('error');
			
		$front->throwExceptions(true); // 手工捕捉异常
			 // ->registerPlugin($error_plugin);
			//->registerPlugin(new Lds_Controller_Plugin_Smarty())
			//->registerPlugin(new Lds_Controller_Plugin_Modules())
			//->registerPlugin(new Lds_Controller_Plugin_Filter())
	}
	
	protected function _initRoute() {
		$front = $this->frontController;
		$router = $front->getRouter();
		
		// Error
		$router->addRoute('error',
			new Zend_Controller_Router_Route(
				'error/:message',
				array(
				    'module' => 'default',
				    'controller' => 'error',
				    'action' => 'error',
				)
			)
		);
	}
	
	protected function _initExceptionHandler() {
		Ediary_Exception::handleException();
	}
	
	protected function _initView() {
		Zend_Layout::startMvc();
		$view = new Zend_View();
		
		// SETUP THE HEAD TITLE
		$view->headTitle(_t("宜日记"));
		$view->headTitle()->setSeparator(' - ');
		
		return $view;
	}

	protected function _initZFDebug()
	{
		$autoloader = Zend_Loader_Autoloader::getInstance();
		$autoloader->registerNamespace('ZFDebug');

		$options = array(
        'plugins' => array('Variables', 
                           'File' => array('base_path' => '/path/to/project'),
                           'Memory', 
                           'Time', 
                           'Registry', 
                           'Exception',)
		);

		# Instantiate the database adapter and setup the plugin.
		# Alternatively just add the plugin like above and rely on the autodiscovery feature.
		if ($this->hasPluginResource('db')) {
			$this->bootstrap('db');
			$db = $this->getPluginResource('db')->getDbAdapter();
			$options['plugins']['Database']['adapter'] = $db;
		}

		# Setup the cache plugin
		if ($this->hasPluginResource('cache')) {
			$this->bootstrap('cache');
			$cache = $this-getPluginResource('cache')->getDbAdapter();
			$options['plugins']['Cache']['backend'] = $cache->getBackend();
		}

		$debug = new ZFDebug_Controller_Plugin_Debug($options);

		$this->bootstrap('frontController');
		$frontController = $this->getResource('frontController');
		$frontController->registerPlugin($debug);
	}

}

