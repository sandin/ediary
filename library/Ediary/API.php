<?php
class Ediary_API 
{
    private $_request;
    
    public function __construct($request) {
        $this->_request = $request;
        
    }
    
    public function diary_get() {
        $id = $this->_request->getParam('id');
        
    }
}