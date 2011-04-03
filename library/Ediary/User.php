<?php
// TODO : change it to fix Ediary_Query_Record
class Ediary_User extends Ediary_Query_Record
{
    // Table Field
    const ID = 'id';
    const NAME = 'username';
    const EMAIL = 'email';
    const PASSWORD = 'password';
    const SECURITY_CODE = 'security_code';
    const CREATED = 'created_at';
    const LAST_TIME = 'last_logined';
    const ACCOUNT = 'account';
    const PIC = 'photo';
    
    const PASSWORD_MIN_LENGTH = 8;
    const PASSWORD_MAX_LENGTH = 18;

    // Zend_Db_Table
    private static $table = null;
    private $db = null;

    private $mId = 0; // Use getId() instend
    public  $mName = '';
    public  $mEmail = '';
    public  $mPic = '';
    public  $mCreated = '';
    public  $mLastTime = '';
    public  $mAccount = 0;
    private $mPassword = '';
    private $mSecurityCode = ''; 
    
    private $metadata = array();
    
    private $isLoad = false;

    public function __construct() {
        $this->db = Ediary_Db::getInstance();
        if (NULL == self::$table) {
            self::$table = new Zend_Db_Table($this->db->users);
        }
    }

    /**
     * Get the user's ID
     *
     * @return int
     */
    public function getId() {
        return $this->mId;
    }
    
    /**
     * Has loaded or not
     * 
     * @return boolean
     */
    public function isLoad() {
        return $this->isLoad;
    }
    
    /**
     * New a User from one row data
     *
     * @param Array $row
     * @return Ediary_User
     */
    public static function newFromRow( $row ) {
        $user = new Ediary_User();
        $user->loadFromRow($row);
        return $user;
    }

    /**
     * Load User data from a row
     *
     * @param Array $row
     */
    public function loadFromArray( $userData ) {
        if (! is_array($userData)) 
            throw new Ediary_Exception('$userData must be an Array');
        
        if (isset($userData[self::ID])) {
            $this->mId = $userData[self::ID];
        }
        $this->mEmail = $userData[self::EMAIL];
        $this->mName = $userData[self::NAME];
        $this->mPassword = $userData[self::PASSWORD];
        $this->mSecurityCode = $userData[self::SECURITY_CODE];
        $this->mCreated = $userData[self::CREATED];
        $this->mLastTime = $userData[self::LAST_TIME];
        $this->mAccount = $userData[self::ACCOUNT];
        $this->mPic = $userData[self::PIC];
        
        $this->isLoad = true;
        return $this;
    }
    
    /**
     * Load User from a row(From Database)
     * 
     * @param Zend_Db_Table_Row $row
     * @throws Ediary_Exception $row is not a Zend_Db_Table_Row
     */
    public function loadFromRow( $row ) {
        if (null == $row) {
            return false; // $row is from Db, would be null
        } else if (! $row instanceof Zend_Db_Table_Row) { 
            throw new Ediary_Exception(__METHOD__ . ' expect Zend_Db_Table_Row');
        }
            
        $userData = $row->toArray();
        $this->loadFromArray($userData);
    }

    /**
     * Load user by Id
     * 
     * @param int $userId
     * @return Ediary_User
     */
    public function loadById( $userId ) {
        $row = self::$table->find($userId)->current();
        $this->loadFromRow($row);
        return $this;
    }

    /**
     * Load user by Email
     * 
     * @param String $email
     * @return Ediary_User
     */
    public function loadByEmail( $email ) {
        $select = self::$table->select()
                       ->where(self::EMAIL . ' = ?', $email)
                       ->limit(1,0);
        $row = self::$table->fetchRow($select);
        $this->loadFromRow($row);
        return $this;
    }
    
    public function find( $who )  {
		if ( is_numeric( $who ) ) {
			// Got a User ID
			$user = $this->loadById( $who );
		} elseif ( strpos( $who, '@' ) !== FALSE ) {
			// Got an email address
			$user = $this->loadByEmail( $who );
		} else {
		    //TODO: other case
		}
		return $user;
    }

