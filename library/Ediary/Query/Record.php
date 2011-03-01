<?php
class Ediary_Query_Record
{
    /**
     * Holds field values
     *
     * @var Array
     */
    protected $fields = array();
    
    /**
     * Holds modified field values
     *
     * @var Array
     */
    protected $newFields = array();
    
    /**
     * Construct
     * 
     * @param Array $params initial field values
     */
    public function __construct($params = array()) {
        $this->fields = array_merge(
            $this->fields,
            $params
        );
    }
    
    /**
     * Insert a row into database
     * 
     * @param  String $table table name
     * @return boolean True on success, false if not
     */
    public function insertRow($table) {
        $merge = array_merge($this->fields, $this->newFields);
        return ( self::getDb()->insert($table, $merge) > 0 ) ? true : false;
    }
    
    /**
     * Delete a row into database
     * 
     * @param  String $table table name
     * @param  String $where like 'id = 1'
     * @return boolean True on success, false if not
     */
    public function deleteRow($table, $where) {
        return ( self::getDb()->delete($table, $where) > 0 ) ? true : false;
    }

	/**
	 * function __get
	 * Handles getting virtual properties for this class
	 * 
	 * @param  string Name of the property
	 * @return mixed The set value or NULL if none exists
	 **/
	public function __get($name)
	{
		if ( isset( $this->newFields[$name] ) ) {
			return $this->newFields[$name];
		}
		else if ( isset( $this->fields[$name] ) ) {
			return $this->fields[$name];
		}
		else {
			return NULL;
		}
	}
	
	/**
	 * function __set
	 * Handles setting virtual properties for this class
	 * 
	 * @param  string Name of the property
	 * @param  mixed Value to set it to
	 * @return mixed The set value
	 **/
	public function __set($name, $value)
	{
		if( isset($this->fields[$name]) ) {
			$this->newFields[$name] = $value;
		} else {
			$this->fields[$name] = $value;
		}
		return $value;
	}

	/**
	* Magic isset , returns whether a property value is set.
	* 
	* @param string $name The name of the parameter
	* @return boolean True if the value is set, false if not
	*/
	public function __isset($name)
	{
		return ( isset( $this->newFields[$name] ) || isset( $this->fields[$name] ) );
	}
	
	/**
	 * Unset a field
	 * @param String $name field name
	 */
	public function exclude($name) {
	    if( isset($this->fields[$name]) ) {
	        unset($this->fields[$name]);
		}
	    if( isset($this->newFields[$name]) ) {
	        unset($this->newFields[$name]);
		}
	}
	
	/**
	 * shortcut of Db::getInstance()
	 * 
	 * @return Ediary_Database_Db
	 */
	public static function getDb() {
	    return Ediary_Database_Db::getInstance();
	}
}

?>
