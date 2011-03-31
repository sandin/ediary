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
    }
    
    public function indexAction()
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
    
    /**
     * Enter description here ...
     * FIXME: filter input
     */
    public function saveAction()
    {
        $result = false;
        $filterRules = array();
        $validatorRules = array();
        $input = new Zend_Filter_Input($filterRules, $validatorRules, $_REQUEST);
        
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
        $form = new Zend_Form();
         
     	$username = new Zend_Form_Element_Text('username');
     	$username->setRequired(true)
     	         ->addValidator(Ediary_User::getUserNameValidate())
     			 //->addValidator(new Zend_Validate_Alnum(), false, array("messages" => '只能输入数字和字符'))
     			 ->addFilter('StringTrim');
     			 
        $form->addElement($username);
        return $form;
    }

}

