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
		
		// Post data is OK, Log in.
		$rememberMe = isset($_POST['rememberMe']) ? true : false;
		$auth_result = Ediary_User::login($_POST['email'], $_POST['password'], $rememberMe);
		
		if (! $auth_result->result ) {
		    // Auth fail, email/password wrong
		    $this->view->error = _t("用户名或密码错误.");
		    return $this->view->form = $form;
		}
		
	    // OK, register this user
	    
		$this->view->form = _t("登录成功");
	    $form->saveToken(); // in case reSubmit
	    
	    // redirect to front page
        $this->_redirect('/diary');
    }

    public function logoutAction()
    {
        // action body
        $this->_helper->viewRenderer->setNoRender();
        Ediary_User::logout();
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
	    
        // Create the user into database
	    $user = new Ediary_User();
	    $userId = $user->create($_POST['email'], $_POST['password'], '');
	    
	    if ($userId > 0) {
		    $this->view->form = _t("注册成功");
	        $form->saveToken(); // in case reSubmit
	    
    	    // login for this user
	        Ediary_User::login($_POST['email'], $_POST['password']);
	        $this->_redirect('/diary');
	    } else {
	        // register fail, reDisplay the form
	        $this->view->error = _t("注册失败.");
	        $this->view->form = $form;
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
     			 ->addValidator(new Zend_Validate_EmailAddress(array('mx' => false)))
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
     			 ->addValidator(new Zend_Validate_EmailAddress(array('mx' => false)))
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
     * The User is exists or not
     * 
     * Request: post 'email'
     * Response: json 'true|false'
     * 
     */
    public function existsAction() {
        $this->_helper->viewRenderer->setNoRender();
        $this->_helper->layout->disableLayout();
        
        $email = $this->_getParam('email');
        $result = false;
        
        if (null !== $email && !Ediary_User::isExists($email)) {
            $result = true;
        }
        
        $this->_helper->json( $result );
    }
}









