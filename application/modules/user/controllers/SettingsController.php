<?php

class User_SettingsController extends Zend_Controller_Action
{
    private $_user;

    public function init()
    {
        /* Initialize action controller here */
        $this->_user = Zend_Registry::get('user');
        if (!isset($this->_user)) {
            $this->_redirect('/');
        }
        
        $cUrl = $this->view->baseUrl('/user/settings');
        $this->view->tabs = array(
            array(
                'title' => '个人设置',
                'url' => $cUrl . '/'
            ),
            array(
                'title' => '选择主题',
                'url' => $cUrl . '/theme'
            ),
        );
    }
    
    public function indexAction()
    {
        $this->view->tabs[0]['current'] = true;
        $user = Ediary_User::find($this->_user->id);
        if (! isset($user) ) {
            die(_t("无权访问该页面")); // invalid user
        }
        
        $form = $this->getSettingsForm($user);
        if (! $this->getRequest()->isPost() ) {
            // do nothing, just display the form
        } else if (! $form->isValid($_POST) ) {
            $this->view->messages = $form->getMessages();
        } else {
            $form->saveToken();
            
            // set username if exists
            $newUsername = $form->getElement("username")->getValue();
            if (! empty($newUsername) && $newUsername !== $user->username) {
                $user->username = $newUsername;
            }
           
            // set password if exists
            $oldPassword = $form->getElement('oldPassword')->getValue();
            $password = $form->getElement('password')->getValue();
            if (! empty($oldPassword) && ! empty($password) ) {
                if ( Ediary_User::auth($user->email, $oldPassword) ) {
                    $user->setPassword($password);
                } else {
                    $form->getElement('oldPassword')->addError(_t("旧密码不正确"));
                    $form->addError(_t("旧密码不正确"));
                }
            }
            
            // update all
            $result = $user->update();
            if (! $result) {
                $form->addError(_t("更新失败"));
            }
            
            // display messages
            $errors = $form->getErrorMessages();
            $this->view->messages = (count($errors) == 0) ? array(_t("保存成功.")) : $errors;
        }
        
        return $this->view->form = $form;
    }
    
    public function themeAction() {
        $this->view->tabs[1]['current'] = true;
    }
    
    public function themeajaxAction() {
        $this->_helper->layout->disableLayout();
    }
    
    /**
     * Update theme
     * FIXME: filter input
     */
    public function saveAction()
    {
        $result = false;
        
        $input = new Zend_Filter_Input(array(), array(), $_GET);
        $user = Ediary_User::find($this->_user->id);
        if ($user == null) {
            return;
        }
        
        if ($input->isValid()) {
            $user->theme = $input->theme;
            $result = $user->update();
            if ($result) { // 更换主题后需要刷新储存在session里的缓存值
                $this->_user->theme = $input->theme;
                Zend_Registry::set('user', $this->_user); 
            }
           
        }
        $this->_helper->json( array('result' => $result) );
    }
    
             /* update metadata 
            $user_metadata = new Ediary_Metadata_User(3);
            $result = array();
            foreach ($input->getEscaped() as $key => $value) {
                $result[] = $user_metadata->set($key, $value);
            }
            $this->_helper->json( array('result' => !in_array(0, $result)) );
            */

    /**
     * @return Ediary_Form
     */
    private function getSettingsForm($user) {
        $form = new Ediary_Form();
        $form->setAttrib('class', "labelForm sForm")
             ->setAttrib('id', 'form_settings')
             ->setAction('/user/settings')
             ->setMethod('post');
         
     	$username = $form->createElement('text', 'username');
     	$username->setRequired(true)
     	         ->setLabel(_t("用户名"))
     	         ->setAttrib('class', 'text')
     	         ->addValidator(Ediary_User::getUserNameValidate())
     			 ->addFilter('StringTrim')
     			 ->setValue($user->username);
     
     	$oldPassword = $form->createElement('password', 'oldPassword');
     	$oldPassword->setLabel(_t("当前密码"))
     	         ->setAttrib('class', 'text')
     	         ->setAttrib('autocomplete', 'off');
     	         
        $password = $form->createElement('password', 'password');
     	$password->setLabel(_t("新密码"))
     	         ->setAttrib('class', 'text disabled')
     	         ->setAttrib('disabled', 'disabled')
     	         ->setAttrib('readonly', 'readonly')
     	         ->addValidator(Ediary_User::getPasswordValidate());
     	         
     	$rePassword = $form->createElement('password', 'rePassword');
     	$rePassword->setLabel(_t("确认密码"))
     	         ->setAttrib('class', 'text disabled')
     	         ->setAttrib('disabled', 'disabled')
     	         ->setAttrib('readonly', 'readonly'); // 只在前端验证两次输入的密码是否相同
     			 
        $form->addElements2(array($username, $oldPassword, $password, $rePassword));
      	$form->addElement('submit', 'op', array('label' => _t('保存'), 'class' => 'nolabel button'));
      	
        return $form;
    }
    

}

