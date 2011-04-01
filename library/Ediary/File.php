<?php
class Ediary_File extends Ediary_Query_Record
{
    const STATUS_PUBLIC = 1;
    
    /**
     * Default fields
     *
     * @var Array
     */
    private static $defaultFields = array(
    	/* id */
        'user_id' => '',
        'filename' => '',
        'filepath' => '',
        'filemime' => '',
        'filesize' => '',
        'timestamp' => '',
        'status' => self::STATUS_PUBLIC );

    /**
     * Construct
     *
     * @param Array $params initial field values
     */
    public function __construct($params = array()) {
        $this->fields = array_merge(
        $this->fields,
        self::$defaultFields
        );
        parent::__construct($params);
    }

    /**
     * Create a file
     *
     * @param Array $params file data
     * @return Ediary_File
     */
    public static function create($params = array()) {
        $file = new Ediary_File($params);
        $file->insert();
        return $file;
    }

    /**
     * Insert current file into the database
     *
     * @return boolean True on Success, false if not
     */
    public function insert() {
        $this->exclude('id'); // exclude primary key

        // default values
        $this->fields['timestamp'] = time();

        // Insert into DB
        $result = parent::insertRow(self::getDb()->files);

        // Reset fields
        $this->fields['id'] = self::getDb()->lastInsertId();
        $this->resetNewFields();

        return $result;
    }

    /**
     * Get a file
     *
     * @param String $id file ID
     * @return Ediary_File file Object
     */
    public static function find($id) {
        $file = self::findById($id);
        return $file;
    }

    /**
     * Get a file By file id
     *
     * @param String $id
     * @return Ediary_File file object or NULL
     */
    public static function findById($id) {
        $row = self::getDb()->fetchRow(
            'SELECT * FROM {files} WHERE id=?', $id);
        if ($row != false) {
            return new Ediary_File($row);
        } 
    }

    /**
     * Delete current file
     *
     * @return boolean success or not
     */
    public function delete() {
        if ( isset($this->fields['id']) ) {
            $db = self::getDb();
            $where = $db->quoteInto('id = ?', $this->fields['id']);
            return parent::deleteRow($db->files, $where);
        }
        return false;
    }

    /**
     * Update current file
     *
     * @return boolean success or not
     */
    public function update() {
        $where = self::getDb()->quoteInto('id = ?', $this->fields['id']);
        return parent::updateRow(self::getDb()->files, $where);
    }

    /**
     * This file is belong to someone
     *
     * @param mixed $who username, email, userId
     * @return boolean is belong or not
     */
    public function isBelongTo($who) {
        $userId = $who; 
        return ($this->user_id === $userId);
    }
}