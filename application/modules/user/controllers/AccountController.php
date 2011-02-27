<?php

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
        // action body
    }

    public function logoutAction()
    {
        // action body
    }

    public function registerAction()
    {
        // already logined
		if (false) $this->_redirect('/');
		
		$form = $this->getFormRegister();
		
	    // Not a Post or Post data invalid, redisplay form
		if ( !$this->getRequest()->isPost() || !$form->isValid($_POST) ) {
       	    foreach ($form->getErrorMessages() as $e) {
       	        $this->view->error .= $e . '<br />';
       	    }
            return $this->view->form = $form;
		}
		
	    // OK, register this user
	    
	    $form->saveToken(); // in case reSubmit
	    
	    // Create the user into database
	    $user = new Ediary_User();
	    $userId = $user->create($_POST['email'], $_POST['password']);
	    
	    // login for this user
	    if ($userId > 0) {
	        //$user->login($_POST['email'], $_POST['password']);
	    }
    }
    
  private function getFormRegister() {
    	$form = new Ediary_Form(array('name' => 'form_register'));
        $form->setAction('/register')
     		 ->setMethod('post');
     		 
    	$validator = new Zend_Validate_Alnum();
     		 
     	$username = new Zend_Form_Element_Text('email');
     	$username->setLabel(_t("邮箱"))
     			 ->setRequired(true)
     			 ->addValidator(new Zend_Validate_EmailAddress());
     	
     	$password = new Zend_Form_Element_Password('password');
     	$password->setLabel(_t("密码"))
     			 ->setRequired(true)
	     		 ->addValidator($validator);
	     		 
	    $rePassword = new Zend_Form_Element_Password('rePassword');
     	$rePassword->setLabel(_t("确认密码"))
     			   ->setRequired(true)
	     		   ->addValidator($validator);
        
     	$form->addElements(array($username, $password, $rePassword));
     	$form->addElement('submit', 'op', array('label' => _t('提交')));
     	
     	return $form;
    }


}







