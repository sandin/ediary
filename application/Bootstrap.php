<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
	
	protected function _initAutoload() {
		Zend_Loader_Autoloader::getInstance()->setFallbackAutoloader(true);
		
		// Load all modules by dirname under moduleDirectory
		$modulesDir = Ediary_Config::getConfig()->resources->frontController->moduleDirectory;
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
	
	protected function _initControllers() {
		$this->bootstrap('FrontController');
		$front = $this->frontController;
		
		// Plugin
		
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
	
	protected function _initView() {
		
	}

	protected function _initDatebase() {
		$resources = $this->getPluginResource('db');
		$conn = $resources->getDbAdapter();
		$db = new Ediary_Database_Db($conn);
	}

	protected function _initTranslate() {
		
		$i18n = array(
			array( 'adapter' => 'gettext', 
			 	   'locale'  => 'zh',
			 	   'content' => APPLICATION_PATH . '/../data/languages/zh.mo' ),
			array( 'adpater' => 'gettext', 
				   'locale'  => 'en',
				   'content' => APPLICATION_PATH . '/../data/languages/en.mo')
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
		Zend_Registry::set('translate', $translate);
	}

	
	protected function _initExceptionHandler() {
		Ediary_Exception::handleException();
	}

}