    /**
     * Create a User
     *
     * @param String $email
     * @param String $name
     * @param String $password
     * @return int new user'id (last insert id) | return -1 on fail.
     */
    public function create( $email, $password ) {
        if ( self::isValidEmail($email) && !self::isExists($email)
                && self::isValidPassword($password) ) {
            return $this->insert($email, $password, '');
        }
        return -1;
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
     * Check user name
     *
     * @param String $name
     * @return boolean
     */
    public static function isValidUserName($name) {
        $validator = self::getUserNameValidate();
        //var_dump('username valid :' . $validator->isValid($name));
        return $validator->isValid($name);
    }
    
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
     * Check Email
     *
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
     * @param String $name
     * @return boolean
     */
    public static function isValidPassword($password) {
        $validator = new Zend_Validate();
        $validator->addValidator(new Zend_Validate_NotEmpty())
                  ->addvalidator(new Zend_Validate_StringLength(
                      self::PASSWORD_MIN_LENGTH, self::PASSWORD_MAX_LENGTH));
                  
        return $validator->isValid($password);
    }
    
    /**
     * Is a Exists User
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
        return self::isExistsRow('id', $id);
    }
    
    /**
     * @param String $email
     * @return boolean
     */
    public static function isExistsEmail($email) {
        return self::isExistsRow('email', $email);
    }
    
    /**
     * Row is exists or not
     *
     * @param String $email
     * @return boolean
     */
    private static function isExistsRow($field, $value) {
        $db = self::getDb();
        
        $sql = $db->quoteInto(
        	'SELECT count(*) FROM {users} where ' . $field . ' =?', $value);
        $result = $db->fetchOne($sql);
        return ($result > 0) ? true : false;
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
        $db = Ediary_Db::getInstance();
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
     * Insert a row into database
     *
     * @param String $email
     * @param String $password
     * @param String $name
     * @return int the last insert id
     */
    private function insert($email, $password, $name = '') {
        $now = Ediary_Db::formator(time());
        $securityCode = self::makeSecurityCode($email);
        $encodedPassword = self::encryptPassword($password, $securityCode);
         
        $data = array(
            self::EMAIL => $email,
            self::NAME  => $name,
            self::PASSWORD => $encodedPassword,
            self::SECURITY_CODE => $securityCode,
            self::CREATED => $now,
            self::LAST_TIME => $now
        );
         
        return self::$table->insert($data);
    }

    /**
     * Delete a Row
     * 
     * @param int $userId
     * @return 
     */
    public function delete($userId){
        $where = $this->db->quoteInto(self::ID . '= ?', $useId);
        return self::$table->delete($where);
    }

    /**
     * Update a Row
     * 
     * @param int $userId
     * @param Array $userData {self::const => $value, ...}
     * @return int The number of affected rows. | -1 on userData is not valid
     */
    public function update($userId, $userData) {
        // Check All Input User Data is valid or not
        foreach ($userData as $key => $value) {
            if (! self::isValid($key, $value) ) {
                return -1; //is not a valid data
            }
        }
        $where = $this->db->quoteInto(self::ID . '= ?', $userId);
        return self::$table->update($userData, $where);
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
        return $result;
    }
    
    public static function logout() {
        Ediary_Auth_Database::logout();
    }
    
    /**
     * Get current user's journals
     * 
     * @return Array<stdClass> a list of journals
     */
    public function getJournals() {
        $db = self::getDb();
        $db->setFetchMode(Zend_Db::FETCH_OBJ);
        return $db->fetchAll('SELECT * FROM {journals} WHERE user_id = ?', $this->mId);
    }
    
    public static function getMetadata($user_id) {
        return Ediary_Metadata::getAll('usermeta', 'user_id', $user_id);
    }
    
}
