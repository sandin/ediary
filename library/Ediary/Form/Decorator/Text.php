<?php

class Ediary_Form_Decorator_Text extends Zend_Form_Decorator_Abstract
{
    const WRAP = 'WRAP';
    
    private $templete_error = '<div class="error">%s</div>';
    private $templete_description = '<div class="description">%s</div>';
    private $templete_element = '<div class="form_element">%s</div>';
    
    public function setElementTemp($templete) {
        if (strpos($templete, '%s') !== false) {
            $this->templete_element = $templete;
        }
    }
    
    public function buildInput()
    {
        $element = $this->getElement();
        $helper  = $element->helper;
        return $element->getView()->$helper(
            $element->getName(),
            $element->getValue(),
            $element->getAttribs(),
            $element->options
        );
    }

    public function buildErrors()
    {
        $element  = $this->getElement();
        $messages = $element->getMessages();
        if (empty($messages)) {
            return '';
        }
        return sprintf($this->templete_error, 
                       $element->getView()->formErrors($messages));
    }

    public function buildDescription()
    {
        $element = $this->getElement();
        $desc    = $element->getDescription();
        if (empty($desc)) {
            return '';
        }
        return sprintf($this->templete_description, $desc); 
    }

    public function render($content)
    {
        $element = $this->getElement();
        if (!$element instanceof Zend_Form_Element) {
            return $content;
        }
        if (null === $element->getView()) {
            return $content;
        }
        
        //var_dump($content);

        $separator = $this->getSeparator();
        $placement = $this->getPlacement();
        $input     = $this->buildInput();
        $errors    = $this->buildErrors();
        $desc      = $this->buildDescription();

        $output = sprintf($this->templete_element, $input . $errors . $desc);

        switch ($placement) {
              
            case (self::PREPEND):
                return $output . $separator . $content;
            case (self::APPEND):
                //return $content . $separator . $output;
            case (self::WRAP): 
            default:
                $output = sprintf($this->templete_element, 
                    $content . $separator. $input . $errors . $desc);
                return $output;
                
        }
    }
}
