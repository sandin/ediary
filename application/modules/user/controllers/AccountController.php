<?php

/**
 * @author lds
 *
 */
class User_AccountController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }

    public function loginAction()
    {
        //TODO: already logined
		if (false) $this->_redirect('/');
		
		$form = $this->getLoginForm();
		
	    // Not a Post or Post data invalid, redisplay the form
		if ( !$this->getRequest()->isPost() || !$form->isValid($_POST) ) {
       	    foreach ($form->getErrorMessages() as $e) {
       	        $this->view->error .= $e . '<br />';
       	    }
            return $this->view->form = $form;
		}
		
		$auth_result = Ediary_User::login($_POST['email'], $_POST['password']);
		
		if (! $auth_result->result ) {
		    // Auth fail, email/password wrong
		    $this->view->error = _t("用户名或密码错误.");
		    return $this->view->form = $form;
		}
		
	    // OK, register this user
	    
		$this->view->form = _t("登录成功");
	    $form->saveToken(); // in case reSubmit
	    
	    // redirect to front page
        $this->_redirect(Ediary_Core::redirect('登录成功', '首页', "/"));
    }

    public function logoutAction()
    {
        // action body
        $this->_helper->viewRenderer->setNoRender();
        Zend_Auth::getInstance()->clearIdentity();
		$this->_redirect('/');
    }

    public function registerAction()
    {
        //TODO: already logined
		if (false) $this->_redirect('/');
		
		$form = $this->getRegisterForm();
		
	    // Not a Post or Post data invalid, redisplay form
		if ( !$this->getRequest()->isPost() || !$form->isValid($_POST) ) {
       	    foreach ($form->getErrorMessages() as $e) {
       	        $this->view->error .= $e . '<br />';
       	    }
            return $this->view->form = $form;
		}
		
	    // OK, register this user
	    
		$this->view->form = _t("注册成功");
	    $form->saveToken(); // in case reSubmit
	    
	    // Create the user into database
	    $user = new Ediary_User();
	    $userId = $user->create($_POST['email'], $_POST['password']);
	    
	    // login for this user
	    if ($userId > 0) {
	        //$user->login($_POST['email'], $_POST['password']);
	    }
	    
    }

    /**
     * @return Ediary_Form
     */
    private function getRegisterForm()
    {
    	$form = new Ediary_Form(array(
    					'name' => 'form_register',
    	                'class' => "labelForm sForm"));
    	
        $form->setAction('/register')
     		 ->setMethod('post');
     		 
    	$validator = new Zend_Validate_Alnum();
    	$textElement = new Ediary_Form_Decorator_Text();
     		 
     	$username = new Zend_Form_Element_Text('email');
     	$username->setLabel(_t("邮箱"))
     			 ->setRequired(true)
     			 ->addValidator(new Zend_Validate_EmailAddress())
     	         ->setAttrib('class', 'text')
     			 ->setDecorators(array($textElement));
     	
     	$password = new Zend_Form_Element_Password('password');
     	$password->setLabel(_t("密码"))
     			 ->setRequired(true)
	     		 ->addValidator($validator)
     	         ->setAttrib('class', 'text')
     			 ->setDecorators(array($textElement));
	     		 
	    $rePassword = new Zend_Form_Element_Password('rePassword');
     	$rePassword->setLabel(_t("确认密码"))
     			   ->setRequired(true)
	     		   ->addValidator($validator)
     	         ->setAttrib('class', 'text')
     			   ->setDecorators(array($textElement));
        
     	$form->addElements(array($username, $password, $rePassword));
     	$form->addElement('submit', 'op', array(
     							'label' => _t('立即注册'),
     	                        'class' => 'nolabel button'));
     	
     	return $form;
    }

    /**
     * @return Ediary_Form
     */
    private function getLoginForm()
    {
    	$form = new Ediary_Form(array(
    					'name' => 'form_login',
    	                'class' => "labelForm sForm"));
    	
        $form->setAction('/login')
     		 ->setMethod('post');
     		 
    	$validator = new Zend_Validate_Alnum();
    	$textElement = new Ediary_Form_Decorator_Text();
     		 
     	$username = new Zend_Form_Element_Text('email');
     	$username->setLabel(_t("邮箱"))
     			 ->setRequired(true)
     			 ->addValidator(new Zend_Validate_EmailAddress())
     	         ->setAttrib('class', 'text')
     			 ->setDecorators(array($textElement));
     	
     	$password = new Zend_Form_Element_Password('password');
     	$password->setLabel(_t("密码"))
     			 ->setRequired(true)
	     		 ->addValidator($validator)
     	         ->setAttrib('class', 'text')
     			 ->setDecorators(array($textElement));
	     		 
     	$form->addElements(array($username, $password));
     	$form->addElement('submit', 'op', array('label' => _t('登录'), 'class' => 'nolabel button'));
     	
     	$form->getErrorMessages();
     	return $form;
    }
    
    /**
     * @return Ediary_Form
     */
    private function getSettingsForm() {
        $form = new Zend_Form();
         
     	$username = new Zend_Form_Element_Text('username');
     	$username->setRequired(true)
     	         ->addValidator(Ediary_User::getUserNameValidate())
     			 //->addValidator(new Zend_Validate_Alnum(), false, array("messages" => '只能输入数字和字符'))
     			 ->addFilter('StringTrim');
     			 
        $form->addElement($username);
        return $form;
    }

    public function settingsAction()
    {
        // action body
        $form = $this->view->form = $this->getSettingsForm();
        
        if ( !$this->getRequest()->isPost() || !$form->isValid($_POST) ) {
            var_dump($form->getMessages());
            return $form;
        } else {
            var_dump('Your name : ' . $form->getElement("username")->getValue());
            var_dump("OK");
        }
    }


}








