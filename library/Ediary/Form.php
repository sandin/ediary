<?php
class Ediary_Form extends Zend_Form
{
    
    public function init()
    {
        $this->addElementPrefixPath('Ediary_Form_Decorator',
                            		'Ediary/Form/Decorator/',
                            		'decorator');
        
        // Add Token element into the form
        $token = new Zend_Form_Element_Hidden('token');
        $token->setValue(md5($this->getName()))
              ->removeDecorator('Label');
              
        $this->addElement($token);
        
    }
    
    /**
     * Save Form Token into the session
     */
    public function saveToken() {
        $session = new Zend_Session_Namespace('form-token');
     	$session->setExpirationSeconds(20); // 20秒内不得重复提交同一表单
     	$session->{$this->getName()} = md5($this->getName());
    }
    
    /**
     * Add reSubmitted preCheck
     * 
     * @see Zend_Form::isValid()
     */
    public function isValid($data) {
      	// ReSubmitted Check
        $session = new Zend_Session_Namespace('form-token');
    	if ( isset($session->{$this->getName()}) &&
        	$session->{$this->getName()} == $data['token'] ) {
        	    $this->setErrorMessages(array(_t("请勿重复提交表单")));
        		return false;
        }
        
        return parent::isValid($data);
    }
    
    protected function getToken() {
        
    }
}
