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
        $db = self::getDb();
        $select = $db->select();
        $select->from($this->_table, 'meta_value')
               ->where('meta_key = ?', $key)
               ->where($this->_objectField . ' = ?', $this->_objectId)
               ->limit(1);
        $result = $db->fetchOne($select->__toString());
        return $result;
    }
    
    /**
     * Get all metadata 
     * @param String $tableName table name without prefix
     * @param String $objectField field name of object id, like "user_id" 
     * @param String $objectId object id
     * @return Array like array( array('key' => 'value'), array('key' => 'value') )
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
     * Update a metadata value
     * 
     * @param String $key
     * @param String $value
     * @return The number of affected rows.
     */
    public function update($key, $value) {
        return self::getDb()->update($this->_table, $this->_createValues($key, $value));
    }
    
    /**
     * Delete a metadata
     * 
     * @param String $key
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
    
    public static function deleteAll() {
        return $this->delete();
    }
    
    private function _createValues($key, $value) {
        return  array(
            $this->_objectField => $this->_objectId,
            'meta_key' => $key,
            'meta_value' => $value);
    }
    
    /**
     * @return Ediary_Database_Db
     */
    public static function getDb() {
        return Ediary_Database_Db::getInstance();
    }
    
}
