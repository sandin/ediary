<?php

/**
 * @deprecated use /public/install.php
 */
class Admin_InstallController extends Zend_Controller_Action
{
    public function init()
    {
        //Ediary_Auth::checkAccessPermission('admin');
        $this->_helper->layout->setLayout('admin');
        $this->view->headTitle(_t("安装程序"));
        $this->view->error = '';
     	
    	if (Ediary_Config::isInstalled() && !Ediary_Config::isInstalling()) {
			Ediary_Core::exitApp('The appliction has already benn installed.');
		}
        
        // Filter post data
        $this->filter = new Zend_Filter();
        $this->filter->addFilter(new Zend_Filter_StringTrim());
        			//->addFilter(new Zend_Filter_HtmlSpecialChars())
        
    }

    public function indexAction()
    {
        $this->view->error = $this->_getParam('error', '');
        $step = isset($_GET['step']) ? intval($_GET['step']) : 1;
        
        switch ($step) {
        	case 1:
        		$this->view->title = _t("设置数据库");
        		$this->view->form = $this->getFormDb();
        		break;
        	case 2:
        		$this->view->form = 123;
        		break;
        }
    }

    public function step1Action()
    {
    	// is not a post just show a form
     	if (!$this->getRequest()->isPost()) {
            return $this->_forward('index');
        }
        
        // action body
        $this->view->headTitle(_t("填写数据库信息"));
        
        // POST data
        $sUsername = (isset($_POST['username'])) ? trim($_POST['username']) : '';
       	$sPassword = (isset($_POST['password'])) ? trim($_POST['password']) : '';
       	$sHost 	   = (isset($_POST['host']))   ? trim($_POST['host']) : '';
       	$sDbname   = (isset($_POST['dbname'])) ? trim($_POST['dbname']) : '';
       	$sPrefix   = (isset($_POST['prefix'])) ? trim($_POST['prefix']) : '';
    	$formToken = (isset($_POST['token'])) ? trim($_POST['token']) : '';
     	
       	$form = $this->getFormDb();
        
   		// Fail, redisplay the form
     	if (!$form->isValid($_POST)) {
	     	return $this->view->form = $form;
     	} 
     	
     	// Do Not ReSubmit this Form
    	if ( isset($this->mSession->{$form->getName()}) &&
        	$this->mSession->{$form->getName()} == $formToken ) {
        		return $this->view->error = _t("请勿重复提交表单.");
        }
        
        // OK
     	
     	// Save The data into config file
     	Ediary_Config::updateConfig(APPLICATION_ENV, 'username' , $sUsername, 1);
     	Ediary_Config::updateConfig(APPLICATION_ENV, 'password' , $sPassword, 1);
     	Ediary_Config::updateConfig(APPLICATION_ENV, 'host' 	, $sHost, 1);
     	Ediary_Config::updateConfig(APPLICATION_ENV, 'dbname' 	, $sDbname, 1);
     	Ediary_Config::updateConfig(APPLICATION_ENV, 'prefix' 	, $sPrefix, 1);
     	
     	// reBootstrap 
     	$this->_redirect('/admin/install/step2');
    }
    
    public function step2Action()
    {
    	// Check username, password, host, dbname
        $db = Ediary_Db::getInstance(); 
        try {
        	$db->connect();
        } catch (Exception $db_e) {
            // wrong username/password/host/dbname
        	$msg = _t($db_e->getMessage());
            return $this->_forward('index', null, null, array('error' => $msg));
        }
        
        // Create tables
        try {
        	$db->create();
        } catch (Exception $e) {
        	return $this->view->error = $e->getMessage();
        }
        
        Ediary_Config::setInstalling(false);
        Ediary_Config::setInstalled(true);
        $this->view->ok = true;
     	//$this->_redirect('/');
    }
    
    private function getFormDb() {
    	$validator = new Zend_Validate_NotEmpty();
    	
    	$form = new Zend_Form(array('name' => 'form_install_db'));
        $form->setAction('/admin/install/step1')
     		 ->setMethod('post');
     		 
     	$username = new Zend_Form_Element_Text('username');
     	$username->setLabel(_t("数据库用户名"))
     			 ->setRequired(true)
     			 ->addValidator($validator);
     	
     	$password = new Zend_Form_Element_Text('password');
     	$password->setLabel(_t("数据库密码"))
     			 ->setRequired(true)
	     		 ->addValidator($validator);
        
     	$host = new Zend_Form_Element_Text('host');
     	$host->setLabel(_t("数据库主机"))
     		 ->setRequired(true);
     			 
     	$dbname = new Zend_Form_Element_Text('dbname');
     	$dbname->setLabel(_t("数据库名"))
     			 ->setRequired(true)
	     		 ->addValidator($validator);
     			 
     	$form->addElement($username);
     	$form->addElement($password);
     	$form->addElement($host);
     	$form->addElement($dbname);
     	$form->addElement('submit', 'op', array('label' => _t('提交')));
     	$form->addElement('hidden', 'token', array('value' => md5($form->getName()) ));
     	
     	return $form;
    }
}





