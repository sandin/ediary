<?php
class Ediary_Form extends Zend_Form
{
    /**
   	 * N秒内不得重复提交同一表单
     * @var int
     */
    const EXPIRATION_SECONDS = 10;
    
    public function init()
    {
        $this->addElementPrefixPath('Ediary_Form_Decorator',
                            		'Ediary/Form/Decorator/',
                            		'decorator');
        
        $d = new Ediary_Form_Decorator_Text();
        $d->setElementTemp('<div style="display:none">%s</div>');
        
        
        // Add Token element into the form
        $token = new Zend_Form_Element_Hidden('token');
        $token->setValue(md5($this->getName()))
              ->setDecorators(array($d));
        $this->addElement($token, false);
    }
    
    /**
     * Save Form Token into the session
     */
    public function saveToken() {
        $session = new Zend_Session_Namespace('form-token');
     	$session->setExpirationSeconds(self::EXPIRATION_SECONDS);
     	if (null != $this->getName()) {
     	    $session->{$this->getName()} = md5($this->getName());
     	}
    }
    
    /**
     * Add reSubmitted preCheck
     * 
     * @see Zend_Form::isValid()
     */
    public function isValid($data) {
      	// ReSubmitted Check
        $session = new Zend_Session_Namespace('form-token');
    	if (null != $this->getName() && isset($session->{$this->getName()}) &&
        	$session->{$this->getName()} == $data['token'] ) {
        	    $this->setErrorMessages(array(_t("请勿重复提交表单")));
        		return false;
        }
        
        return parent::isValid($data);
    }
    
    protected function getToken() {
        
    }
    
    /**
     * Enter description here ...
     * @param Zend_Form_Element $element
     * @return Ambiguous
     */
    public function setDefaultOptions($element) {
        $elementDecorator = array('Label2', 'Text');
        
        $element->addFilter('StringTrim')
     	        ->setDecorators($elementDecorator);
     	return $element;
    }
    
    public function addElements2($elements, $useDefaultOptions = true) {
        if ($useDefaultOptions) {
            foreach ($elements as &$elem) {
                $this->setDefaultOptions($elem);
            }
        }
        return parent::addElements($elements);
    }
    
    public function addButtons($elements) {
        foreach ($elements as $i => &$elem) {
            $elem->setAttrib('class', 'nolabel button');
            if ($i === 0) {
                $elem->setDecorators(array(
                     array('HtmlTag', array('tag' => 'label')),
                     'Text',
                ));
            } else {
                // TODO: 处理多按钮情况
                //$elem->setDecorators(array('Text'));
            }
        }
        return parent::addElements($elements);
    }
    
}
