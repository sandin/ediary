<?php
class Ediary_Journal extends Ediary_Query_Record
{
    /**
     * Default fields
     *
     * @var Array
     */
    private static $defaultFields = array(
        /* id */
        'title' => '',
        'created_at' => '',
        'user_id' => ''
    );
    
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
     * Create a journal
     * 
     * @param Array $params journal data
     * @return Ediary_Journal
     */
    public static function create($params = array()) {
        $journal = new Ediary_Journal($params);
        $journal->insert();
        return $journal;
    }
    
    /**
     * Insert current journal into the database
     * 
     * @return boolean True on Success, false if not 
     */
    public function insert() {
        $this->exclude('id'); // exclude primary key 
        
        // default values
        $now = Ediary_Db::now();
        $this->fields['created_at'] = $now;
        
        // Insert into DB
        $result = parent::insertRow(self::getDb()->journals);
        
        // Reset fields
        $this->fields['id'] = self::getDb()->lastInsertId();
        $this->resetNewFields();
        
        return $result;
    }
    
    /**
     * Get a journal
     * 
     * @param String $id journal ID
     * @return Ediary_Journal journal Object or NULL
     */
    public static function find($id) {
        $journal = self::findById($id);
        return $journal;
    }
    
    /**
     * Get a journal By journal id
     * 
     * @param String $id
     * @return Ediary_Journal journal object or NULL
     */
    public static function findById($id) {
        $row = self::getDb()->fetchRow(
            'SELECT * FROM {journals} WHERE id=?', $id);
        if ($row != false) {
            $journal = new Ediary_Journal($row);
            return $journal;
        }
        
    }
    
    /**
     * Delete current journal
     * 
     * @return boolean success or not
     */
    public function delete() {
        if ( isset($this->fields['id']) ) {
            $db = self::getDb();
            $where = $db->quoteInto('id = ?', $this->fields['id']);
            return parent::deleteRow($db->journals, $where);
        }
        return false;
    }
    
    /**
     * Delete a particular journal by id
     * 
     * @param String journal id
     * @return boolean success or not
     */
    public static function deleteById($id) {
        $db = self::getDb();
        return $db->delete($db->journals,
            $db->quoteInto('id= ?', $this->fields['id']));
    }
    
    /**
     * Update current journal
     * 
     * @return boolean success or not
     */
    public function update() {
        $where = self::getDb()->quoteInto('id = ?', $this->fields['id']);
        return parent::updateRow(self::getDb()->journals, $where);
    }
    
    /**
     * Update a particular journal by id
     * 
     * @param String $id journal id
     * @param Array $data data need to updated, like array('title' => 'xxx')
     * @deprecated use update() instead
     * 
     * @return boolean success or not
     */
    public static function updateById($id, $data) {
        if ( self::checkInputFields($data) ) {
            return self::getDb()->update($data);
        }
        return false;
    }
    
    /**
     * This journal is belong to someone
     * 
     * @param mixed $who username, email, userId
     * @return boolean is belong or not
     */
    public function isBelongTo($who) {
        $userId = $who; // TODO: mixed, username, email, userId
        return ($this->user_id === $userId);
    }
    
    /**
     * Check if user has permission to edit journal
     * 
     * @param String $userId
     * @param String $diaryId
     * @return boolean
     */
    public static function checkAccess($diaryId, $userId) {
        $db = self::getDb();
        $count = $db->fetchOne('SELECT count(*) FROM {journals} '
                             . ' WHERE user_id = ? AND id = ?'
                             , $userId, $diaryId);
        return ($count > 0);
    }
    
    /**
     * Convert this Object to an Array
     * 
     * @return Array 
     */
    public function toArray() {
        //$data = get_class_vars(__CLASS__);
        $data = array_merge($this->fields, $this->newFields);
        return $data;
    }
    
    /**
     * Get Diarys which belong to this journal
     * @return Array<stdClass> array( stdClass{ id, title.. }, .. )
     */
    public function getDiarys() {
        $db = self::getDb();
        $db->setFetchMode(Zend_Db::FETCH_OBJ);
        return $db->fetchAll('SELECT * FROM {diarys} WHERE journal_id = ?', $this->id);
    }
}
