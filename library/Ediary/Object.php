<?php
class Ediary_Object
{
    
    protected $_fields = array();
    protected $_newField = array();
    
    public function __construct($paramsArray = array()) {
        $this->_fields = array_merge(
            $this->_fields,
            $paramsArray
        );
        
    }

    public function __get($key) {
        if ( isset($this->_fields[$key]) ) {
            return $this->_fields[$key];
        }
    }
    
    public function __set($key, $value) {
            var_dump($key);
            var_dump($this->_fields);
        if ( isset($this->_fields[$key]) ) {
            $this->_fields[$key] = $value;
            $this->_newField[$key] = $value;
        } else {
        }
        return $this;
    }
}

class Ediary_Diary extends Ediary_object
{
    const ID = 'diary_id';
    const NAME = 'diary_name';
    
    static function default_fields() {
        return array(
            self::ID => '-1',
            self::NAME => ''
        );
    }
    
    function __construct($paramsArray = array()) {
        $this->_fields = array( 
            $this->_fields,
            self::default_fields(),
            $paramsArray
        );
    }
    
    function insert() {
        $allowKeys = array_keys(self::default_fields());
        var_dump($this->_newField);
        
        var_dump($allowKeys);
    }
}

$obj = new Ediary_Diary();
$obj->diary_name = 'new name';
$obj->insert();
















