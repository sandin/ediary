<?php
/**
 * @author lds
 *
 */
class User_SettingsController extends Zend_Controller_Action
{
    private $_user; // user info from seesion(stdClass)
    private $_userEntity; // real user(Ediary_User)

    public function init()
    {
        /* Initialize action controller here */
        Ediary_Auth::authRedirect();
        $this->_user = Ediary_Auth::getUser();
        $this->_userEntity = Ediary_User::find($this->_user->id);
        if (! isset($this->_userEntity)) die(_t("没有这个用户")); 
        
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
            array(
                'title' => '定时提醒',
                'url' => $cUrl . '/notice'
            ),
            array(
                'title' => '发布工具',
                'url' => $cUrl . '/client'
            ),
            array(
                'title' => '导出导入',
                'url' => $cUrl . '/backup'
            ),
        );
    }
    
    /**
     * 用户资料
     * 
     * @return Ediary_Form
     */
    public function indexAction()
    {
        $this->view->tabs[0]['current'] = true;
        
        $form = $this->getSettingsForm($this->_userEntity);
        if (! $this->getRequest()->isPost() ) {
            // do nothing, just display the form
        } else if (! $form->isValid($_POST) ) {
            // post data invalid, reDisplay
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
    
    /**
     * 选择主题
     */
    public function themeAction() {
        $this->view->tabs[1]['current'] = true;
    }
    
    /**
     * 选择主题 AJAX版
     */
    public function themeajaxAction() {
        $this->_helper->layout->disableLayout();
    }
    
    /**
     * for theme action
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
    
    /**
     * 设置提醒
     * 
     * @return Ediary_Form
     */
    public function noticeAction() {
        $this->view->tabs[2]['current'] = true;
        
        $usermeta = new Ediary_Metadata_User($this->_user->id);
        $noticeMeAt = $usermeta->find(Ediary_Metadata_User::NOTICE);
        
        $form = $this->getNoticeForm($noticeMeAt);
        
        if (! $this->getRequest()->isPost() ) {
            // do nothing, just display the form
        } else if (! $form->isValid($_POST) ) {
            // post data invalid, reDisplay
            $this->view->messages = $form->getMessages();
        } else {
            $form->saveToken();
            
            // OK, update into DB
            $noticeMeAt = $form->getElement('hour')->getValue();
            if ($noticeMeAt != 99) {
                $r = $usermeta->set(Ediary_Metadata_User::NOTICE, $noticeMeAt);
            } else {
                $r = $usermeta->delete(Ediary_Metadata_User::NOTICE);
            }
            $this->view->messages = ($r > 0) ? array(_t('设置成功')) 
                                             : array(_t("设置失败"));
        }
            
        return $this->view->form = $form;
    }
    
    /**
     * 客户端发布
     */
    public function clientAction() {
        $this->view->tabs[3]['current'] = true;
    }
    
    /**
     * 导出导入
     */
    public function backupAction() {
        $this->view->tabs[4]['current'] = true;
    }
    
    /**
     * update metadata 
     * @deprecated 未使用
     */
    private function updateMetadata() {
        $user_metadata = new Ediary_Metadata_User(3);
        $result = array();
        foreach ($input->getEscaped() as $key => $value) {
            $result[] = $user_metadata->set($key, $value);
        }
        $this->_helper->json( array('result' => !in_array(0, $result)) );
    }

    /**
     * @param Ediary_User $user
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
    
 	/**
 	 * @param String $value 初始值, 99表示空值
     * @return Ediary_Form
     */
    private function getNoticeForm($value) {
        $value = (null != $value) ? $value : '99'; // default value
        
        $form = new Ediary_Form();
        $form->setAttrib('class', "labelForm sForm")
             ->setAttrib('id', 'form_settings')
             ->setAction('/user/settings/notice')
             ->setMethod('post');
         
        $range = array(6, 24); // min, max
        $options = array('99' => '不提醒');
        for ($i = $range[0], $l = $range[1]; $i <= $l; $i++) {
            $options[$i] = $i . '点'; 
        }
        
     	$hour = $form->createElement('select', 'hour');
     	$hour->setRequired(true)
     	         ->setLabel(_t("邮件提醒"))
     	         ->setAttrib('autocomplete', 'off')
     	         ->setOptions(array('multiOptions' => $options))
     	         ->setValue($value)
     	         ->setDescription("<small><i>每天这个点, 我们将发一封邮件提醒你该写日记了.</i></small>")
     	         ->addValidator('Int')
     			 ->addFilter('Int');
     			 
        $form->addElements2(array($hour));
      	$form->addElement('submit', 'op', array('label' => _t('保存'), 'class' => 'nolabel button'));
      	
        return $form;
    }
    

}

