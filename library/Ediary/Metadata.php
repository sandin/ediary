<?php
/**
 * Metadata
 * 
 * @author lds
 */
class Ediary_Metadata 
{
    private $_table;
    private $_objectId;
    private $_objectField;
    
    /**
     * @param String $tableName table name without prefix
     * @param String $objectField field name of object id, like "user_id" 
     * @param String $objectId object id
     */
    public function __construct($tableName, $objectField, $objectId) {
        $this->_table = self::getDb()->prefix($tableName);
        $this->_objectField = $objectField;
        $this->_objectId = $objectId;
    }
    
    /**
     * Insert a metadata
     * 
     * @param String $key
     * @param String $value
     * @return The number of affected rows.
     */
    public function insert($key, $value) {
        return self::getDb()->insert($this->_table, $this->_createValues($key, $value));
    }
    
    /**
     * Get a metadata value
     * 
     * @param String $key
     * @return String value, false when it's not exists
     */
    public function find($key) {
        return $this->_selectOrCount($key, false);
    }
    
    public function isExists($key) {
        return $this->_selectOrCount($key, true);
    }
    
    private function _selectOrCount($key, $justCount = false) {
        $db = self::getDb();
        $select = $db->select();
        $select->where('meta_key = ?', $key)
               ->where($this->_objectField . ' = ?', $this->_objectId)
               ->limit(1);
        if ($justCount) {
            $select->from($this->_table, 'COUNT(*)');
            $result = $db->fetchOne($select->__toString());
            return ($result > 0) ? true : false;
        } else {
            $select->from($this->_table, 'meta_value');
            return $db->fetchOne($select->__toString());
        }
    }
    
    /**
     * Get all metadata 
     * 
     * @param String $tableName table name without prefix
     * @param String $objectField field name of object id, like "user_id" 
     * @param String $objectId object id
     * @return Array , like array( array('key' => 'value'), array('key' => 'value') )
     */
    public static function getAll($tableName, $objectField, $objectId) {
        $db = self::getDb();
        $table = $db->prefix($tableName);
        
        $select = $db->select();
        $select->from($table, array('meta_key','meta_value'))
               ->where($objectField . ' = ?', $objectId);
        return $db->fetchPairs($select->__toString());
    }
    
    /**
     * Alias of self::getAll()
     * 
     * @return Array , like array( array('key' => 'value'), array('key' => 'value') )
     */
    public function get() {
        return self::getAll($this->_table, $this->_objectField, $this->_objectId);
    }
    
    /**
     * set a metadata value, it will create a new one if the key is not exists
     * 
     * @param unknown_type $key
     * @param unknown_type $value
     * @return The number of affected rows. 
     */
    public function set($key, $value) {
        if ($this->isExists($key)) {
            return $this->update($key, $value);
        } else {
            return $this->insert($key, $value);
        }
    }
    
    /**
     * Update a metadata value
     * 
     * @param String $key
     * @param String $value
     * @return The number of affected rows.
     */
    public function update($key, $value) {
        $db = self::getDb();
        $where = array();
        $where[] = $db->quoteInto("meta_key = ?", $key);
        $where[] = $db->quoteInto($this->_objectField . ' = ?', $this->_objectId);
        return $db->update($this->_table, $this->_createValues($key, $value),$where);
    }
    
    /**
     * Delete a metadata
     * 
     * @param String $key if no key, then delete all metadata of this user
     * @return The number of affected rows.
     */
    public function delete($key = null) {
        $db = self::getDb();
             
        $where[] = $db->quoteInto($this->_objectField . " = ?", $this->_objectId);
        if (isset($key)) {
            $where[] = $db->quoteInto("meta_key = ?", $key);
        }
        return $db->delete($this->_table, $where);
    }
    
    /**
     * Alias of $this->delete(null);
     * 
     * @return The number of affected rows
     */
    public static function deleteAll() {
        return $this->delete();
    }
    
    /**
     * For Zend_Db insert and update 
     */
    private function _createValues($key, $value) {
        return  array(
            $this->_objectField => $this->_objectId,
            'meta_key' => $key,
            'meta_value' => $value);
    }
    
    /**
     * @return Ediary_Db
     */
    public static function getDb() {
        return Ediary_Db::getInstance();
    }
    
}
