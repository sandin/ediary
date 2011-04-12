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
                'title' => '外观设置',
                'url' => $cUrl . '/theme'
            ),
        );
    }
    
    public function indexAction()
    {
        $this->view->tabs[0]['current'] = true;
        
        $form = $this->getSettingsForm();
        
        if (!$this->getRequest()->isPost() || !$form->isValid($_POST)) {
            return $this->view->form = $form;
        }
        
        /*
        // Load User
        $user = new Ediary_User();
        $user->loadById($this->_user->id);
        var_dump($user->mName);
        if (! isset($user) ) {
            return;
        }
        
        $form = $this->view->form = $this->getSettingsForm();
        if ( !$this->getRequest()->isPost() || !$form->isValid($_POST) ) {
            // 表单数据验证失败
            $this->view->messages = $form->getMessages();
        } else {
            // 更新用户资料
            $this->view->messages = array('修改成功.');
            $userData = array(
                'username' => $form->getElement("username")->getValue()
            );
            $result = $user->update($user->getId(), $userData);
            var_dump($result);
        }
        $this->view->username = $user->mName;
        */
    }
    
    public function themeAction() {
        $this->view->tabs[1]['current'] = true;
        
        $this->view->name = "LDS";
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
        $filterRules = array();
        $validatorRules = array();
        $input = new Zend_Filter_Input($filterRules, $validatorRules, $_GET);
        
        if ($input->isValid()) {
            $theme = $input->theme;
            //TODO: 处理post的各种情况
            $user = new Ediary_User();
            $userData = array();
            $userData['theme'] = $theme;
            $result = $user->update($this->_user->id, $userData);
            if ($result > 0) {
                // 更换主题后需要刷新储存在session里的缓存值
                $this->_user->theme = $theme;
                Zend_Registry::set('user', $this->_user); 
            }
            $result = ($result > 0) ? true : false;
            
            /* update metadata 
            $user_metadata = new Ediary_Metadata_User(3);
            $result = array();
            foreach ($input->getEscaped() as $key => $value) {
                $result[] = $user_metadata->set($key, $value);
            }
            $this->_helper->json( array('result' => !in_array(0, $result)) );
            */
        }
        $this->_helper->json( array('result' => $result) );
    }
    
   
    

    /**
     * @return Ediary_Form
     */
    private function getSettingsForm() {
        $form = new Ediary_Form();
        $form->setAttrib('class', "labelForm sForm");
         
     	$username = $form->createElement('text', 'username');
     	$username->setRequired(true)
     	         ->setLabel(_t("用户名"))
     	         ->setAttrib('class', 'text')
     	         ->addValidator(Ediary_User::getUserNameValidate())
     			 ->addFilter('StringTrim');
     
     	$password = $form->createElement('password', 'password');
     	$password->setLabel(_t("密码"))
     	         ->setAttrib('class', 'text')
     	         ->setAttrib('disabled', 'disabled')
     	         ->setAttrib('readonly', 'readonly')
     	         ->addValidator(Ediary_User::getPasswordValidate());
     	
     	$rePassword = $form->createElement('password', 'rePassword');
     	$rePassword->setLabel(_t("确认密码"))
     	         ->setAttrib('class', 'text')
     	         ->setAttrib('disabled', 'disabled')
     	         ->setAttrib('readonly', 'readonly'); // 只做前端验证
     	         
     			 
        $form->addElements2(array($username, $password, $rePassword));
             
        return $form;
    }
    

}

