<?php
class Ediary_Diary extends Ediary_Query_Record
{
    /** private diary */
    const STATUS_PRIVATE = 0; 
    /** public diary */
    const STATUS_PUBLIC  = 1;
    
    /**
     * Default fields
     *
     * @var Array
     */
    private static $defaultFields = array(
        /* id */
        'title' => '',
        'content' => '',
        'weather' => '',
        'created_at' => '',
        'saved_at' => '',
        'mood' => 'normal',
    	'status' => self::STATUS_PRIVATE,
        'user_id' => '',
        'journal_id' => ''
    );
    
    /**
     * Construct
     * 
     * @param Array $params initial field values
     */
    public function __construct($data = array()) {
        $this->fields = array_merge(
            $this->fields,
            self::$defaultFields
        );
        parent::__construct($data);
    }
    
    /**
     * Create a Diary
     * 
     * @param Array $params diary data
     * @return Ediary_Diary
     */
    public static function create($data = array()) {
        $diary = new Ediary_Diary($data);
        $diary->insert();
        return $diary;
    }
    
    /**
     * Insert current Diary into the database
     * 
     * @return boolean True on Success, false if not 
     */
    public function insert() {
        $this->exclude('id'); // exclude primary key 
        
        // default values
        $now = Ediary_Database_Db::now();
        $this->fields['created_at'] = $now;
        $this->fields['saved_at'] = $now; //touch
        
        // Insert into DB
        $result = parent::insertRow($this->getDb()->diarys);
        
        // Reset fields
        $this->fields['id'] = self::getDb()->lastInsertId();
        $this->fields = array_merge($this->fields, $this->newFields);
        $this->newFields = array();
        
        return $result;
    }
    
    /**
     * Get a Diary
     * 
     * @param String $id diary ID
     * @return Ediary_Diary Diary Object
     */
    public static function find($id) {
        $diary = self::findById($id);
        return $diary;
    }
    
    /**
     * Get a Diary By diary id
     * 
     * @param String $id
     * @return Ediary_Diary or null
     */
    public static function findById($id) {
        $row = self::getDb()->fetchRow(
            'SELECT * FROM {diarys} WHERE id=?', $id);
        if ($row != false) {
            return new Ediary_Diary($row);
        }
    }
    
    /**
     * Get a Diary by Date
     * 
     * @param String $date '2011-03-25 00:00:00'
     * @param String user id
     * @return Ediary_Diary or null
     */
    public static function findByDate($date, $user_id) {
        $row = self::getDb()->fetchRow('SELECT * FROM {diarys} '
       	    . ' WHERE created_at >= ? AND user_id = ? '
       	    . ' ORDER BY id DESC LIMIT 1', array($date, $user_id)); 
        if ($row != false) {
            return new Ediary_Diary($row);
        }
    }
    
    /**
     * Find Diarys by User id
     * @param String $user_id
     * @return Array diarys
     */
    public static function findByUser($user_id) {
        $db = self::getDb();
        $select = $db->select()
                     ->from($db->prefix('diarys'))
                     ->where('user_id = ?', $user_id);
        return $db->fetchAll($select->__toString());
    }
    
    /**
     * Get the user's all diarys by page
     * 
     * @param String $user_id
     * @param int $currentPageNumber
     * @param int $itemCountPerPage
     * @return Zend_Paginator
     */
    public static function getDiarysPaginator($user_id, $currentPageNumber = 1, $itemCountPerPage = 10) {
        return Ediary_Paginator::factory('{diarys}', 'user_id = ?', $user_id,
                                 $currentPageNumber, $itemCountPerPage);
    }
    
    /**
     * Delete current diary
     * 
     * @return boolean success or not
     */
    public function delete() {
        if ( isset($this->fields['id']) ) {
            $db = self::getDb();
            $where = $db->quoteInto('id = ?', $this->fields['id']);
            return parent::deleteRow($db->diarys, $where);
        }
        return false;
    }
    
    /**
     * Delete a particular diary by id
     * 
     * @param String diary id
     * @return boolean success or not
     */
    public static function deleteById($id) {
        $db = self::getDb();
        return $db->delete($db->diarys,
            $db->quoteInto('id= ?', $this->fields['id']));
    }
    
    /**
     * Update current diary
     * 
     * @return boolean success or not
     */
    public function update() {
        $this->fields['saved_at'] = Ediary_Database_Db::now(); //touch
        
        $where = self::getDb()->quoteInto('id = ?', $this->fields['id']);
        return parent::updateRow(self::getDb()->diarys, $where);
    }
    
    /**
     * Update a particular diary by id
     * 
     * @param String $id diary id
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
     * This diary is belong to someone
     * 
     * @param mixed $who username, email, userId
     * @return boolean is belong or not
     */
    public function isBelongTo($who) {
        $userId = $who; // TODO: mixed, username, email, userId
        return ( ($this->id === $userId) ? true : false );
    }
    
    /**
     * Check if user has permission to edit diary
     * 
     * @param String $userId
     * @param String $diaryId
     * @return boolean
     */
    public static function checkAccess($diaryId, $userId) {
        $db = self::getDb();
        $count = $db->fetchOne('SELECT count(*) FROM {diarys} WHERE user_id = ? AND id = ?', $userId, $diaryId);
        return ($count > 0);
    }
    
    /**
     * Convert this Object to an Array
     * 
     * @param boolean get all field include LONGTEXT
     * @return Array 
     */
    public function toArray($getAllField = false) {
        //$data = get_class_vars(__CLASS__);
        $data = array_merge($this->fields, $this->newFields);
        if (!$getAllField && isset($data['content'])) {
            unset($data['content']); // content is LONGTEXT
        }
        
        return $data;
    }
}
