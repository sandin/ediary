<?php
// TODO : change it to fix Ediary_Query_Record
class Ediary_User extends Ediary_Query_Adapter
{
    const PASSWORD_MIN_LENGTH = 8;
    const PASSWORD_MAX_LENGTH = 18;

    /**
     * @var String table name
     */
    private static $table = null;
    
    /**
     * @var Zend_Db_Table
     */
    private static $zTable = null;
    
    /**
     * @var Array user's metadata
     */
    private $metadata = array();

    /**
     * Construct
     * 
     * @param Array $params user data
     */
    public function __construct($params = array()) {
        if (NULL == self::$zTable) {
            self::$zTable = new Zend_Db_Table();
        }
        
        self::$table = Ediary_Db::prefix('users');
        parent::__construct($params);
    }
    
    /**
     * Create a User
     * 使用前应该对$data进行数据格式等验证
     *
     * @param Array $params diary data
     * @return Ediary_Diary
     */
    public static function create($data = array()) {
        $obj = new self($data);
        $obj->insert();
        return $obj;
    }
    
    /**
     * Insert a Row 
     * @return boolean
     */
    public function insert() {
        $securityCode = self::makeSecurityCode($this->email);
        $encodedPassword = self::encryptPassword($this->password, $securityCode);
        
        $this->newFields['created_at'] = Ediary_Db::datetime();
        $this->newFields['last_logined'] = Ediary_Db::datetime();
        $this->newFields['security_code'] = $securityCode;
        $this->newFields['password'] = $encodedPassword;
        return parent::insertRow(Ediary_Db::prefix('users'));
    }

    /**
     * Find a User
     * 
     * @param String $who mixed[username|email]
     * @return Ediary_User
     */
    public static function find( $who )  {
        if ( self::isAId($who) ) {
            $user = self::findById( $who );
        } elseif ( self::isAEmail($who) ) {
            $user = self::findByEmail( $who );
        } else {
            //TODO: other case
            $user = null;
        }
        return $user;
    }
    
    public static function isAId($who) {
        return is_numeric($who);
    }
    
    public static function isAEmail($who) {
        return (strpos($who, '@') !== false);
    }
    
    public static function findById($id) {
        $row =  parent::findRowById(Ediary_Db::prefix('users'), $id);
        if (null != $row) {
            return new self($row);
        }
    }

    /**
     * Load user by Email
     * 
     * @param String $email
     * @return Ediary_User or null
     */
    public static function findByEmail( $email ) {
        $db = self::getDb();
        $select = $db->select()
                     ->from(Ediary_Db::prefix('users'))
                     ->where('email = ?', $email)
                     ->limit(1,0);
        $row = $db->fetchRow($select);
        if (null != $row) {
            return new self($row);
        }
    }
    
    /**
     * Update with new Values
     * @return boolean
     */
    public function update() {
        return parent::updateRowById(self::$table);
    }
    
    public function changePassword($newPassword) {
        $securityCode = self::getSecurtiyCode($this->email);
        $encodedPassword = self::encryptPassword($newPassword, $securityCode);
        $this->password = $encodedPassword;
        return $this->update();
    }
    
    /**
     * Delete current user
     * @return boolean
     */
    public function delete() {
        return parent::deleteRowById(self::$table);
    }

    /**
     * isValid Factory
     * 
     * @param String $key see self::const, such as self::NAME...
     * @param String $value value 
     * @return boolean
     */
    public static function isValid($key, $value) {
        switch ($key) {
            case self::NAME :
                return self::isValidUserName($value);
                break;
            case self::PASSWORD :
                return self::isValidPassword($value);
                break;
            case self::EMAIL :
                return self::isValidEmail($value);
                break;
        }
        return true; // no need to check
    } 
    
    /**
     * @return Zend_Validate
     */
    public static function getUserNameValidate() {
        $alnum = new Zend_Validate_Alnum(array('allowWhiteSpace' => true));
        $alnum->setMessage(_t("用户名只能为数字, 字符或空格."));
        
        $noEmpty = new Zend_Validate_NotEmpty();
        $noEmpty->setMessage(_t("用户名不能为空"));
        
        $validator = new Zend_Validate();
        $validator->addValidator($noEmpty, true)
                  ->addValidator($alnum, false);
                  
        return $validator;
    }
    
    /**
     * @return Zend_Validate
     */
    public static function getPasswordValidate() {
        $validator = new Zend_Validate();
        $validator->addValidator(new Zend_Validate_NotEmpty())
                  ->addvalidator(new Zend_Validate_StringLength(
                      self::PASSWORD_MIN_LENGTH, self::PASSWORD_MAX_LENGTH));
        return $validator;
    }
    
