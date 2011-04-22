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
        // already logined
		if (null != Ediary_Auth::getUser()) {
	        return $this->_autoRedirect('diary');
		}
		
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
		
        // Auth fail, email/password wrong
		if (! $auth_result->result ) {
		    $this->view->error = _t("用户名或密码错误.");
		    return $this->view->form = $form;
		}
		
		// Auth Ok.
		$this->view->form = _t("登录成功");
	    $form->saveToken(); // in case reSubmit
	                
	    $this->_autoRedirect('diary');
    }
    
    /**
     * 若请求中提供redirect参数, 则重定向到该参数指定的url
     * 否则转入defaultUrl
     * 
     * @param String $defaultUrl default redirect url 
     */
    private function _autoRedirect($defaultUrl) {
	    if (null != $this->_getParam('redirect')) {
            $this->_redirect(urldecode($this->_getParam('redirect')));
	    } else {
            $this->_redirect($defaultUrl);
	    }       
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
	    $user = Ediary_User::create(array(
            'email' => $form->getValue('email'),
            'password' => $form->getValue('password')
	    ));
	    if ($user->id > 0) {
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
     		 
    	$passValidator = Ediary_User::getPasswordValidate();
     		 
     	$email = new Zend_Form_Element_Text('email');
     	$email->setLabel(_t("邮箱"))
     			 ->setRequired(true)
     			 ->addValidator(new Zend_Validate_EmailAddress(array('mx' => false)))
     	         ->setAttrib('class', 'text');
     	
     	$password = new Zend_Form_Element_Password('password');
     	$password->setLabel(_t("密码"))
     			 ->setRequired(true)
	     		 ->addValidator($passValidator)
     	         ->setAttrib('class', 'text');
	     		 
	    $rePassword = new Zend_Form_Element_Password('rePassword');
     	$rePassword->setLabel(_t("确认密码"))
     			   ->setRequired(true)
	     		   ->addValidator($passValidator)
     	           ->setAttrib('class', 'text');
     	           
        $submit = new Zend_Form_Element_Submit('op');
        $submit->setValue(_t("立即注册"));
        
     	$form->addElements2(array($email, $password, $rePassword))
     	     ->addButtons(array($submit));
     	
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
    	
    	var_dump($this->_getParam('redirect'));
    	$action = (null != $this->_getParam('redirect'))
    	        ? '/login?redirect=' . $this->_getParam('redirect')
    	        : '/login';
    	        
        $form->setAction($action)
     		 ->setMethod('post');
     		 
    	$validator = new Zend_Validate_Alnum();
     		 
     	$username = new Zend_Form_Element_Text('email');
     	$username->setLabel(_t("邮箱"))
     			 ->setRequired(true)
     			 ->addValidator(new Zend_Validate_EmailAddress(array('mx' => false)))
     	         ->setAttrib('class', 'text');
     	
     	$password = new Zend_Form_Element_Password('password');
     	$password->setLabel(_t("密码"))
     			 ->setRequired(true)
	     		 ->addValidator($validator)
     	         ->setAttrib('class', 'text');
     	         
     	$submit = new Zend_Form_Element_Submit('op');
        $submit->setValue(_t("登录"));
        
     	$form->addElements2(array($username, $password))
     	     ->addButtons(array($submit));
     	
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









