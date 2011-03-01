<?php
class Ediary_Diary extends Ediary_Query_Record
{
    /**
     * Default fields
     *
     * @var Array
     */
    private static $defaultFields = array(
        'title' => 'title1',
        'content' => 'content1'
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
        $this->exclude('id'); // exclude primary key in case insert into database
    }
    
    /**
     * Create a Diary
     * 
     * @param Array $params diary data
     * @return Ediary_Diary
     */
    public static function create($params = array()) {
        $diary = new Ediary_Diary($params);
        $diary->insert();
        return $diary;
    }
    
    /**
     * Insert current Diary into the database
     * 
     * @return boolean True on Success, false if not 
     */
    public function insert() {
        if ( false && $this->checkFields() ) {
            return false;
        }
        
        $result = parent::insertRow($this->getDb()->diarys);
        $this->fields['id'] = self::getDb()->lastInsertId();
        //TODO do somethind
        
        return $result;
    }
    
    /**
     * Get a Diary
     * 
     * @param mixed $who would be a username, email or ID
     * @return Ediary_Diary diary object
     */
    public static function find($who) {
        // TODO who : username, email, id
        $diary = self::findById($who);
        return $diary;
    }
    
    /**
     * Get a Diary By diary id
     * 
     * @param String $id
     * @return Ediary_Diary diary object
     */
    private static function findById($id) {
        $result = self::getDb()->find(id); // fetch to array
        $diary = new diary($result);
        return $diary;
    }
    
    /**
     * Delete current diary
     * 
     * @return boolean success or not
     */
    public function delete() {
        if ( isset($this->fields['id']) ) {
            $where = self::getDb()->quoteInto('id = ?', $this->fields['id']);
            return parent::deleteRow(self::getDb()->diarys, $where);
        }
        return false;
    }
    
    /**
     * Delete a particular diary by id
     * 
     * @param boolean success or not
     */
    public static function deleteById($id) {
        return self::getDb()->delete($id);
    }
    
    /**
     * Update current diary
     * 
     * @return boolean success or not
     */
    public function update() {
        if ( $this->checkFields() ) {
            return self::getDb()->update($this->newFildes);
        }
        return false;
    }
    
    /**
     * Update a particular diary by id
     * 
     * @param String $id diary id
     * @param Array $data data need to updated, like array('title' => 'xxx')
     * 
     * @return boolean success or not
     */
    public static function updateById($id, $data) {
        if ( self::checkInputFields($data) ) {
            return self::getDb()->update($data);
        }
        return false;
    }
}
