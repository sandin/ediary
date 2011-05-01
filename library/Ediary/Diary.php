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
        'created_date' => '',
        'created_time' => '',
        'saved_at' => '',
        'mood' => 'normal',
    	'status' => self::STATUS_PRIVATE,
        'user_id' => '',
        'journal_id' => '',
        'encrypted' => '0'
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
    
    public static function newDiary() {
        return new Ediary_Diary(array(
        	'id' => '-1',
            'title' => Ediary_Date::getDateAndWeek(),
            'content' => '',
            'saved_at' => _t("未保存")
        )); 
    }
    
    /**
     * Insert current Diary into the database
     * 
     * @return boolean True on Success, false if not 
     */
    public function insert() {
        $this->exclude('id'); // exclude primary key 
        
        // default values
        $this->fields['created_date'] = Ediary_Db::today();
        $this->fields['created_time'] = Ediary_Db::now();
        $this->fields['saved_at'] = Ediary_Db::datetime();
        
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
     * @return Ediary_Diary Diary or null
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
     * @param String $date like: '2011-03-25'
     * @param String user id
     * @return Ediary_Diary or null
     */
    public static function findByDate($date, $user_id) {
        $row = self::getDb()->fetchRow('SELECT * FROM {diarys} '
       	    . ' WHERE created_date = ? AND user_id = ? '
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
                     ->from(Ediary_Db::prefix('diarys'))
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
    public static function getDiarysPaginator($user_id,
                                              $currentPageNumber = 1,
                                              $itemCountPerPage = 10,
                                              $since = null,
                                              $max = null)
    {
        $where[] = 'user_id = ?';
        $bind[] = $user_id;
        if (isset($since)) {
            $where[] = 'created_date >= ?';
            $bind[] = $since;
        }
        if (isset($max)) {
            $where[] = 'created_date <= ?';
            $bind[] = $max;
        }
        return Ediary_Paginator::factory('{diarys}', $where, $bind, 'id DESC',
                                 $currentPageNumber, $itemCountPerPage);
    }
    //SELECT * FROM diarys d where created_date >= '2011-03-28' AND created_date < '2011-03-29' LIMIT 0,1000
    
    /**
     * Get all diarys of the user
     * 
     * @param String $userId user id
     * @param int $limit rows limit
     * @return Array rows from DB
     */
    public static function getDiarys($userId, $limit = null) {
        $db = self::getDb();
        $select = $db->select()
                     ->from(Ediary_Db::prefix('diarys'))
                     ->where('user_id = ?', $userId);
        if (null != $limit) {
            $select->limit($limit);
        }
        
        return $db->fetchAll($select);
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
        $this->fields['saved_at'] = Ediary_Db::datetime(); //touch
        
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
     * Whethe Current diary is belong to someone
     * 
     * @param mixed $who username, email, userId
     * @return boolean is belong or not
     */
    public function isBelongTo($who) {
        $userId = -1;
        if (is_numeric($who)) {
            $userId = $who;
        } else if ($who instanceof stdClass && isset($who->id)) {
            $userId = $who->id;
        } else if ($who instanceof Ediary_User ) {
            $userId = $who->id;
        } 
        return ($this->user_id === $userId);
    }
    
    /**
     * Check if user has permission to edit diary
     * Whether the diary is belong to the user
     * 
     * @param String $userId
     * @param String $diaryId
     * @return boolean
     */
    public static function checkAccess($diaryId, $userId) {
        $db = self::getDb();
        $select = $db->select();
        $select->from($db->diarys, "COUNT(*)")
               ->where('user_id = ?', $userId)
               ->where('id = ?', $diaryId)
               ->limit(1);
        $count = $db->fetchOne($select->__toString());
        return ($count > 0);
    }
    
    /**
     * Search Diary's title and content by keyword
     * TODO: 暂时和wordpress一样使用LIKE, 而没有使用MySQL FULLTEXT索引(不支持longtext),
     * 		 今后可改进: 
     * 			1. 分词系统(二元分词或智能词库分词).
     * 		    2. 建搜索索引(可使用Zend_Search_Lucene
     * 
     * @param String $user_id
     * @param String $keywords
     * @return Array rows
     */
    public static function search($user_id, $keywords) {
        $db = self::getDb();
        return $db->fetchAll('SELECT * FROM {diarys} WHERE id = ? '
        				   . ' AND title LIKE ? OR content LIKE ?',
        					  array($user_id,
        					  		'%' . $keywords . '%',
        					        '%' . $keywords . '%'));
    } 
    
    /**
     * 该文章内容是否被加密
     * 加密算法可能各自不同, 详见 Ediary_Encryption#TYPE_XXX
     * 
     * @return boolean
     */
    public function isEncrypted() {
        return ($this->encrypted !== '0');
    }
    
    /**
     * 加密日记正文, 将加密后的内容储存在 enContent 字段
     * 并删除未加密正文 content 字段内容
     * 
     * @param String $key
     * @return Ediary_Diary
     */
    public function encrypt($key) {
        $this->enContent = Ediary_Encryption::encrypt($key, $this->content);
        $this->content = '';
        $this->encrypted = strval(Ediary_Encryption::TYPE_MCRYPT);
        $this->update();
        return $this;
    }
    
    /**
     * 解密加密日记, 将加密内容解密后存入content字段内容
     * 
     * @param String $key
     * $param boolean $forGood 是否修改持久层数据
     * @return Ediary_Diary
     */
    public function decrypt($key, $forGood = false) {
        //var_dump(Ediary_Encryption::decrypt($key, $this->enContent));
        $this->content = Ediary_Encryption::decrypt($key, $this->enContent);
        if ($forGood) {
            $this->enContent = '';
            $this->encrypted = '0';
            $this->update();
        }
        return $this;
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
