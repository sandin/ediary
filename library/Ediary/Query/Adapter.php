<?php
class Ediary_Query_Adapter extends Ediary_Query_Record
{
    protected $defaultFields = array();
     
    public function __construct($params = array()) {
        $this->fields = array_merge(
            $this->fields,
            $this->defaultFields
        );
        parent::__construct($params);
    }

    /**
     * Insert current Diary into the database
     *
     * @return boolean True on Success, false if not
     */
    public function insertRow($table) {
        $this->exclude('id'); // exclude primary key

        // Insert into DB
        $result = parent::insertRow($table);

        // Reset fields
        $this->fields['id'] = self::getDb()->lastInsertId();
        parent::resetNewFields();

        return $result;
    }

    /**
     * Get a Object By id
     *
     * @param String $id
     * @return Ediary_Query_Object or null
     */
    public static function findRowById($table, $id) {
        return self::getDb()->fetchRow(
            'SELECT * FROM ' . $table. ' WHERE id=?', $id);
    }
    
    public static function findRowByField($table, $fieldName, $fieldValue) {
        $db = self::getDb();
        $select = $db->select()
                     ->from($table)
                     ->where($fieldName . ' = ?', $fieldValue)
                     ->limit(1,0);
        return $db->fetchRow($select);
    }
    
     /**
     * Row is exists or not
     *
     * @param String $email
     * @return boolean
     */
    public static function isExistsRow($table, $where, $bind = array()) {
        $db = self::getDb();
        
        $select = $db->select()
                     ->from($table, 'COUNT(*)')
                     ->where($where, $bind);
        $count = $db->fetchOne($select->__toString());
        return ($count > 0) ? true : false;
    }
    
 	/**
     * Update current diary
     * 
     * @return boolean success or not
     */
    public function updateRowById($table) {
        $where = self::getDb()->quoteInto('id = ?', $this->fields['id']);
        $result = parent::updateRow($table, $where);
        if ($result) {
            $this->resetNewFields();
        }
        return $result;
    }
    
    /**
     * Delete current diary
     * 
     * @return boolean success or not
     */
    public function deleteRowById($table) {
        if ( isset($this->fields['id']) ) {
            $db = self::getDb();
            $where = $db->quoteInto('id = ?', $this->fields['id']);
            return parent::deleteRow($table, $where);
        }
        return false;
    }
    
    public function toArray() {
        return array_merge($this->fields, $this->newFields);
    }
    
    public static function isAId($who) {
        return is_numeric($who);
    }

}