  	/**
     * Check user name
     *
     * @deprecated
     * @param String $name
     * @return boolean
     */
    public static function isValidUserName($name) {
        $validator = self::getUserNameValidate();
        //var_dump('username valid :' . $validator->isValid($name));
        return $validator->isValid($name);
    }

    /**
     * Check Email
     *
     * @deprecated
     * @param String $name
     * @return boolean is valid
     */
    public static function isValidEmail($email) {
        $validator = new Zend_Validate();
        $validator->addValidator(new Zend_Validate_NotEmpty())
                  ->addValidator(new Zend_Validate_EmailAddress(array('mx' => false)));
        
        //var_dump('email valid :' . $validator->isValid($email));
        return $validator->isValid($email);
    }
    /**
     * Check Password
     *
     * @deprecated
     * @param String $name
     * @return boolean
     */
    public static function isValidPassword($password) {
        $validator = self::getPasswordValidate();
        return $validator->isValid($password);
    }
    
    /**
     * Check if the user Is Exists
     *
     * @param mixed $who userId or email
     * @return boolean true if exists
     */
    public static function isExists($who) {
        if ( is_numeric( $who ) ) {
            // Got a User ID
            return self::isExistsId($who);
        } elseif ( strpos( $who, '@' ) !== FALSE ) {
            // Got an email address
            return self::isExistsEmail($who );
        } else {
            return false;
        }
    }
    
    /**
     * @param String $id
     * @return boolean
     */
    public static function isExistsId($id) {
        return parent::isExistsRow(Ediary_Db::prefix("users"), 'id = ?', $id);
    }
    
    /**
     * @param String $email
     * @return boolean
     */
    public static function isExistsEmail($email) {
        return parent::isExistsRow(Ediary_Db::prefix("users"), 'email = ?', $email);
    }
    
    /**
     * Make a random string
     *
     * @param String $keyword
     * @return String a random string(length = 10)
     */
    public static function makeSecurityCode($keyword) {
        return substr(md5($keyword . microtime() . 'lds'), 0, 10);
    }
    
    /**
     * Get a particular user's securtiy code
     * 
     * @param String $email
     * @return String user's securtiy code from db
     */
    private static function getSecurtiyCode($email) {
        $db = self::getDb();
        return $db->fetchOne(
        	'SELECT security_code FROM {users} WHERE email=?', $email);
    }

    /**
     * Use MD5 to encrypt the password
     *
     * @param String $password
     * @param String $securityCode
     * @return string encrypted password
     */
    public static function encryptPassword($password, $securityCode) {
        return md5( md5($password) . $securityCode . 'lds' );
    }
    
    /**
     * Auth User and save the auth result into session
     * 
     * @param String $email
     * @param String $password
     * @return stdClass auth result { boolean result, String message }
     */
    public static function login($email, $password, $rememberMe = false) {
        $securityCode = self::getSecurtiyCode($email);
        $encodedPassword = self::encryptPassword($password, $securityCode);
        
        // auth user
        $result = Ediary_Auth_Database::authenticate($email, $encodedPassword, $rememberMe);
        
        // udate last_logined
        if ($result->result && isset($result->user)) {
            $result->user->last_logined = Ediary_Db::datetime();
            $result->user->update();
        }
        return $result;
    }
    
    /**
     * Logout
     */
    public static function logout() {
        Ediary_Auth_Database::logout();
    }
    
    /**
     * Get current user's journals
     * 
     * @deprecated
     * @return Array<stdClass> a list of journals
     */
    public function getJournals() {
        $db = self::getDb();
        $db->setFetchMode(Zend_Db::FETCH_OBJ);
        return $db->fetchAll('SELECT * FROM {journals} WHERE user_id = ?', $this->mId);
    }
    
    /**
     * Get User's metadata
     * 
     * @param String $user_id
     * @return Array metadata, like array( array('key' => 'value'), array('key' => 'value') ) 
     */
    public static function getMetadata($user_id) {
        return Ediary_Metadata::getAll('usermeta', 'user_id', $user_id);
    }
    
    /**
     * check if it's the same user
     * 
     * @param unknown_type $user
     * @return boolean
     */
    public function equals($user) {
        if ($user instanceof self && $user->id === $this->id
                && $user->email === $this->email) {
            return true;
        }
        return false;
    }
    
    /**
     * @see Ediary_Query_Adapter::toArray()
     */
    public function toArray() {
        $arr = parent::toArray();
        unset($arr['password']);
        unset($arr['security_code']);
        return $arr;
    }
    
}
