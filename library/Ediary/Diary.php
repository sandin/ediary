<?php
class Ediary_Diary extends Ediary_QueryRecord
{
    const ID = 'diary_id';
    const TITLE = 'diary_title';
    
    public static function default_fields() {
        return array(
        	self::ID => '-1',
            self::TITLE => ''
        );
    }
    
    public function __construct($paramsArray = array()) {
        
        $this->fields = array_merge(
            $this->fields,
            self::default_fields(),
            $paramsArray
        );
        parent::__construct($paramsArray);
    }
    
    public function insert() {
        $allow = array_keys(self::default_fields());
        
        var_dump($allow);
    }
    
}