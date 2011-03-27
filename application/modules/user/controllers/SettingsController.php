<?php

class User_SettingsController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
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

