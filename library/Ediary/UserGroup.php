<?php
/**
 * @author lds
 */
class Ediary_UserGroup extends Ediary_Query_Adapter
{
    const ADMIN = 'admin';
    const GUEST = 'guest';
    
    // tables name
    private static $table = null;
    private static $linkTable = null;
    
     /**
     * Default fields
     *
     * @var Array
     */
    protected $defaultFields = array(
        /* id */
        'name' => '',
        'permission' => ''
    );
    
    public function __construct($params = array()) {
        self::prepareTable();
        parent::__construct($params);
    }
    
    private static function prepareTable() {
        if (self::$table === null) {
            self::$table = Ediary_Db::prefix('users_groups');
            self::$linkTable = Ediary_Db::prefix('users_groups_link');
        }
    }
    
  	/**
  	 * Create a new group
  	 * 
     * @param Array $params data
     * @return Ediary_UserGroup
     */
    public static function create($params = array()) {
        $obj = new self($params);
        $obj->insert();
        return $obj;
    }
    
    /**
     * Find a group
     * 
     * @param mixed(Ediary_UserGroup|String) $which group_id|group_name|group
     * @return Ediary_UserGroup
     */
    public static function find($which) {
        if ($which instanceof self) {
            return $which;
        } else if (self::isAId($which)) {
            return self::findById($which);
        } else if (self::isAName($which)) {
            return self::findByName($which);
        }
    }
    
    public static function isAName($string) {
        return Zend_Validate::is($string, 'Alnum');
    }
    
    public static function findById($id) {
        $row = self::findRowById(Ediary_Db::prefix('users_groups'), $id);
        if (null != $row) {
            return new self($row);
        }
    }
    
    public static function findByName($name) {
        $row = self::findRowByField(Ediary_Db::prefix('users_groups'), 'name', $name);
        if (null != $row) {
            return new self($row);
        }
    }
    
    /**
     * Insert into DB
     * 
     * @return boolean
     */
    public function insert() {
        $permission = $this->fields['permission'];
        if ( null !== $permission && is_array($permission) ) {
            $this->fields['permission'] = self::joinPermission($permission);
        }
        
        parent::insertRow(self::$table);
    }
    
  	/**
     * Delete current Group
     * 
     * @return boolean
     */
    public function delete() {
        self::_removeLink(null, $this->id); // delete all link
        return parent::deleteRowById(self::$table);
    }
    
    /**
     * Get user's groups (support cache)
     * 
     * @param String $user_id
     * @param boolean $useCache use cache or not
     * @return Array a list of Groups' name
     */
    public static function getUserGroups($user_id, $useCache = false) {
        $result = array();
        
        if ( $useCache ) {
            $cacheKey = $user_id . '_userGroups'; 
            $cache = Ediary_Cache::getCache();
            if ( ($result = $cache->load($cacheKey)) === false ) {
                $result = self::_getUserGroups($user_id);
                $cache->save($result, $cacheKey);
            }
        } else {
            $result = self::_getUserGroups($user_id);
        }
        
        return $result;
    }
    
 	/**
     * Get user's groups
     * 
     * @param String $user_id
     * @return Array a list of Groups' name
     */
    private static function _getUserGroups($user_id) {
        self::prepareTable();
        
        $db = self::getDb();
        $select = $db->select()
                     ->from(array('g' => self::$table), array('g.name'))
                     ->join(array('l' => self::$linkTable), 'g.id = l.group_id', array())
                     ->where('l.user_id = ?', $user_id);

        //TODO: 目前并非使用group的permission, 所以只取出了group name,
        // 今后需要扩展时, 可以返回fetchAll, 并取消select中col限制
        return $db->fetchCol($select);
    }
    
    /**
     * Whether the user is belong to the group
     * 
     * @param String $user_id
     * @param String $group_name
     * @return boolean
     */
    public static function isUserbelongToGroup($user_id, $group_name) {
        return (in_array($group_name, self::getUserGroups($user_id)));
    }
    
    /**
     * Whether the user is admin
     * 
     * @param String $user_id
     * @return boolean
     */
    public static function isAdmin($user_id) {
        return self::isUserbelongToGroup($user_id, Ediary_UserGroup::ADMIN);
    }
    
    /**
     * Convert permission string which form DB to an array
     * 
     * @param String $permission_string
     * @return Array list of permission
     */
    public static function parsePermission($permission_string) {
        return explode(',', $permission_string);
    }
    
    /**
     * Convert permission array to a string which will store into DB
     * 
     * @param Array $permission_array
     * @return string
     */
    public static function joinPermission($permission_array) {
        return implode(',', $permission_array);
    }
    
    // Users_Groups_Link
    
    /**
     * Add a user into a group
     * 
     * @param String $user_id
     * @param String $group mixed[id|name]
     * @return int number of affected row, -1 when argument $user/$group invalid
     */
    public static function addUserToGroup($user_id, $group) {
        return self::_addOrRmUserToGroup($user_id, $group, true);
    }
    
    /**
     * Remove a user form a group
     * 
     * @param String $user_id
     * @param String $group
     * @return int number of affected row, -1 when argument $user/$group invalid
     */
    public static function removeUserFormGroup($user_id, $group) {
        return self::_addOrRmUserToGroup($user_id, $group, false);
    }
    
    private static function _addOrRmUserToGroup($user_id, $group, $addMode = true) {
        $group = self::find($group);
        if ($user_id > 0 && null != $group) {
            if ($addMode) {
                return self::_makeLink($user_id, $group->id);
            } else {
                return self::_removeLink($user_id, $group->id);
            }
        }
        return -1;
    }
    
    /**
     * @param String $user_id if user_id is null, then delete all link of this group
     * @param String $group_id
     * @return int number of row
     */
    private static function _removeLink($user_id, $group_id) {
        self::prepareTable();
        $db = self::getDb();
        
        if (null !== $user_id) {
            $where[] = $db->quoteInto("user_id = ?", $user_id); 
        }
        $where[] = $db->quoteInto("group_id = ?", $group_id); 
        return $db->delete(self::$linkTable, $where);
    }
    
    /**
     * Enter description here ...
     * @param unknown_type $user_id
     * @param unknown_type $group_id
     * @return int number of row
     */
    private static function _makeLink($user_id, $group_id) {
        self::prepareTable();
        
        return self::getDb()->insert(self::$linkTable, array(
            'user_id' => $user_id,
            'group_id' => $group_id
        ));
    }
    
    public function equals($group) {
        return ($this->id === $group->id);
    }
    
    
}